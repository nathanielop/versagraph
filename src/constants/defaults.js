export default {
  allowNegative: false,
  lineColor: 'rgb(0,0,0)',
  layerProps: {
    pointProps: { r: '1px', style: { color: 'black' } },
    lineProps: {
      style: { color: 'black', strokeWidth: '0.25px', stroke: 'black' }
    },
    barProps: {
      barWidth: 20,
      style: { color: 'black', fill: 'rgb(0,0,0)', strokeWidth: '0px' }
    }
  },
  fallback: 'No Data',
  borderProps: {
    style: {
      display: 'flex',
      fill: 'none',
      stroke: 'black',
      strokeWidth: '0.25px'
    }
  },
  lineWidth: '1px',
  gridWidth: '1px',
  grid: { y: true, x: false },
  border: true,
  textColor: 'rgb(0,0,0)'
};
