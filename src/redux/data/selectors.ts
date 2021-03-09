import {RootState} from "../store";
import {FilterTypes, VisualizationTypes, AttributeTypes} from "src/redux/data/types";

export const getDataState = (store: RootState): any => store.data;

export const getData = (store: RootState): object[] => getDataState(store)?.data

export const getVisibleData = (store: RootState): object[] => getDataState(store)?.visibleData

export const getVisualizations = (store: RootState): VisualizationTypes[] => getDataState(store)?.visualizations

export const getFilters = (store: RootState): FilterTypes[] => getDataState(store)?.filters

export const getAttributes = (store: RootState): AttributeTypes[] => getDataState(store)?.attributes
