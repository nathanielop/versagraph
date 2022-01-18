// eslint-disable-next-line no-unused-vars
import React from 'react';

import getGlobals from '../functions/get-globals.js';
import getUsableProperties from '../functions/get-usable-properties.js';
import sanitizeValues from '../functions/sanitize-values.js';

import Border from './border.js';
import Container from './container.js';
import Layer from './layer.js';

export default ({ error, data: initial, ...props }) => {
  const layers = initial.map(layer => sanitizeValues(layer));

  const graphProps = getUsableProperties(props);

  const { layerProps, containerProps, borderProps, border } = graphProps;

  const spec = getGlobals({ layers, props: graphProps });

  return (
    <Container props={containerProps} data={spec}>
      {border && <Border data={spec} {...borderProps} />}
      {error && <text>{error}</text>}
      {layers.map((layer, i) => (
        <Layer key={i} layer={layer} {...spec} {...layerProps} />
      ))}
    </Container>
  );
};
