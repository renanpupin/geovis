import { SET_MARKERS } from "./actionTypes";

const initialState = {
    map: null,
    markers: null,
    visibleMarkers: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_MARKERS: {
            const { markers } = action.payload;
            return {
                ...state,
                markers
            };
        }
        default:
            return state;
    }
}
