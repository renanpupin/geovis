import { LOAD_DATA, REMOVE_DATA_ITEM, ADD_DATA_ITEM } from "./actionTypes";

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
