// eslint-disable-next-line no-unused-vars
import React from 'react';

export default ({ getX, getY, coordinate: [x, y], pointProps }) => (
  <circle cx={`${getX(x)}%`} cy={`${getY(y)}%`} {...pointProps} />
);
