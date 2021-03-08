import { LOAD_DATA, REMOVE_DATA_ITEM, ADD_MARKER } from "./actionTypes";

const initialState = {
    data: [],
    visibleData: [],
    filters: []
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case LOAD_DATA: {
            const { data } = action.payload;
            return {
                ...state,
                data
            };
        }
        case REMOVE_DATA_ITEM: {
            const { marker } = action.payload;
            return {
                ...state,
                data: state.data.filter((item: any) => item.id !== marker.id)
            };
        }
        case ADD_MARKER: {
            const { marker } = action.payload;
            return {
                ...state,
                data: [
                    ...state.data,
                    marker
                ]
            };
        }
        default:
            return state;
    }
}