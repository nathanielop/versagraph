export default ({ coords: [[x1,y1], [x2,y2]], props }) => (
  <line
    x1={`${getX(x1)}%`}
    x2={`${getX(x2)}%`}
    y1={`${getY(y1)}%`}
    y2={`${getY(y2)}%`}
    {...props}
  />
);
