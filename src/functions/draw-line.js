import attributes from '../constants/attributes.js';

const { document } = window;

export default ({ coordinates, props }) => {
  const { x: x1, y: y1 } = coordinates[0];
  const { x: x2, y: y2 } = coordinates[1];
  const obj = { x1: x1, y1: y1, x2: x2, y2: y2 };
  const newEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  Object.entries(attributes.line).map(([key, val]) => {
    newEl.setAttribute(key, obj[val]);
  });
  newEl.setAttribute(
    'style',
    `fill:${props.lineColor ?? 'black'};stroke-width:${
      props.lineWidth ?? '1'
    }%;stroke:${props.lineColor ?? 'black'};`
  );
  return newEl;
};
