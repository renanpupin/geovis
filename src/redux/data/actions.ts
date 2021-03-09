import { LOAD_DATA, REMOVE_DATA_ITEM, ADD_DATA_ITEM, ADD_VISUALIZATION, ADD_FILTER, REMOVE_FILTER } from "./actionTypes";

export const setData = (data: any) => ({
    type: LOAD_DATA,
    payload: {
        data
    }
});

export const removeDataItem = (marker: any) => ({
    type: REMOVE_DATA_ITEM,
    payload: {
        marker
    }
});

export const addDataItem = (marker: any) => ({
    type: ADD_DATA_ITEM,
    payload: {
        marker
    }
});

// export enum MapVisualizationTypes {
//     Heatmap = 'heatmap',
//     MapCluster = 'cluster'
// }
// export enum DataVisualizationTypes {
//     Chart = 'chart',
// }
// export type VisualizationTypes = MapVisualizationTypes & DataVisualizationTypes

export enum VisualizationTypes {
    Heatmap = 'Heatmap',
    MarkerCluster = 'MarkerCluster'
}

export const addVisualization = (type: VisualizationTypes) => ({
    type: ADD_VISUALIZATION,
    payload: {
        type
    }
});

export enum ConditionsTypes {
    Equal = 'Equal',
    Different = 'Different',
    MoreThan = 'MoreThan',
    LessThan = 'LessThan',
    MoreThanOrEqual = 'MoreThanOrEqual',
    LessThanOrEqual = 'LessThanOrEqual',
}

export type FilterConditionsTypes = {
    type: ConditionsTypes
    value: string | number | boolean | null | undefined
}

export type FilterTypes = {
    name: string
    attribute: string
    conditions: FilterConditionsTypes[]
}

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
