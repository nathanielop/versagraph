import drawLine from './draw-line.js';
import drawPoint from './draw-point.js';

const { document } = window;

/*
 AVAILABLE PROPS
 <------------------>
 type => enum(['point', 'line', 'scatter', 'bar']);
 stretchX => If set, and === false, will interpret coordinate X values as literals against the width
 stretchY => If set, and === false, will interpret coordinate Y values as literals against the height
 labelX => If set, will perform xMax - (props.xOffset ? xMin : 0) / gridXInterval, and label X axis with returned values
 labelY => If set, will perform yMax - (props.yOffset ? yMin : 0) / gridYInterval, and label Y axis with returned values
 gridXInterval => If set, will divide width of graph with lines of interval N
 gridYInterval => If set, will divide height of graph with lines of interval N
 gridX => DEFAULT false, displays a grid on axis X
 gridY => DEFAULT true, displays a grid on axis X
 pointClickHandler => A onClick handler provided to each point. When a point is clicked, will call pointClickHandler providing its coordinates as arguments
 lineClickHandler => A onClick handler provided to each line. When a line is clicked, will call lineClickHandler providing its coordinates pairs as arguments
 lineColor => Self explanatory, css color value for each line, defaults to black
 pointColor => Self explanatory, css color value for each point, defaults to black
*/

export default ({ elRef, coordinates: initial, props = {} }) => {
  const width = props.width ?? 200;
  const height = props.height ?? 200;
  const yMax = Math.max.apply(
    Math,
    initial.map(function (o) {
      return o.y;
    })
  );
  const xMax = Math.max.apply(
    Math,
    initial.map(function (o) {
      return o.x;
    })
  );
  const yScaleFactor =
    props.scaleY && props.scaleY === false
      ? 1
      : height / (yMax * (1 + 1 / (props.gridYInterval ?? 5)));
  const xScaleFactor =
    props.scaleX && props.scaleX === false
      ? 1
      : width / (props.gridXInterval ?? initial.length - 1);
  const coordinates =
    props.stretchX &&
    props.stretchX === false &&
    props.stretchY &&
    props.stretchY === false
      ? initial
      : initial.map((coord, i) => {
          const spacing = width / (initial.length - 1);
          return {
            x:
              coord.x && props.stretchX && props.stretchX === false
                ? coord.x
                : i * spacing,
            y:
              coord.y && props.stretchY && props.stretchY === false
                ? coord.y
                : coord.y * yScaleFactor
          };
        });
  const gridY = props.gridY ?? true;
  const gridX = props.gridX ?? false;
  const type = props.type ?? 'line';

  // x label y label at some point
  const pairedCoords = [];
  coordinates.map(
    (_, i) =>
      i % 1 === 0 &&
      coordinates[i - 1] &&
      pairedCoords.push([coordinates[i], coordinates[i - 1]])
  );
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  el.setAttribute('height', height);
  el.setAttribute('width', width);

  const border = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  border.setAttribute(
    'style',
    `fill:none;stroke:black;stroke-width:1%;width:${width};height:${height}`
  );

  el.appendChild(border);

  if (gridY) {
    const interval = (yMax - (props.offsetY ?? 0)) / (props.gridYInterval ?? 5);
    for (let i = 0; i < 2 + (props.gridYInterval ?? 5); i++) {
      const border = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      border.setAttribute('x1', 0);
      border.setAttribute('x2', width);
      border.setAttribute('y1', i * interval * yScaleFactor);
      border.setAttribute('y2', i * interval * yScaleFactor);
      border.setAttribute(
        'style',
        `fill:black;stroke:black;stroke-width:${props.gridStrokeWidth ?? '1px'}`
      );
      el.appendChild(border);
    }
  }

  if (gridX) {
    const interval = (xMax - (props.offsetX ?? 0)) / (props.gridXInterval ?? 5);
    for (let i = 0; i < 2 + (props.gridXInterval ?? coordinates.length); i++) {
      const border = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      border.setAttribute('x1', i * interval * xScaleFactor);
      border.setAttribute('x2', i * interval * xScaleFactor);
      border.setAttribute('y1', 0);
      border.setAttribute('y2', height);
      border.setAttribute(
        'style',
        `fill:black;stroke:black;stroke-width:${props.gridStrokeWidth ?? '1px'}`
      );
      el.appendChild(border);
    }
  }

  if (type === 'line') {
    pairedCoords.map(coordinates =>
      el.appendChild(drawLine({ coordinates, props }))
    );
    coordinates.map(coordinate =>
      el.appendChild(drawPoint({ coordinate, props }))
    );
  }

  // Since SVGs are built from top left corner out, we must rotate to provide graphical data accurately.
  el.style.transform = 'rotate(180deg)';

  return elRef.current && elRef.current.appendChild(el);
};
