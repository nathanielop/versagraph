export default ({ coordinate: [x, y], props }) => (
  <circle
    cx={`${getX(x ?? index)}%`}
    cy={`${getY(y)}%`}
    {...props}
  />
);
