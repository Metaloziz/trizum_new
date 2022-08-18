import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';

// import SwipeGestures from '../../../../components/swipeGestures';
import SwipeGestures from '../../../../components/gestureDetector';

// Modules
// import TouchManager from '../utils/touchManager'
import Grid from '../utils/grid';
import Tile from '../utils/tile';

// Views
import GameContainer from './gameContainer';

class Container extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      tiles: [],
      score: 0,
      over: false,
      win: false,
      keepPlaying: false,
      grid: new Grid(props.size),
      size: props.size,
    };
  }

  start = () => {
    this.continueGame();
    this.setup();

    this.moving = false;
  };

  render() {
    const { tiles = [] } = this.state;

    const { width } = this.props;

    return (
      <SwipeGestures
        style={{
          width,
        }}
        onSwipeUp={() => this.move(0)}
        onSwipeDown={() => this.move(2)}
        onSwipeLeft={() => this.move(3)}
        onSwipeRight={() => this.move(1)}
      >
        <GameContainer
          width={width}
          size={this.state.size}
          tiles={this.state.tiles}
          won={this.state.won}
          over={this.state.over}
          onKeepGoing={() => this.keepGoing()}
          onTryAagin={() => this.restart()}
        />
      </SwipeGestures>
    );
  }

  getRandomTiles() {
    const ret = [];
    for (let i = 0; i < this.props.startTiles; i++) {
      ret.push(this.getRandomTile());
    }
    return ret;
  }

  getRandomTile() {
    const value = Math.random() < 0.9 ? 2 : 4;
    const pos = this.grid.randomAvailableCell();
    const tile = new Tile(pos, value);

    this.grid.insertTile(tile);

    return {
      value,
      x: pos.x,
      y: pos.y,
      prog: tile.prog,
    };
  }

  continueGame() {
    this.won = false;
    this.over = false;
    this.setState({ won: this.won, over: this.over });
  }

  restart() {
    this.continueGame(); // Clear the game won/lost message
    this.setup();
  }

  // Keep playing after winning (allows going over 2048)
  keepGoing() {
    this.keepPlaying = true;
    this.continueGame(); // Clear the game won/lost message
  }

  // Return true if the game is lost, or has won and the user hasn't kept playing
  isGameTerminated() {
    return this.over || (this.won && !this.keepPlaying);
  }

  setGameState() {
    this.grid = new Grid(this.state.size);
    this.score = 0;
    this.over = false;
    this.won = false;
    this.keepPlaying = false;

    LayoutAnimation.easeInEaseOut();

    this.setState({
      score: this.score,
      tiles: this.getRandomTiles(),
      over: this.over,
      won: this.won,
    });
  }

  // Set up the game
  setup() {
    this.setGameState();
  }

  // Set up the initial tiles to start the game with
  addStartTiles() {
    for (let i = 0; i < this.startTiles; i++) {
      this.addRandomTile();
    }
  }

  // Adds a tile in a random position
  addRandomTile() {
    const cellsAvailable = this.grid.cellsAvailable();

    if (cellsAvailable) {
      const value = Math.random() < 0.9 ? 2 : 4;
      const tile = new Tile(this.grid.randomAvailableCell(), value);

      this.grid.insertTile(tile);
    }
  }

  // Sends the updated grid to the actuator
  actuate() {
    const tiles = [];
    this.grid.cells.forEach(column => {
      column.forEach(cell => {
        if (cell) {
          tiles.push({
            x: cell.x,
            y: cell.y,
            value: cell.value,
            prog: cell.prog,
          });
        }
      });
    });

    LayoutAnimation.easeInEaseOut();

    this.setState({
      score: this.score,
      tiles,
      won: this.won,
      over: this.over,
    });
  }

  // Save all tile positions and remove merger info
  prepareTiles() {
    this.grid.eachCell((x, y, tile) => {
      if (tile) {
        tile.mergedFrom = null;
        tile.savePosition();
      }
    });
  }

  // Move a tile and its representation
  moveTile(tile, cell) {
    this.grid.cells[tile.x][tile.y] = null;
    this.grid.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
  }

  // Move tiles on the grid in the specified direction
  move(direction) {
    // 0: up, 1: right, 2: down, 3: left
    const self = this;
    if (this.isGameTerminated()) return; // Don't do anything if the game's over
    let cell;
    let tile;
    const vector = this.getVector(direction);
    const traversals = this.buildTraversals(vector);
    let moved = false;
    // Save the current tile positions and remove merger information
    this.prepareTiles();
    // Traverse the grid in the right direction and move tiles
    traversals.x.forEach(x => {
      traversals.y.forEach(y => {
        cell = { x, y };
        tile = self.grid.cellContent(cell);

        if (tile) {
          const positions = self.findFarthestPosition(cell, vector);
          const next = self.grid.cellContent(positions.next);

          // Only one merger per row traversal?
          if (next && next.value === tile.value && !next.mergedFrom) {
            const merged = new Tile(positions.next, tile.value * 2);
            merged.mergedFrom = [tile, next];

            self.grid.insertTile(merged);
            self.grid.removeTile(tile);

            // Converge the two tiles' positions
            tile.updatePosition(positions.next);

            // Update the score
            self.score += merged.value;

            self.props.onScore(self.score);

            // The mighty 2048 tile
            if (merged.value === 2048) {
              self.won = true;
              self.onWin(self.score);
            }
          } else {
            self.moveTile(tile, positions.farthest);
          }

          if (!self.positionsEqual(cell, tile)) {
            moved = true; // The tile moved from its original cell!
          }
        }
      });
    });

    if (moved) {
      this.addRandomTile();
      if (!this.movesAvailable()) {
        this.props.onEnd(this.score);
        this.over = true; // Game over!
      }
      this.actuate();
    }
  }

  // Get the vector representing the chosen direction
  getVector(direction) {
    // Vectors representing tile movement
    const map = {
      0: { x: 0, y: -1 }, // Up
      1: { x: 1, y: 0 }, // Right
      2: { x: 0, y: 1 }, // Down
      3: { x: -1, y: 0 }, // Left
    };
    return map[direction];
  }

  // Build a list of positions to traverse in the right order
  buildTraversals(vector) {
    const traversals = { x: [], y: [] };

    for (let pos = 0; pos < this.state.size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    // Always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
  }

  findFarthestPosition(cell, vector) {
    let previous;

    // Progress towards the vector direction until an obstacle is found
    do {
      previous = cell;
      cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (this.grid.withinBounds(cell) && this.grid.cellAvailable(cell));

    return {
      farthest: previous,
      next: cell, // Used to check if a merge is required
    };
  }

  movesAvailable() {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
  }

  // Check for available matches between tiles (more expensive check)
  tileMatchesAvailable() {
    const self = this;

    let tile;

    for (let x = 0; x < this.state.size; x++) {
      for (let y = 0; y < this.state.size; y++) {
        tile = this.grid.cellContent({ x, y });

        if (tile) {
          for (let direction = 0; direction < 4; direction++) {
            const vector = self.getVector(direction);
            const cell = { x: x + vector.x, y: y + vector.y };

            const other = self.grid.cellContent(cell);

            if (other && other.value === tile.value) {
              return true; // These two tiles can be merged
            }
          }
        }
      }
    }

    return false;
  }

  positionsEqual(first, second) {
    return first.x === second.x && first.y === second.y;
  }
}

export default Container;
