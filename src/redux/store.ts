import { createStore } from "redux";
import rootReducer from "./reducers";

export default createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>
