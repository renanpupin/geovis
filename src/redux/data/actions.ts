import { LOAD_DATA, ADD_VISUALIZATION, ADD_FILTER, REMOVE_FILTER, TOGGLE_FILTER, TOGGLE_VISUALIZATION, REMOVE_VISUALIZATION } from "./actionTypes";

import {VisualizationTypeValues, VisualizationTypes, FilterTypes} from 'src/redux/data/types'

export const loadData = (data: object) => ({
    type: LOAD_DATA,
    payload: {
        data
    }
});

// export const removeDataItem = (dataItem: object) => ({
//     type: REMOVE_DATA_ITEM,
//     payload: {
//         dataItem
//     }
// });
//
// export const addDataItem = (dataItem: object) => ({
//     type: ADD_DATA_ITEM,
//     payload: {
//         dataItem
//     }
// });

export const addVisualization = (type: VisualizationTypeValues) => ({
    type: ADD_VISUALIZATION,
    payload: {
        type
    }
});

export const removeVisualization = (id: any) => ({
    type: REMOVE_VISUALIZATION,
    payload: {
        id
    }
});

export const toggleVisualization = (visualization: VisualizationTypes, toggle: boolean) => ({
    type: TOGGLE_VISUALIZATION,
    payload: {
        visualization,
        toggle
    }
});

export const addFilter = (filter: FilterTypes) => ({
    type: ADD_FILTER,
    payload: {
        filter
    }
});

export const removeFilter = (filter: FilterTypes) => ({
    type: REMOVE_FILTER,
    payload: {
        filter
    }
});

export const toggleFilter = (filter: FilterTypes, toggle: boolean) => ({
    type: TOGGLE_FILTER,
    payload: {
        toggle
    }
});
