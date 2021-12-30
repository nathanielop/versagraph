export default ({ getX, getY, coordinate: [x, y], props }) => (
  <circle cx={`${getX(x)}%`} cy={`${getY(y)}%`} {...props} />
);
