import React from 'react';

import { View, Text } from 'react-native';

import Dimensions from '../utils/dimensions';

import GridRow from './gridRow';

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
    paddingHorizontal: Dimensions.size['2'],
    paddingVertical: Dimensions.size['2'],
    flexDirection: 'column',
  },
};

const GridContainer = props => {
  const { width, size = 4 } = props;

  return (
    <View
      style={{
        ...styles.container,
        width,
        height: width,
      }}
    >
      {Array.from({
        length: size,
      }).map((a, i) => (
        <GridRow size={size} width={width} key={`grid-row-${i}`} />
      ))}
    </View>
  );
};

export default GridContainer;
