export default (iterations, iterate) => new Array(iterations).fill().map((val,i) => iterate(i));
