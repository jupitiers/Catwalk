import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
// context import
import {RootProvider} from './state/contexts/RootContext';


ReactDOM.render(
<RootProvider>
  <App />
</RootProvider>,
document.getElementById('app')
);