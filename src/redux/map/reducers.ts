import { SET_MARKERS, REMOVE_MARKER, ADD_MARKER } from "./actionTypes";

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
        case REMOVE_MARKER: {
            const { marker } = action.payload;
            return {
                ...state,
                markers: state.markers.filter((item: any) => item.id !== marker.id)
            };
        }
        case ADD_MARKER: {
            const { marker } = action.payload;
            return {
                ...state,
                markers: [
                    ...state.markers,
                    marker
                ]
            };
        }
        default:
            return state;
    }
}
