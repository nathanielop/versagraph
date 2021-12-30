export default arr => Math.min(...arr.filter(val => val).map(o => o.y));
