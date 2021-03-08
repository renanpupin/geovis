import { LOAD_DATA, REMOVE_DATA_ITEM, ADD_DATA_ITEM, ADD_VISUALIZATION } from "./actionTypes";

export const setData = (data: any) => ({
    type: LOAD_DATA,
    payload: {
        data
    }
});

export const removeDataItem = (marker: any) => ({
    type: REMOVE_DATA_ITEM,
    payload: {
        marker
    }
});

export const addDataItem = (marker: any) => ({
    type: ADD_DATA_ITEM,
    payload: {
        marker
    }
});

export const addVisualization = (type: any) => ({
    type: ADD_VISUALIZATION,
    payload: {
        type
    }
});
