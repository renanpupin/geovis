import { LOAD_DATA, REMOVE_DATA_ITEM, ADD_DATA_ITEM, ADD_VISUALIZATION, ADD_FILTER, REMOVE_FILTER, TOGGLE_FILTER, REMOVE_VISUALIZATION } from "./actionTypes";

import {VisualizationTypeValues, VisualizationTypes, FilterTypes} from 'src/redux/data/types'

export const setData = (data: object[]) => ({
    type: LOAD_DATA,
    payload: {
        data
    }
});

export const removeDataItem = (dataItem: object) => ({
    type: REMOVE_DATA_ITEM,
    payload: {
        dataItem
    }
});

export const addDataItem = (dataItem: object) => ({
    type: ADD_DATA_ITEM,
    payload: {
        dataItem
    }
});

export const addVisualization = (type: VisualizationTypeValues) => ({
    type: ADD_VISUALIZATION,
    payload: {
        type
    }
});

export const removeVisualization = (visualization: VisualizationTypes) => ({
    type: REMOVE_VISUALIZATION,
    payload: {
        visualization
    }
});

export const addFilter = (filter: FilterTypes) => ({
    type: ADD_FILTER,
    payload: {
        filter
    }
});

export const removeFilter = (filter: FilterTypes) => ({
    type: REMOVE_FILTER,
    payload: {
        filter
    }
});

export const toggleFilter = (filter: FilterTypes, toggle: boolean) => ({
    type: TOGGLE_FILTER,
    payload: {
        toggle
    }
});
