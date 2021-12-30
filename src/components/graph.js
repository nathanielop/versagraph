import getGlobals from '../functions/get-globals.js';
import getStrLength from '../functions/get-str-length.js';
import getUsableProperties from '../functions/get-usable-properties.js';
import pairCoordinates from '../functions/pair-coodinates.js';
import round from '../functions/round.js';
import sanitizeValues from '../functions/sanitize-values.js';
import times from '../functions/times.js';

import Border from './border.js';
import Container from './container.js';
import Layer from './layer.js';
import Legend from './legend.js';

export default ({ error, data: initial, ...props }) => {
  const layers = initial.map(layer => sanitizeValues(layer));

  const graphProps = getUsableProperties(props);

  const {
    allowNegative,
    lineProps,
    containerProps,
    fallback,
    titleProps,
    textProps,
    gridWidth,
    borderWidth,
    grid,
    title,
    legend,
    border,
    yLabels,
    xLabels,
    xLabel,
    yLabel,
    yLabelPrefix
  } = graphProps;

  const { max, min, width, height, getY, getX, offset, interval } = getGlobals({
    layers,
    props: graphProps
  });

  return (
    <Container props={containerProps} data={{ max, min }}>
      {title && (
        <text style={{ fill: 'black', fontSize: '24px' }} {...titleProps}>
          <textPath startOffset='50%' textAnchor='middle'>
            {title}
          </textPath>
        </text>
      )}
      {legend && (
        <svg
          width='100%'
          x={100 - width}
          y='7'
          style={{
            fill: 'rgb(235,235,235)',
            overflow: 'visible',
            borderRadius: '9999px'
          }}
        >
          <rect
            x={`${
              (100 -
                (Array.isArray(legend) ? legend.slice(0, 3) : [legend]).length *
                  20) /
              2
            }%`}
            y='0'
            width={`${
              (Array.isArray(legend) ? legend.slice(0, 3) : [legend]).length *
              20
            }%`}
            height='5%'
            fill='rgb(243, 244, 246)'
            stroke='black'
            strokeWidth='0.1'
            ry='1'
            rx='1'
          />
          {(Array.isArray(legend) ? legend.slice(0, 3) : [legend]).map(
            (legend, i) => (
              <Legend
                key={`legend_${i}`}
                index={i}
                legend={legend}
                name={legend}
                color={
                  Array.isArray(lineProps.color)
                    ? lineProps.color[i] ?? 'black'
                    : lineProps.color ?? 'black'
                }
              />
            )
          )}
        </svg>
      )}
      {yLabels && (
        <svg y={offset.y} height={height} style={{ overflow: 'visible' }}>
          {yLabel && (
            <text
              y={'56%'}
              style={{ fill: 'rgb(255, 86, 0)', fontSize: '3px' }}
            >
              {yLabel}
            </text>
          )}
          {!error &&
            times((interval.y ?? 5) + (allowNegative ? 3 : 2), i => (
              <text
                key={`y_label_${i}`}
                x={
                  labelWidth -
                  ((i === (interval.y ?? 5) + (allowNegative ? 3 : 2) - 1 &&
                  !allowNegative
                    ? 0
                    : max - i * interval.y
                  )
                    .toFixed(2)
                    .toString().length +
                    1) +
                  (yLabel ? 100 - width - 10 : 0)
                }
                y={`${getY(max - i * (interval.y * 1)) + 1.25}%`}
                style={{
                  fill: 'black',
                  fontWeight: 'lighter',
                  fontSize: '2.5px'
                }}
              >
                {`${yLabelPrefix ?? ''}
                   ${(i === (interval.y ?? 5) + (allowNegative ? 3 : 2) - 1 &&
                   !allowNegative
                     ? 0
                     : max - i * interval.y
                   ).toFixed(2)}`}
              </text>
            ))}
        </svg>
      )}
      <svg width={width} height={height} y={offset.y} x={100 - width}>
        {error ? (
          <text
            x='42%'
            y='50%'
            style={{
              fill: 'rgb(125,125,125)',
              fontSize: '4px',
              fontWeight: 'bold',
              stroke: 'none'
            }}
          >
            {error ?? fallback}
          </text>
        ) : (
          <>
            {grid.y &&
              times((interval.y ?? 5) + 2, i => (
                <line
                  key={`grid_y_line_${i}`}
                  x1='0%'
                  x2='100%'
                  y1={`${getY(max - i * interval.y)}%`}
                  y2={`${getY(max - i * interval.y)}%`}
                  style={{ strokeWidth: '0.15px', stroke: 'black' }}
                />
              ))}
            {layers &&
              layers.map((layer, i) => (
                <Layer key={`layer-${i}`} props={graphProps} layer={layer} />
              ))}
          </>
        )}
      </svg>
      {border && <Border />}
      {xLabels && (
        <svg
          width={width}
          x={100 - width}
          y={height + offset.y}
          style={{
            fill: 'white',
            overflow: 'visible'
          }}
        >
          {!error &&
            times(nodesLength, i => (
              <text
                key={`x_label_${i}`}
                y='5'
                x={`${
                  !isNaN((100 / (nodesLength - 1)) * i - 1)
                    ? (100 / (nodesLength - 1)) * i -
                      1 -
                      0.5 * getStrLength(xLabels[nodesLength - 1 - i] ?? i)
                    : 0
                }%`}
                style={{
                  fill: 'black',
                  fontWeight: 'lighter',
                  fontSize: '2.5px'
                }}
              >
                {xLabels[nodesLength - 1 - i] ?? i}
              </text>
            ))}
          {xLabel && (
            <text
              y={error ? '5%' : '10%'}
              x={`${50 - 1.2 * getStrLength(xLabel)}%`}
              style={{ fill: 'rgb(255, 86, 0)', fontSize: '3px' }}
            >
              {xLabel}
            </text>
          )}
        </svg>
      )}
    </Container>
  );
};
