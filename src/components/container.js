// eslint-disable-next-line no-unused-vars
import React from 'react';

export default ({ children, elRef, props, data: { width, height } }) => (
  <svg viewBox={`0 0 ${width} ${height}`} {...props} ref={elRef}>
    {children}
  </svg>
);
