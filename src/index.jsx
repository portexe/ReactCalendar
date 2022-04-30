import React from 'react';
import ReactDOM from 'react-dom'; // render UI in browser
import { App } from './App';
// because index.js inside app folder file export app

ReactDOM.render(<App />, document.getElementById('root'));
// taking in the root element and inducting app (components) to it
