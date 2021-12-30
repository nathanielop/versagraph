import Bar from './bar.js';
import Line from './line.js';
import Point from './point.js';

export default ({ layer: { type, coordinates, ...props } }) => (
  <>
    {(!type || type === 'line' || type === 'multiline') &&
      (type === 'multiline' ? coordinates : [coordinates]).map((layer, i) => (
        <Fragment key={`layer_${i}`}>
          {(type === 'multiline' ? pairedCoords[i] : pairedCoords).map(
            (coords, w) => (
              <Line key={`graph_line_${w}`} coords={coords} index={w} />
            )
          )}
          {layer.map(
            (coordinate, y) =>
              coordinate.y !== null &&
              (props.allowNegative || coordinate.y > 0) && (
                <Point
                  key={`graph_point_${i}`}
                  coordinate={coordinate}
                  index={y}
                  {...pointProps}
                />
              )
          )}
        </Fragment>
      ))}
    {type &&
      type === 'boxPlot' &&
      coordinates.map((layer, i) => (
        <Fragment key={`layer_${i}`}>
          {layer.type === 'line' ? (
            <>
              {pairedCoords[i].map((coords, w) => (
                <Line
                  key={`graph_line_${w}`}
                  coords={coords}
                  index={w}
                  {...lineProps}
                />
              ))}
              {layer.nodes.map(
                (coordinate, i) =>
                  coordinate.y !== null &&
                  (props.allowNegative || coordinate.y > 0) && (
                    <Point
                      key={`graph_point_${i}`}
                      coordinate={coordinate}
                      index={i}
                      {...pointProps}
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
                {...barProps}
              />
            ))
          )}
        </Fragment>
      ))}
    {type && type === 'bar' && (
      <>
        {coordinates.map((coordinate, i) => (
          <Bar
            key={`graph_bar_${i}`}
            coordinate={coordinate}
            height={`${100 - getY(coordinate.y)}%`}
            index={i}
            {...barProps}
          />
        ))}
      </>
    )}
  </>
);
