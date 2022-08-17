import React, { Component } from 'react';

import classNames from 'classnames';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import { Factory } from '../../games';

import styles from './Game.module.scss';

type Props = Record<string, unknown>;

const Games = [
  {
    title: 'Сдвиг по вертикали',
    name: 'shift-vertical',
  },
  {
    title: 'Ментальный счет',
    name: 'mental',
  },
  {
    title: 'Шульте',
    name: 'schulte',
  },
  {
    title: '2048',
    name: 'Game2048',
  },
];

class Game extends Component<any, any> {
  gameComponent: any;

  game: any;

  constructor(props: any) {
    super(props);

    const game = [Games[0].name];

    this.gameComponent = Factory(game);

    this.state = {
      started: false,
      game,
    };
  }

  onEnd = (result: any) => {
    this.setState(
      {
        started: false,
      },
      () => {
        const message = [`Ваше время: ${result.time} секунд`];

        if (result?.timeDiff) {
          message.push(`Среднее время: ${result.timeDiff} секунд`);
        }

        if (result?.score) {
          message.push(`Ваш результат: ${result.score}`);
        }

        if (result?.success) {
          message.push(`Правильных ответов: ${result.success}`);
        }

        if (result?.failed) {
          message.push(`Допущено ошибок: ${result.failed}`);
        }

        /* eslint-disable no-alert */
        alert(message.join('\n'));
      },
    );
  };

  onStart = () => {
    this.setState(
      {
        started: true,
      },
      () => {
        this.game?.start();
      },
    );
  };

  onRefGame = (ref: any) => {
    this.game = ref;
  };

  setGame = (game: string) => () => {
    this.gameComponent = Factory(game);
    this.setState({
      started: false,
      game,
    });
  };

  render() {
    const { started = false, game } = this.state;
    const GameComponent = this.gameComponent;
    return (
      <div className={styles.innerContent}>
        <div className={styles.gameList}>
          {Games.map(a => (
            <NavLink key={`game-${a.name}`} to={a.name}>
              <div
                className={classNames(styles.gameItem, {
                  [styles.gameItemActive]: a.name === game,
                })}
                onClick={this.setGame(a.name)}
              >
                <span>{a.title}</span>
              </div>
            </NavLink>
          ))}
        </div>
        <Routes>
          {Games.map(gam => (
            <Route
              key={game.name}
              path={gam.name}
              element={
                <div className={styles.wrapGame}>
                  <GameComponent onRef={this.onRefGame} width={800} onEnd={this.onEnd} />
                  {!started && (
                    <div className={styles.overlay}>
                      <div className={styles.playButton} onClick={this.onStart}>
                        <span className={styles.playButtonText}>ИГРАТЬ</span>
                      </div>
                    </div>
                  )}
                </div>
              }
            />
          ))}
        </Routes>
      </div>
    );
  }
}

export default Game;
