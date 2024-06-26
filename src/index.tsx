import './styles.css';
import loadCss from './load-css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initAmazonResults } from './results-utils';

loadCss();

initAmazonResults();

const resultsTitle = document.querySelector('[data-index="1"]');
const container = document.createElement('div');
resultsTitle?.before(container);

const root = createRoot(container);
root.render(<App />);
