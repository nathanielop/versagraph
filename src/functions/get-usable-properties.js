import defaults from '../constants/defaults.js';

export default props =>
  Object.entries(defaults).reduce(
    (memo, [key, val]) => Object.assign(memo, { [key]: props?.[key] ?? val }),
    {}
  );
