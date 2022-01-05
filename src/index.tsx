import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
