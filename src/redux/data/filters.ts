import {ConditionsTypes, FilterTypes} from "src/redux/data/actions";

export const applyFilters = (data: any, filters: FilterTypes[]) => {
    return data.filter((dataItem: any) => {
        return filters.filter(itemFilter => {
            return applyFilter(dataItem, itemFilter)
        }).length === filters.length;
    }).length === data.length;
};

const applyFilter = (dataItem: any, filter: FilterTypes) => {
    return filter.conditions.filter(condition => {
        if(condition.type === ConditionsTypes.Equal){
            return String(dataItem[filter.attribute]) === String(condition.value);
        }else if(condition.type === ConditionsTypes.Different){
            return String(dataItem[filter.attribute]) !== String(condition.value);
        }else if(condition.type === ConditionsTypes.MoreThan){
            return dataItem[filter.attribute] > condition.value;
        }else if(condition.type === ConditionsTypes.MoreThanOrEqual){
            return dataItem[filter.attribute] >= condition.value;
        }else if(condition.type === ConditionsTypes.LessThan){
            return dataItem[filter.attribute] < condition.value;
        }else if(condition.type === ConditionsTypes.LessThanOrEqual){
            return dataItem[filter.attribute] <= condition.value;
        }
        return false;
    }).length === filter.conditions.length;
};

export const filterAttributes = (dataItem: any) => {
    return Object.keys(dataItem);
}

export const getAttributesTypes = (dataItem: any) => {
    const keys = Object.keys(dataItem);
    return keys.map(key => {

        let attributeType;
        switch (typeof  dataItem[key]){
            case "boolean":{
                attributeType = "boolean";
                break;
            }
            case "number":{
                attributeType = "number";
                break;
            }
            case "string":{
                attributeType = "string";
                break;
            }
            default:{
                attributeType = "string";
            }
        }

        return {
            [key]: attributeType
        }
    })
}

export const getAttributeValues = (data: any, attribute: string) => {
    return data.map(item => item[attribute])
}
