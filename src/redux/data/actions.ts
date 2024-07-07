import {
    LOAD_DATA,
    ADD_VISUALIZATION,
    SET_TEMPORAL_FILTER,
    ADD_FILTER,
    REMOVE_FILTER,
    TOGGLE_FILTER,
    TOGGLE_VISUALIZATION,
    REMOVE_VISUALIZATION,
    SET_HIGHLIGHT,
    SET_BOUNDS
} from './actionTypes'

import {VisualizationTypes, FilterTypes, HighlightTypes} from 'src/redux/data/types'

export const loadData = (data: object) => ({
    type: LOAD_DATA,
    payload: {
        data
    }
})

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

export const addVisualization = (visualization: Omit<VisualizationTypes, 'id' | 'visible'>) => ({
    type: ADD_VISUALIZATION,
    payload: {
        visualization
    }
})

export const removeVisualization = (id: any) => ({
    type: REMOVE_VISUALIZATION,
    payload: {
        id
    }
})

export const toggleVisualization = (id: string, toggle: boolean) => ({
    type: TOGGLE_VISUALIZATION,
    payload: {
        id,
        toggle
    }
})

export const addFilter = (filter: Omit<FilterTypes, 'id' | 'visible'>) => ({
    type: ADD_FILTER,
    payload: {
        filter
    }
})

export const removeFilter = (id: any) => ({
    type: REMOVE_FILTER,
    payload: {
        id
    }
})

export const setHighlight = (highlight: HighlightTypes) => ({
    type: SET_HIGHLIGHT,
    payload: {
        highlight
    }
})

export const toggleFilter = (filter: FilterTypes, toggle: boolean) => ({
    type: TOGGLE_FILTER,
    payload: {
        filter,
        toggle
    }
})

export const setTemporalFilter = (value: any) => ({
    type: SET_TEMPORAL_FILTER,
    payload: {
        value
    }
})

export const setBounds = (bounds: any) => ({
    type: SET_BOUNDS,
    payload: {
        bounds
    }
})
