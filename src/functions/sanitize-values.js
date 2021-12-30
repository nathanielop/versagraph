import formatCoordinate from './format-coordinate.js';
import formatLayer from './format-layer.js';

export default values => {
  const layer = formatLayer(values);
  return {
    coordinates: layer.coordinates.map(formatCoordinate),
    ...layer
  };
};
