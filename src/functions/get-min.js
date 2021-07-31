export default getMin = arr => Math.min.apply(
  Math,
  arr.filter(val => val).map(o => o.y)
);
