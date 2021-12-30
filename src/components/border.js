export default ({ yOffset, graphWidth, graphHeight }) => (
  <rect
    width={graphWidth}
    height={graphHeight}
    y={yOffset}
    x={100 - graphWidth}
    style={{
      display: 'flex',
      fill: 'none',
      stroke: 'black',
      strokeWidth: '0.25px'
    }}
  />
);
