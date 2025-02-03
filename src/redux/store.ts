import { createStore, applyMiddleware } from "redux";
import {createLogger} from 'redux-logger'
import rootReducer from "./reducers";

const logger = createLogger({
    timestamp: true,
    duration: true,
});

export default createStore(rootReducer, applyMiddleware(logger));

export type RootState = ReturnType<typeof rootReducer>
