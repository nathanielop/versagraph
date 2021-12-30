import getMax from './get-max.js';
import getMin from './get-min.js';

export default data => {
  const max = getMax(data);
  const min = getMin(data);
  // TODO: return getX, getY globals fns from here
  return { max, min };
};
