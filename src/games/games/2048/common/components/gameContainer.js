import React, { Component } from 'react';

import { View } from 'react-native';

import Dimensions from '../utils/dimensions';

import GridContainer from './gridContainer';
import TileContainer from './tileContainer';

const styles = {
  container: {
    backgroundColor: '#bbada0',
    borderRadius: Dimensions.size['2'],
  },
};

const GameContainer = props => {
  const { width, tiles, won, over, onKeepGoing, onTryAagin, size } = props;

  return (
    <View
      style={{
        ...styles.container,
        height: width,
        width,
      }}
    >
      <GridContainer size={size} width={width} />
      <TileContainer size={size} tiles={tiles} width={width} />
    </View>
  );
};

export default GameContainer;
