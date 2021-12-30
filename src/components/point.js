export default ({ getX, getY, coordinate: [x, y], props }) => (
  <circle cx={`${getX(x ?? index)}%`} cy={`${getY(y)}%`} {...props} />
);
