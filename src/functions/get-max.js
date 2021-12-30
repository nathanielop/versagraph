export default arr => Math.max(...arr.filter(val => val).map(o => o.y));
