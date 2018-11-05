import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/App';
import registerServiceWorker from './js/registerServiceWorker';


//require("react-big-calendar/lib/css/react-big-calendar.css");


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
