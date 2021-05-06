import attributes from '../constants/attributes.js';

const { document } = window;

export default ({ coordinate, props }) => {
  const newEl = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  Object.entries(attributes.point).map(([key, val]) => {
    newEl.setAttribute(key, coordinate[val]);
  });
  newEl.setAttribute('r', props.radius ?? '2px');
  newEl.setAttribute(
    'style',
    `fill:black;stroke-width:3%;stroke-linecap:round;`
  );
  return newEl;
};
