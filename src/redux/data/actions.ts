import { LOAD_DATA, REMOVE_DATA_ITEM, ADD_MARKER } from "./actionTypes";

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
    type: ADD_MARKER,
    payload: {
        marker
    }
});
