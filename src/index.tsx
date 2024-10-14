import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
// @ts-ignore
import MemoryStatsComponent from 'react-memorystats';
import FPSStats from "src/libs/fps-stats";
import {ENV} from "src/libs/env";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from './redux/store'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
        {ENV !== 'production' && <FPSStats right={81} left={'auto'} />}
        {ENV !== 'production' && <div style={{zIndex: 99999, position: 'fixed'}}><MemoryStatsComponent corner="topRight" /></div>}
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
