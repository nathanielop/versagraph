export default arr => Math.max(...arr.flatMap(o => (o ? [o.y] : [])));
