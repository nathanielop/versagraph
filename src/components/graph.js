import { Fragment, useCallback, useRef } from 'react';

import calculateGraphProperties from '../functions/calculate-graph-properties.js';
import getMax from '../functions/get-max.js';
import getMin from '../functions/get-min.js';
import getStrLength from '../functions/get-str-length.js';
import getUsableProperties from '../functions/get-usable-properties.js';
import pairCoordinates from '../functions/pair-coodinates.js';
import round from '../functions/round.js';
import sanitizeValues from '../functions/sanitize-values.js';
import times from '../functions/times.js';
import useElWatcher from '../hooks/use-el-watcher.js';

import Bar from './bar.js';
import Container from './container.js';
import Legend from './legend.js';
import Line from './line.js';
import Point from './point.js';

export default ({ data: initial, ...props }) => {
  const elRef = useRef();

  const data = initial.map(layer => sanitizeValues(layer));

  const {
    allowNegative,
    barProps,
    lineProps,
    pointProps,
    containerProps,
    titleProps,
    textProps,
    type,
    gridWidth,
    borderWidth,
    grid,
    border,
    labelY,
    labelX
  } = getUsableProperties(props);

  const { max, min, width, height } = calculateGraphProperties(data);

  return (
    <Container elRef={elRef} props={containerProps} data={data}>
      {props.title && (
        <text style={{ fill: titleColor, fontSize: '24px' }}>
          <textPath startOffset='50%' textAnchor='middle'>
            {props.title}
          </textPath>
        </text>
      )}
      {props.legend && (
        <svg
          width='100%'
          x={100 - graphWidth}
          y='7'
          className='fill-current text-gray-100 overflow-visible rounded-full'
        >
          <rect
            x={`${
              (100 -
                (Array.isArray(props.legend)
                  ? props.legend.slice(0, 3)
                  : [props.legend]
                ).length *
                  20) /
              2
            }%`}
            y='0'
            width={`${
              (Array.isArray(props.legend)
                ? props.legend.slice(0, 3)
                : [props.legend]
              ).length * 20
            }%`}
            height='5%'
            fill='rgb(243, 244, 246)'
            stroke='black'
            strokeWidth='0.1'
            ry='1'
            rx='1'
          />
          {(Array.isArray(props.legend)
            ? props.legend.slice(0, 3)
            : [props.legend]
          ).map((legend, i) => (
            <Legend
              key={`legend_${i}`}
              index={i}
              legend={props.legend}
              name={legend}
              color={
                Array.isArray(props.lineColor)
                  ? props.lineColor[i] ?? 'black'
                  : props.lineColor ?? 'black'
              }
            />
          ))}
        </svg>
      )}
      {labelY && (
        <svg y={yOffset} height={graphHeight} className='overflow-visible'>
          {props.yAxisLabel && (
            <text
              y={'56%'}
              style={{ fill: 'rgb(255, 86, 0)', fontSize: '3px' }}
            >
              {props.yAxisLabel}
            </text>
          )}
          {!showError &&
            times((props.yInterval ?? 5) + (allowNegative ? 3 : 2), i => (
              <text
                key={`y_label_${i}`}
                x={
                  labelWidth -
                  ((i ===
                    (props.yInterval ?? 5) + (allowNegative ? 3 : 2) - 1 &&
                  !allowNegative
                    ? 0
                    : graphMax - i * yInterval
                  )
                    .toFixed(2)
                    .toString().length +
                    1) +
                  (props.yAxisLabel ? 100 - graphWidth - 10 : 0)
                }
                y={`${getY(graphMax - i * (yInterval * 1)) + 1.25}%`}
                style={{
                  fill: props.yLabelColor ?? 'black',
                  fontWeight: 'lighter',
                  fontSize: '2.5px'
                }}
              >
                {`${props.yAxisLabelPrefix ?? ''}
                   ${(i ===
                     (props.yInterval ?? 5) + (allowNegative ? 3 : 2) - 1 &&
                   !allowNegative
                     ? 0
                     : graphMax - i * yInterval
                   ).toFixed(2)}`}
              </text>
            ))}
        </svg>
      )}
      <svg
        width={graphWidth}
        height={graphHeight}
        y={yOffset}
        x={100 - graphWidth}
      >
        {showError &&
          (!props.noData ? (
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
              No Data
            </text>
          ) : (
            props.noData
          ))}
        {!showError &&
          (!props.yGrid || props.yGrid !== false) &&
          times((props.yInterval ?? 5) + 2, i => (
            <line
              key={`grid_y_line_${i}`}
              x1={'0%'}
              x2={'100%'}
              y1={`${getY(graphMax - i * yInterval)}%`}
              y2={`${getY(graphMax - i * yInterval)}%`}
              style={{ strokeWidth: '0.15px', stroke: 'black' }}
            />
          ))}
        {!showError &&
          (!props.type ||
            props.type === 'line' ||
            props.type === 'multiline') &&
          (props.type === 'multiline' ? coordinates : [coordinates]).map(
            (layer, i) => (
              <Fragment key={`layer_${i}`}>
                {(props.type === 'multiline'
                  ? pairedCoords[i]
                  : pairedCoords
                ).map((coords, w) => (
                  <Line key={`graph_line_${w}`} coords={coords} index={w} />
                ))}
                {layer.map(
                  (coordinate, y) =>
                    coordinate.y !== null &&
                    (props.allowNegative || coordinate.y > 0) && (
                      <Point
                        key={`graph_point_${i}`}
                        coordinate={coordinate}
                        index={y}
                      />
                    )
                )}
              </Fragment>
            )
          )}
        {!showError &&
          props.type &&
          props.type === 'boxPlot' &&
          coordinates.map((layer, i) => (
            <Fragment key={`layer_${i}`}>
              {layer.type === 'line' ? (
                <>
                  {pairedCoords[i].map((coords, w) => (
                    <Line key={`graph_line_${w}`} coords={coords} index={w} />
                  ))}
                  {layer.nodes.map(
                    (coordinate, i) =>
                      coordinate.y !== null &&
                      (props.allowNegative || coordinate.y > 0) && (
                        <Point
                          key={`graph_point_${i}`}
                          coordinate={coordinate}
                          index={i}
                        />
                      )
                  )}
                </>
              ) : (
                layer.nodes.map((coordinate, i) => (
                  <Bar
                    key={`graph_bar_${i}`}
                    coordinate={{ ...coordinate, y: coordinate.y2 }}
                    height={`${getY(coordinate.y1) - getY(coordinate.y2)}%`}
                    index={i}
                  />
                ))
              )}
            </Fragment>
          ))}
        {!showError && props.type && props.type === 'bar' && (
          <>
            {coordinates.map((coordinate, i) => (
              <Bar
                key={`graph_bar_${i}`}
                coordinate={coordinate}
                height={`${100 - getY(coordinate.y)}%`}
                index={i}
              />
            ))}
          </>
        )}
      </svg>
      <rect
        className='flex'
        width={graphWidth}
        height={graphHeight}
        y={yOffset}
        x={100 - graphWidth}
        style={{
          fill: 'none',
          stroke: 'black',
          strokeWidth: '0.25px'
        }}
      />
      {props.xLabels && (
        <svg
          width={graphWidth}
          x={100 - graphWidth}
          y={graphHeight + yOffset}
          className='fill-current text-white overflow-visible'
        >
          {!showError &&
            times(nodesLength, i => (
              <text
                key={`x_label_${i}`}
                y='5'
                x={`${
                  !isNaN((100 / (nodesLength - 1)) * i - 1)
                    ? (100 / (nodesLength - 1)) * i -
                      1 -
                      0.5 *
                        getStrLength(props.xLabels[nodesLength - 1 - i] ?? i)
                    : 0
                }%`}
                style={{
                  fill: 'black',
                  fontWeight: 'lighter',
                  fontSize: '2.5px'
                }}
              >
                {props.xLabels[nodesLength - 1 - i] ?? i}
              </text>
            ))}
          {props.xAxisLabel && (
            <text
              y={showError ? '5%' : '10%'}
              x={`${50 - 1.2 * getStrLength(props.xAxisLabel)}%`}
              style={{ fill: 'rgb(255, 86, 0)', fontSize: '3px' }}
            >
              {props.xAxisLabel}
            </text>
          )}
        </svg>
      )}
    </Container>
  );
};
