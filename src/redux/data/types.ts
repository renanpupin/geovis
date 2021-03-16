
export type StateProps = {
    attributes: AttributeTypes[]
    data: object[]
    visibleData: object[]
    filters: FilterTypes[]
    visualizations: VisualizationTypes[]
}

export type AttributeTypes = {
    type: VisualizationTypeValues
    visible?: boolean
}

export enum VisualizationTypeValues {
    Heatmap = 'Heatmap',
    MarkerCluster = 'MarkerCluster',
    Chart = 'Chart'
}

export type VisualizationTypes = {
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

export type FilterConditionsTypes = {
    type: ConditionsTypes
    value: string | number | boolean// | null | undefined
}

export type FilterTypes = {
    name: string
    attribute: string
    conditions: FilterConditionsTypes[]
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
