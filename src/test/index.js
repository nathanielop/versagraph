// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render } from 'react-dom';

import Graph from '../index.js';

import data from './data.js';

const { document } = window;

render(<Graph {...data} />, document.getElementById('graph'));
