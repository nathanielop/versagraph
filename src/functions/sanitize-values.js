import formatCoordinate from './format-coordinate.js';
import formatLayer from './format-layer.js';

export default values => {
  const { coordinates, ...rest } = formatLayer(values);
  return {
    coordinates: coordinates.map(formatCoordinate),
    ...rest
  };
};
