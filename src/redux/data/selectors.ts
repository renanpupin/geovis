import {RootState} from '../store'
import {
    FilterTypes,
    VisualizationTypes,
    AttributeTypes,
    HighlightTypes,
    AttributeStatsType
} from 'src/redux/data/types'

export const getDataState = (store: RootState): any => store.data

export const getData = (store: RootState): object[] => getDataState(store)?.rows

export const getVisibleRows = (store: RootState): object[] => getDataState(store)?.visibleRows

export const getLatAttribute = (store: RootState): object[] => getDataState(store)?.latAttribute

export const getLatAttributeIndex = (store: RootState): number =>
    getDataState(store)?.attributes?.findIndex(
        (attribute: AttributeTypes) => attribute.name === getDataState(store)?.latAttribute
    )

export const getLonAttribute = (store: RootState): object[] => getDataState(store)?.lonAttribute

export const getLonAttributeIndex = (store: RootState): number =>
    getDataState(store)?.attributes?.findIndex(
        (attribute: AttributeTypes) => attribute.name === getDataState(store)?.lonAttribute
    )

export const getTemporalAttribute = (store: RootState): object[] =>
    getDataState(store)?.temporalAttribute

export const getTemporalAttributeIndex = (store: RootState): number =>
    getDataState(store)?.attributes?.findIndex(
        (attribute: AttributeTypes) => attribute.name === getDataState(store)?.temporalAttribute
    )

export const getVisualizations = (store: RootState): VisualizationTypes[] =>
    getDataState(store)?.visualizations

export const getFilters = (store: RootState): FilterTypes[] => getDataState(store)?.filters

export const getAttributes = (store: RootState): AttributeTypes[] => getDataState(store)?.attributes

export const getNumericAttributes = (store: RootState): AttributeTypes[] =>
    getAttributes(store).filter((attribute: AttributeTypes) => attribute.type === 'number')

export const getNumericNonSpatialAttributes = (store: RootState): AttributeTypes[] =>
    getNumericAttributes(store).filter(
        (attribute: AttributeTypes, index: number) =>
            index !== getLatAttributeIndex(store) && index !== getLonAttributeIndex(store)
    )

export const getNonSpatialAttributes = (store: RootState): AttributeTypes[] => {
    return getAttributes(store).filter(
        (_: AttributeTypes, index: number) =>
            index !== getLatAttributeIndex(store) && index !== getLonAttributeIndex(store)
    )
}

export const getNonSpatialAttributesStats = (store: RootState): AttributeStatsType[] => {
    return getAttributesStats(store).filter(
        (_: AttributeStatsType, index: number) =>
            index !== getLatAttributeIndex(store) && index !== getLonAttributeIndex(store)
    )
}

export const getAttributesStats = (store: RootState): AttributeStatsType[] =>
    getDataState(store)?.attributesStats

export const getHighlight = (store: RootState): HighlightTypes[] => getDataState(store)?.highlight

export const getBounds = (store: RootState): any => getDataState(store)?.bounds
