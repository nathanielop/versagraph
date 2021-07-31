export default ({ name, color, index, legend }) => {
    const offsetX =
      (100 -
        (Array.isArray(legend) ? legend.slice(0, 3) : [legend]).length * 20) /
        2 +
      4;
    const textPaddingLeft = 1.5;
    const xIntervals = 20;
    return (
      <>
        <circle
          key={`legend_point_${index}`}
          cy='2.5'
          cx={`${offsetX + xIntervals * index}%`}
          r='0.5px'
          style={{ fill: color }}
        />
        <text
          y='3.25'
          x={`${offsetX + xIntervals * index + textPaddingLeft}%`}
          style={{
            fill: 'black',
            fontSize: '2px',
            fontWeight: 'semibold'
          }}
        >
          {name}
        </text>
      </>
    );
  };