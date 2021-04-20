import {RootState} from "../store";
import {FilterTypes, VisualizationTypes, AttributeTypes} from "src/redux/data/types";

export const getDataState = (store: RootState): any => store.data;

export const getData = (store: RootState): object[] => getDataState(store)?.rows

export const getVisibleRows = (store: RootState): object[] => getDataState(store)?.visibleRows

export const getLatAttribute = (store: RootState): object[] => getDataState(store)?.latAttribute

export const getLatAttributeIndex = (store: RootState): number => getDataState(store)?.attributes?.findIndex((attribute: AttributeTypes) => attribute.name === getDataState(store)?.latAttribute)

export const getLonAttribute = (store: RootState): object[] => getDataState(store)?.lonAttribute

export const getLonAttributeIndex = (store: RootState): number => getDataState(store)?.attributes?.findIndex((attribute: AttributeTypes) => attribute.name === getDataState(store)?.lonAttribute)

export const getVisualizations = (store: RootState): VisualizationTypes[] => getDataState(store)?.visualizations

export const getFilters = (store: RootState): FilterTypes[] => getDataState(store)?.filters

export const getAttributes = (store: RootState): AttributeTypes[] => getDataState(store)?.attributes

export const getNumericAttributes = (store: RootState): AttributeTypes[] => getAttributes(store).filter((attribute: AttributeTypes) => attribute.type === "number")

export const getAttributesStats = (store: RootState): AttributeTypes[] => getDataState(store)?.attributesStats
