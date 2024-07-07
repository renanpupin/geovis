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
    SET_BOUNDS
} from './actionTypes'
import {applyFilters, getAttributesStats} from './filters'

import {ConditionsTypes, FilterTargetTypes, FilterTypes, StateProps} from './types'

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
    bounds: undefined
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case LOAD_DATA: {
            const {data} = action.payload

            const filters: FilterTypes[] = data.temporalAttribute
                ? [
                      {
                          id: 'temporal',
                          name: 'Filter temporal',
                          condition: ConditionsTypes.Equal,
                          attribute: {name: data.temporalAttribute, type: 'string'},
                          targetType: FilterTargetTypes.value,
                          targetValue: data.rows[0][data.temporalAttribute],
                          visible: true
                      }
                  ]
                : []

            return {
                ...state,
                rows: data.rows,
                attributes: data.attributes,
                latAttribute: data.latAttribute,
                lonAttribute: data.lonAttribute,
                temporalAttribute: data.temporalAttribute,
                attributesStats: getAttributesStats(data.rows, data.attributes),
                filters,
                visibleRows: applyFilters(data.rows, filters, data.attributes)
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
            console.log('updatedFilters', updatedFilters)

            return {
                ...state,
                filters: updatedFilters,
                attributesStats: getAttributesStats(state.rows, state.attributes), //TODO: o ideal seria calcular novamente após mudar os filtros baseado nos visibleRows
                visibleRows: applyFilters(state.rows, updatedFilters, state.attributes)
            }
        }
        case SET_BOUNDS: {
            const {bounds} = action.payload

            return {
                ...state,
                bounds
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
                    console.log('TOGGLE_VISUALIZATION', id, toggle)
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

            return {
                ...state,
                filters: updatedFilters,
                attributesStats: getAttributesStats(state.rows, state.attributes), //TODO: o ideal seria calcular novamente após mudar os filtros baseado nos visibleRows
                visibleRows: applyFilters(state.rows, updatedFilters, state.attributes)
            }
        }
        case REMOVE_FILTER: {
            const {id} = action.payload

            const updatedFilters = state.filters.filter(item => item.id !== id)

            return {
                ...state,
                filters: updatedFilters,
                attributesStats: getAttributesStats(state.rows, state.attributes), //TODO: o ideal seria calcular novamente após mudar os filtros baseado nos visibleRows
                visibleRows: applyFilters(state.rows, updatedFilters, state.attributes)
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

            return {
                ...state,
                filters: updatedFilters,
                attributesStats: getAttributesStats(state.rows, state.attributes), //TODO: o ideal seria calcular novamente após mudar os filtros baseado nos visibleRows
                visibleRows: applyFilters(state.rows, updatedFilters, state.attributes)
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
        default:
            return state
    }
}
