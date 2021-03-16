import {ConditionsTypes, FilterTypes} from 'src/redux/data/types'

export const applyFilters = (data: object[], filters: FilterTypes[]) => {
    return data.filter((dataItem: object) => {
        return filters.filter(itemFilter => {
            return applyFilter(dataItem, itemFilter)
        }).length === filters.length;
    }).length === data.length;
};

const applyFilter = (dataItem: object, filter: FilterTypes) => {
    return filter.conditions.filter(condition => {
        if(condition.type === ConditionsTypes.Equal){
            //@ts-ignore
            return String(dataItem[filter.attribute]) === String(condition.value);
        }else if(condition.type === ConditionsTypes.Different){
            //@ts-ignore
            return String(dataItem[filter.attribute]) !== String(condition.value);
        }else if(condition.type === ConditionsTypes.MoreThan){
            //@ts-ignore
            return dataItem[filter.attribute] > condition.value;
        }else if(condition.type === ConditionsTypes.MoreThanOrEqual){
            //@ts-ignore
            return dataItem[filter.attribute] >= condition?.value;
        }else if(condition.type === ConditionsTypes.LessThan){
            //@ts-ignore
            return dataItem[filter.attribute] < condition?.value;
        }else if(condition.type === ConditionsTypes.LessThanOrEqual){
            //@ts-ignore
            return dataItem[filter.attribute] <= condition?.value;
        }
        return false;
    }).length === filter.conditions.length;
};

export const setAttributes = (dataItem: object) => {
    const keys = Object.keys(dataItem);
    return keys.map((key, index) => {
        return {
            name: key,
        // @ts-ignore
            type: getAttributeType(dataItem[key])
        }
    });
}

export const getAttributeType = (attribute: any) => {
    let attributeType;
    //@ts-ignore
    switch (typeof attribute){
        case "boolean": {
            attributeType = "boolean";
            break;
        }
        case "number": {
            attributeType = "number";
            break;
        }
        case "string": {
            attributeType = "string";
            break;
        }
        default: {
            attributeType = "undefined";
        }
    }

    return attributeType;
}

// export const getAttributesTypes = (dataItem: object) => {
//     const keys = Object.keys(dataItem);
//     return keys.map(key => {
//         return {
//             //@ts-ignore
//             [key]: getAttributeType(typeof dataItem[key])
//         }
//     });
// }

// export const getAttributesValues = (data: object[], attribute: string) => {
//     //@ts-ignore
//     return data.map((item: object) => item[attribute])
// }
