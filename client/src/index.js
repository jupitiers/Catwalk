import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// context import
import { RootProvider } from './state/contexts/RootContext';
// render props
import ClickTracker from './components/ClickTracker';

ReactDOM.render(
  <RootProvider>
    <ClickTracker render={() => <App />} />
  </RootProvider>,
  document.getElementById('app'),
);
