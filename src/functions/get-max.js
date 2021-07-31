export default arr => Math.max.apply(
  Math,
  arr.filter(val => val).map(o => o.y)
);
