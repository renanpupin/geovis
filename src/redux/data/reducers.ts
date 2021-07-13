import {
    LOAD_DATA,
    // REMOVE_DATA_ITEM,
    // ADD_DATA_ITEM,
    CLEAR_DATA,
    ADD_VISUALIZATION,
    ADD_FILTER,
    REMOVE_FILTER,
    TOGGLE_FILTER,
    REMOVE_VISUALIZATION,
    TOGGLE_VISUALIZATION,
    SET_HIGHLIGHT,
} from "./actionTypes";
import { applyFilters, getAttributesStats } from "./filters";

import {StateProps} from "./types";

const initialState: StateProps = {
    attributes: [],
    attributesStats: [],
    rows: [],
    visibleRows: [],
    latAttribute: undefined,
    lonAttribute: undefined,
    filters: [],
    visualizations: [],
    highlight: [],
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case LOAD_DATA: {
            const { data } = action.payload;
            return {
                ...state,
                rows: data.rows,
                visibleRows: data.rows,
                attributes: data.attributes,
                latAttribute: data.latAttribute,
                lonAttribute: data.lonAttribute,
                attributesStats: getAttributesStats(data.rows, data.attributes)
            };
        }
        case CLEAR_DATA: {
            return initialState
        }
        // case REMOVE_DATA_ITEM: {
        //     const { dataItem } = action.payload;
        //     return {
        //         ...state,
        //         data: state.data.filter((item: any) => item.id !== dataItem.id)
        //     };
        // }
        // case ADD_DATA_ITEM: {
        //     const { dataItem } = action.payload;
        //     return {
        //         ...state,
        //         data: [
        //             ...state.data,
        //             dataItem
        //         ]
        //     };
        // }
        case ADD_VISUALIZATION: {
            const { visualization } = action.payload;

            const id: string = String(state.visualizations.length+1)

            return {
                ...state,
                visualizations: [
                    ...state.visualizations,
                    {
                        id,
                        ...visualization,
                        visible: true
                    }
                ]
            };
        }
        case REMOVE_VISUALIZATION: {
            const { id } = action.payload;

            return {
                ...state,
                visualizations: state.visualizations.filter(item => item.id !== id)
            };
        }
        case TOGGLE_VISUALIZATION: {
            const { id, toggle } = action.payload;

            return {
                ...state,
                visualizations: state.visualizations.map(item => {
                    if(item.id === id){
                        return {
                            ...item,
                            visible: toggle
                        };
                    }else{
                        return item;
                    }
                })
            };
        }
        case ADD_FILTER: {
            const { filter } = action.payload;

            const id: string = String(state.filters.filter((item: any) => item.type === filter.type).length+1)

            const updatedFilters: any = [
                ...state.filters,
                {
                    id,
                    ...filter,
                    visible: true
                }
            ];

            return {
                ...state,
                filters: updatedFilters,
                attributesStats: getAttributesStats(state.rows, state.attributes),
                visibleRows: applyFilters(state.rows, updatedFilters, state.attributes)
            };
        }
        case REMOVE_FILTER: {
            const { id } = action.payload;

            const updatedFilters = state.filters.filter(item => item.id !== id);

            return {
                ...state,
                filters: updatedFilters,
                attributesStats: getAttributesStats(state.rows, state.attributes),
                visibleRows: applyFilters(state.rows, updatedFilters, state.attributes)
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
                attributesStats: getAttributesStats(state.rows, state.attributes),
                visibleRows: applyFilters(state.rows, updatedFilters, state.attributes)
            };
        }
        case SET_HIGHLIGHT: {
            const { highlight } = action.payload;

            return {
                ...state,
                highlight: highlight,
            };
        }
        default:
            return state;
    }
}
