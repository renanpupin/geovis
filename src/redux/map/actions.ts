import { SET_MARKERS } from "./actionTypes";

export const setMarkers = (markers: any) => ({
    type: SET_MARKERS,
    payload: {
        markers
    }
});
