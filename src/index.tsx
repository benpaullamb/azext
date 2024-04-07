import './styles.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import loadCss from './load-css';
import App from './App';
import { getSortedResults, updateResults } from './sort-results';

updateResults([], getSortedResults());
loadCss();

const resultsTitle = document.querySelector('[data-index="1"]');
const container = document.createElement('div');
resultsTitle?.before(container);

const root = createRoot(container);
root.render(<App />);
