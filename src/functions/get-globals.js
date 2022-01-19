export default ({ layers, props }) => {
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

  const { paddingTop } = props;
  if (paddingTop) {
    if (typeof paddingTop === 'function') maxY += paddingTop(maxY);
    else if (typeof paddingTop === 'number') maxY += paddingTop;
  }

  return {
    width: 100,
    height: 100,
    getX: x => (x / maxX) * 100,
    getY: y => (1 - y / maxY) * 100,
    range: maxY - minY,
    domain: maxX - minX,
    bounds: { minX, maxX, minY, maxY }
  };
};
