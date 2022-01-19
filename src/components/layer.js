// eslint-disable-next-line no-unused-vars
import React from 'react';

import pairCoordinates from '../functions/pair-coordinates.js';

import Bar from './bar.js';
import Line from './line.js';
import Point from './point.js';

export default ({ layer: { type, coordinates, ...props }, ...layerProps }) =>
  (type === 'line' ? pairCoordinates(coordinates) : coordinates).map(
    (coordinate, i) =>
      type === 'bar' && coordinate ? (
        <Bar key={i} coordinate={coordinate} {...props} {...layerProps} />
      ) : type === 'line' && coordinate ? (
        <Line key={i} coordinate={coordinate} {...props} {...layerProps} />
      ) : coordinate ? (
        <Point key={i} coordinate={coordinate} {...props} {...layerProps} />
      ) : null
  );
