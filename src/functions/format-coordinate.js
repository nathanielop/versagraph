export default (coordinate, index) => {
  if (coordinate instanceof Array) {
    if (
      coordinate.length === 2 &&
      coordinate.filter(val => val).length === coordinate
    ) {
      return coordinate;
    }
  } else if (coordinate instanceof Object) {
    if (coordinate.x && coordinate.y) {
      return [coordinate.x, coordinate.y];
    }
  } else if (['string', 'number'].includes(typeof coordinate)) {
    return [index, coordinate];
  }
  throw new Error(`Invalid coordinate ${JSON.stringify(coordinate)} provided`);
};
