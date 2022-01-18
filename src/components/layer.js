// eslint-disable-next-line no-unused-vars
import React from 'react';

import Bar from './bar.js';
import Line from './line.js';
import Point from './point.js';

export default ({ layer: { type, coordinates, ...props }, ...layerProps }) =>
  coordinates.map((coordinate, i) =>
    type === 'bar' ? (
      <Bar key={i} coordinate={coordinate} {...props} {...layerProps} />
    ) : type === 'line' ? (
      <Line key={i} coordinate={coordinate} {...props} {...layerProps} />
    ) : (
      <Point key={i} coordinate={coordinate} {...props} {...layerProps} />
    )
  );
