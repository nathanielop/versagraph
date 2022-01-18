// eslint-disable-next-line no-unused-vars
import React from 'react';

export default ({
  getX,
  getY,
  coordinate: [x, y],
  bounds: { maxY },
  barProps: { barWidth, ...barProps }
}) => {
  const startingX = getX(x) - barWidth / 2;
  return (
    <rect
      x={`${startingX < 0 ? 0 : startingX}%`}
      y={`${getY(y)}%`}
      width={`${startingX > 0 ? barWidth : barWidth / 2}%`}
      height={(y / maxY) * 100}
      {...barProps}
    />
  );
};
