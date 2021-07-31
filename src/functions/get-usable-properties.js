import defaults from '../constants/defaults.js';

export default props => {
  const props = {};
  for (const [key, val] of defaults) {
    Object.assign(props, { [key]: props[key] ?? val })
  }
  return props;
}