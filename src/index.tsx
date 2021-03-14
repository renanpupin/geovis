import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import FPSStats from "src/libs/fps-stats";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from './redux/store'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
        {process.env.NODE_ENV === 'development' && <FPSStats right={0} left={'auto'} />}
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
