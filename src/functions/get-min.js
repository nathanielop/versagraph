export default arr => Math.min(...arr.flatMap(o => (o ? [o.y] : [])));
