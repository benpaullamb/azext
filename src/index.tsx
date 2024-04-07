import './styles.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import loadCss from './load-css';
import sortResults from './sort-results';
import App from './App';

loadCss();
sortResults();

const resultsTitle = document.querySelector('[data-index="1"]');
const container = document.createElement('div');
resultsTitle?.before(container);

const root = createRoot(container);
root.render(<App />);
