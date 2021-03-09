import {
    LOAD_DATA,
    REMOVE_DATA_ITEM,
    ADD_DATA_ITEM,
    CLEAR_DATA,
    ADD_VISUALIZATION,
    ADD_FILTER,
    REMOVE_FILTER,
    TOGGLE_FILTER
} from "./actionTypes";
import { applyFilters, filterAttributes } from "./filters";

import {StateProps} from "./types";

const initialState: StateProps = {
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
                visibleData: data,
                attributes: filterAttributes(data[0])
            };
        }
        case CLEAR_DATA: {
            return initialState
        }
        case REMOVE_DATA_ITEM: {
            const { dataItem } = action.payload;
            return {
                ...state,
                data: state.data.filter((item: any) => item.id !== dataItem.id)
            };
        }
        case ADD_DATA_ITEM: {
            const { dataItem } = action.payload;
            return {
                ...state,
                data: [
                    ...state.data,
                    dataItem
                ]
            };
        }
        case ADD_VISUALIZATION: {
            const { type } = action.payload;
            return {
                ...state,
                visualizations: [
                    ...state.visualizations,
                    {
                        type,
                        visible: true
                    }
                ]
            };
        }
        case ADD_FILTER: {
            const { filter } = action.payload;

            const updatedFilters = [
                ...state.filters,
                filter
            ];

            return {
                ...state,
                filters: updatedFilters,
                visibleData: applyFilters(state.data, updatedFilters)
            };
        }
        case REMOVE_FILTER: {
            const { filter } = action.payload;

            const updatedFilters = state.filters.filter(item => item !== filter);

            return {
                ...state,
                filters: updatedFilters,
                visibleData: applyFilters(state.data, updatedFilters)
            };
        }
        case TOGGLE_FILTER: {
            const { filter, toggle } = action.payload;

            const updatedFilters = state.filters.map(item => {
                if(item === filter){
                    return {
                        ...item,
                        visible: toggle
                    };
                }else{
                    return item;
                }
            })

            return {
                ...state,
                filters: updatedFilters,
                visibleData: applyFilters(state.data, updatedFilters)
            };
        }
        default:
            return state;
    }
}
