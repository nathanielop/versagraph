import formatCoordinate from './format-coordinate.js';
import formatLayer from './format-layer.js';

export default layer => {
  const { coordinates, ...rest } = formatLayer(layer);
  if (!coordinates) {
    throw new Error(
      `Expected a coordinates key on layer ${JSON.stringify(layer)}.`
    );
  }
  return {
    coordinates: coordinates.map((coord, i) => formatCoordinate(coord, i)),
    ...rest
  };
};
