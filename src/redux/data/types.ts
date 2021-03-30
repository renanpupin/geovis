
export type StateProps = {
    attributes: AttributeTypes[]
    rows: object[]
    visibleRows: object[]
    latAttribute?: string
    lonAttribute?: string
    filters: FilterTypes[]
    visualizations: VisualizationTypes[]
}

export type AttributeTypes = {
    name: string
    type: any
    visible?: boolean
}

export enum VisualizationTypeValues {
    Heatmap = 'Heatmap',
    MarkerCluster = 'MarkerCluster',
    Chart = 'Chart'
    // {label: 'Heatmap', value: 'heatmap'},
    // {label: 'Cluster', value: 'cluster'},
    // {label: 'Chart', value: 'chart'},
    // {label: 'Marker chart', value: 'markerChart'},
    // {label: 'Convex Hull', value: 'convexHull'},
    // {label: 'Line', value: 'line'},
    // {label: 'Euclidian', value: 'euclidian'},
}

export type VisualizationTypes = {
    id: string
    type: VisualizationTypeValues
    visible?: boolean
}

export enum ConditionsTypes {
    Equal = 'Equal',
    Different = 'Different',
    MoreThan = 'MoreThan',
    LessThan = 'LessThan',
    MoreThanOrEqual = 'MoreThanOrEqual',
    LessThanOrEqual = 'LessThanOrEqual',
}

// export type FilterConditionsTypes = {
//     type: ConditionsTypes
//     value: string | number | boolean | null | undefined
// }

export type FilterAttributeTypes = {
    name: string
    type: 'number' | 'string' | 'boolean'
}

export enum FilterTargetTypes {
    value = 'value',
    averageValue = 'averageValue',
    medianValue = 'medianValue',
}

export type FilterTypes = {
    id: string
    name: string
    attribute: FilterAttributeTypes
    condition: ConditionsTypes
    targetType: FilterTargetTypes
    targetValue: string | number | boolean | null | undefined
    visible: boolean
}


// export enum MapVisualizationTypes {
//     Heatmap = 'heatmap',
//     MapCluster = 'cluster'
// }
// export enum DataVisualizationTypes {
//     Chart = 'chart',
// }
// export type VisualizationTypes = MapVisualizationTypes & DataVisualizationTypes
