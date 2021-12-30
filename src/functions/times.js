export default (iterations, iterate) =>
  new Array(iterations).fill().map((_, i) => iterate(i));
