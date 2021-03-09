import {RootState} from "../store";

export const getDataState = (store: RootState): any => store.data;

export const getVisibleData = (store: RootState): any => getDataState(store)?.data

export const getVisualizations = (store: RootState): any => getDataState(store)?.visualizations

export const getFilters = (store: RootState): any => getDataState(store)?.filters
