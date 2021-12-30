export default {
  allowNegative: false,
  lineColor: 'rgb(0,0,0)',
  pointProps: {
    onClick: () => {},
    onMouseOver: () => {},
    r: '0.5px',
    style: { color: 'black' }
  },
  lineProps: {
    onClick: () => {},
    onMouseOver: () => {},
    style: { color: 'black', strokeWidth: '0.25px', stroke: 'black' }
  },
  barProps: {
    onClick: () => {},
    onMouseOver: () => {},
    style: {
      color: 'black',
      fill: 'rgb(0,0,0)',
      strokeWidth: '0px'
    }
  },
  type: 'bar',
  lineWidth: '1px',
  gridWidth: '1px',
  borderWidth: '1px',
  grid: true,
  border: true,
  labelY: true,
  labelX: true,
  textColor: 'rgb(0,0,0)'
};
