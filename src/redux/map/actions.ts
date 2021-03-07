import { SET_MARKERS, REMOVE_MARKER, ADD_MARKER } from "./actionTypes";

export const setMarkers = (markers: any) => ({
    type: SET_MARKERS,
    payload: {
        markers
    }
});

export const removeMarker = (marker: any) => ({
    type: REMOVE_MARKER,
    payload: {
        marker
    }
});

export const addMarker = (marker: any) => ({
    type: ADD_MARKER,
    payload: {
        marker
    }
});
