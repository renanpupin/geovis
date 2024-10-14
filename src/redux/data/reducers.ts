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
    SET_TEMPORAL_FILTER,
    SET_BOUNDS,
    ADD_OVERLAY,
    REMOVE_OVERLAY,
    TOGGLE_OVERLAY
} from './actionTypes'
import {applyFilters, getAttributesStats} from './filters'

import {AttributeTypes, ConditionsTypes, FilterTargetTypes, FilterTypes, StateProps} from './types'
import {applyOverlays} from './overlays'

const initialState: StateProps = {
    attributes: [],
    attributesStats: [],
    rows: [],
    visibleRows: [],
    latAttribute: undefined,
    lonAttribute: undefined,
    temporalAttribute: undefined,
    filters: [],
    visualizations: [],
    highlight: [],
    bounds: undefined,
    overlays: []
}

export const keyIdAttributeName = '_key_id'

export default function (state = initialState, action: any) {
    switch (action.type) {
        case LOAD_DATA: {
            const {data} = action.payload

            const normalizedAttributes = [
                ...data.attributes,
                {name: keyIdAttributeName, type: 'number'}
            ]
            const normalizedRows = data.rows.map((row: any, index: number) => {
                return [...row, index]
            })

            const filters: FilterTypes[] = data.temporalAttribute
                ? [
                      {
                          id: 'temporal',
                          name: 'Filter temporal',
                          condition: ConditionsTypes.Equal,
                          attribute: {name: data.temporalAttribute, type: 'string'},
                          targetType: FilterTargetTypes.value,
                          targetValue: normalizedRows[0][data.temporalAttribute],
                          visible: true
                      }
                  ]
                : []

            const latAttributeIndex: number = normalizedAttributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === data?.latAttribute
            )
            const lonAttributeIndex: number = normalizedAttributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === data?.lonAttribute
            )

            return {
                ...state,
                rows: normalizedRows,
                attributes: normalizedAttributes,
                overlays: data.overlays ?? [],
                latAttribute: data.latAttribute,
                lonAttribute: data.lonAttribute,
                temporalAttribute: data.temporalAttribute,
                attributesStats: getAttributesStats(normalizedRows, normalizedAttributes),
                filters,
                visibleRows: applyOverlays(
                    applyFilters(normalizedRows, filters, normalizedAttributes),
                    data.overlays ?? [],
                    latAttributeIndex,
                    lonAttributeIndex
                )
            }
        }
        case SET_TEMPORAL_FILTER: {
            const {value} = action.payload

            const updatedFilters = state.filters.map(item => {
                if (item.id === 'temporal') {
                    return {
                        ...item,
                        targetValue: value
                    }
                } else {
                    return item
                }
            })
            // console.log('updatedFilters', updatedFilters)

            const latAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.latAttribute
            )
            const lonAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.lonAttribute
            )

            return {
                ...state,
                filters: updatedFilters,
                attributesStats: getAttributesStats(state.rows, state.attributes), //TODO: o ideal seria calcular novamente após mudar os filtros baseado nos visibleRows
                visibleRows: applyOverlays(
                    applyFilters(state.rows, updatedFilters, state.attributes),
                    state.overlays,
                    latAttributeIndex,
                    lonAttributeIndex
                )
            }
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
            const {visualization} = action.payload

            const id: string = String(`vis-${state.visualizations.length + 1}`)

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
            }
        }
        case REMOVE_VISUALIZATION: {
            const {id} = action.payload

            return {
                ...state,
                visualizations: state.visualizations.filter(item => item.id !== id)
            }
        }
        case TOGGLE_VISUALIZATION: {
            const {id, toggle} = action.payload

            return {
                ...state,
                visualizations: state.visualizations.map(item => {
                    // console.log('TOGGLE_VISUALIZATION', id, toggle)
                    if (item.id === id) {
                        return {
                            ...item,
                            visible: toggle
                        }
                    } else {
                        return item
                    }
                })
            }
        }
        case ADD_FILTER: {
            const {filter} = action.payload

            const id: string = String(
                state.filters.filter((item: any) => item.type === filter.type).length + 1
            )

            const updatedFilters: any = [
                ...state.filters,
                {
                    id,
                    ...filter,
                    visible: true
                }
            ]

            const latAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.latAttribute
            )
            const lonAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.lonAttribute
            )

            return {
                ...state,
                filters: updatedFilters,
                attributesStats: getAttributesStats(state.rows, state.attributes), //TODO: o ideal seria calcular novamente após mudar os filtros baseado nos visibleRows
                visibleRows: applyOverlays(
                    applyFilters(state.rows, updatedFilters, state.attributes),
                    state.overlays,
                    latAttributeIndex,
                    lonAttributeIndex
                )
            }
        }
        case REMOVE_FILTER: {
            const {id} = action.payload

            const updatedFilters = state.filters.filter(item => item.id !== id)

            const latAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.latAttribute
            )
            const lonAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.lonAttribute
            )

            return {
                ...state,
                filters: updatedFilters,
                attributesStats: getAttributesStats(state.rows, state.attributes), //TODO: o ideal seria calcular novamente após mudar os filtros baseado nos visibleRows
                visibleRows: applyOverlays(
                    applyFilters(state.rows, updatedFilters, state.attributes),
                    state.overlays,
                    latAttributeIndex,
                    lonAttributeIndex
                )
            }
        }
        case TOGGLE_FILTER: {
            const {filter, toggle} = action.payload

            const updatedFilters = state.filters.map(item => {
                if (item === filter) {
                    return {
                        ...item,
                        visible: toggle
                    }
                } else {
                    return item
                }
            })

            const latAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.latAttribute
            )
            const lonAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.lonAttribute
            )

            return {
                ...state,
                filters: updatedFilters,
                attributesStats: getAttributesStats(state.rows, state.attributes), //TODO: o ideal seria calcular novamente após mudar os filtros baseado nos visibleRows
                visibleRows: applyOverlays(
                    applyFilters(state.rows, updatedFilters, state.attributes),
                    state.overlays,
                    latAttributeIndex,
                    lonAttributeIndex
                )
            }
        }
        case SET_HIGHLIGHT: {
            const {highlight} = action.payload

            //TODO: filtrar marcadores aqui quando fizer highlight
            //alterar highlight

            // const highlightFilter = {
            //     id: 'highlight',
            //     name: "Filter highlight",
            //     condition: ConditionsTypes.Equal,
            //     attribute: 'index',
            //     targetType: FilterTargetTypes.value,
            //     targetValue: [],    //list
            //     visible: true
            // }

            return {
                ...state,
                highlight: highlight
            }
        }
        case SET_BOUNDS: {
            const {bounds} = action.payload

            return {
                ...state,
                bounds
            }
        }
        case ADD_OVERLAY: {
            const {overlay} = action.payload

            const id: string = String(
                state.overlays.filter((item: any) => item.type === overlay.type).length + 1
            )

            const latAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.latAttribute
            )
            const lonAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.lonAttribute
            )

            const updatedOverlays = [
                ...state.overlays,
                {
                    id,
                    ...overlay,
                    visible: true
                }
            ]

            return {
                ...state,
                overlays: updatedOverlays,
                visibleRows: applyOverlays(
                    applyFilters(state.rows, state.filters, state.attributes),
                    updatedOverlays,
                    latAttributeIndex,
                    lonAttributeIndex
                )
            }
        }
        case REMOVE_OVERLAY: {
            const {mapRefId} = action.payload

            const latAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.latAttribute
            )
            const lonAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.lonAttribute
            )

            const updatedOverlays = state.overlays.filter((item: any) => item.mapRefId !== mapRefId)

            return {
                ...state,
                overlays: updatedOverlays,
                visibleRows: applyOverlays(
                    applyFilters(state.rows, state.filters, state.attributes),
                    updatedOverlays,
                    latAttributeIndex,
                    lonAttributeIndex
                )
            }
        }
        case TOGGLE_OVERLAY: {
            const {id, toggle} = action.payload

            const updatedOverlays = state.overlays.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        visible: toggle
                    }
                } else {
                    return item
                }
            })

            const latAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.latAttribute
            )
            const lonAttributeIndex: number = state?.attributes?.findIndex(
                (attribute: AttributeTypes) => attribute.name === state?.lonAttribute
            )

            return {
                ...state,
                overlays: updatedOverlays,
                visibleRows: applyOverlays(
                    applyFilters(state.rows, state.filters, state.attributes),
                    updatedOverlays,
                    latAttributeIndex,
                    lonAttributeIndex
                )
            }
        }
        default:
            return state
    }
}
