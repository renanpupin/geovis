import { LOAD_DATA, REMOVE_DATA_ITEM, ADD_DATA_ITEM, CLEAR_DATA, ADD_VISUALIZATION } from "./actionTypes";

const initialState = {
    data: [],
    visibleData: [],
    filters: [],
    visualizations: [],
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
        case CLEAR_DATA: {
            return initialState
        }
        case REMOVE_DATA_ITEM: {
            const { marker } = action.payload;
            return {
                ...state,
                data: state.data.filter((item: any) => item.id !== marker.id)
            };
        }
        case ADD_DATA_ITEM: {
            const { marker } = action.payload;
            return {
                ...state,
                data: [
                    ...state.data,
                    marker
                ]
            };
        }
        case ADD_VISUALIZATION: {
            const { type } = action.payload;
            return {
                ...state,
            // @ts-ignore
                visualizations: state.visualizations.includes(type) ? state.visualizations : [
                    ...state.visualizations,
                    type
                ]
            };
        }
        default:
            return state;
    }
}
