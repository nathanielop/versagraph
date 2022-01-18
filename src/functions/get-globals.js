export default ({ layers }) => {
  let minY, maxY, minX, maxX;
  for (const layer of layers) {
    const { coordinates } = layer;
    for (const [x, y] of coordinates) {
      if (!minX || x < minX) minX = x;
      if (!maxX || x > maxX) maxX = x;
      if (!maxY || y > maxY) maxY = y;
      if (!minY || y < minY) minY = y;
    }
  }

  return {
    width: 100,
    height: 100,
    getX: x => (x / maxX) * 100,
    getY: y => (y / maxY) * 100,
    bounds: { minX, maxX, minY, maxY }
  };
};
