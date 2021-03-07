import { SET_MARKERS } from "./actionTypes";

const initialState = {
    map: null,
    markers: [],
    visibleMarkers: []
};

export default function(state = initialState, action: any) {
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
