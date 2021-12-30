export default ({ getX, getY, coordinate: [x, y], height, props }) => {
  const startingX = getX(x) - barWidth / 2;
  return (
    <rect
      x={`${startingX < 0 ? 0 : startingX}%`}
      y={`${getY(y)}%`}
      width={`${startingX > 0 ? barWidth : barWidth / 2}%`}
      height={height}
    />
  );
};
