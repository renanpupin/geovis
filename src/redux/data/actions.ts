import { LOAD_DATA, REMOVE_DATA_ITEM, ADD_DATA_ITEM, ADD_VISUALIZATION } from "./actionTypes";

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
