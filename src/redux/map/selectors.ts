import {RootState} from "../store";

export const getMapState = (store: RootState): any => store.map;

export const getVisibleData = (store: RootState): any => getMapState(store)?.markers
