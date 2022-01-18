// eslint-disable-next-line no-unused-vars
import React from 'react';

export default ({ data: { yOffset, width, height }, ...props }) => (
  <rect width={width} height={height} y={yOffset} x={100 - width} {...props} />
);
