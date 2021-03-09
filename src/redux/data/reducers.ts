import { LOAD_DATA, REMOVE_DATA_ITEM, ADD_DATA_ITEM, CLEAR_DATA, ADD_VISUALIZATION, ADD_FILTER, REMOVE_FILTER } from "./actionTypes";
import { applyFilters, filterAttributes } from "./filters";

const initialState = {
    attributes: [],
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
                data,
                attributes: filterAttributes(data[0])
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
                visualizations: state.visualizations.includes(type) ? state.visualizations : [
                    ...state.visualizations,
                    type
                ]
            };
        }
        case ADD_FILTER: {
            const { filter } = action.payload;
            return {
                ...state,
                filters: state.filters.includes(filter) ? state.filters : [
                    ...state.filters,
                    filter
                ],
                visibleData: applyFilters(state.data, state.filters)
            };
        }
        case REMOVE_FILTER: {
            const { filter } = action.payload;
            return {
                ...state,
                filters: state.filters.filter(item => item !== filter),
                visibleData: applyFilters(state.data, state.filters)
            };
        }
        default:
            return state;
    }
}
