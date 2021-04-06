import {ConditionsTypes, FilterTypes, AttributeTypes} from 'src/redux/data/types'
import {useSelector} from "react-redux";
import {getDataState} from "src/redux/data/selectors";

export const applyFilters = (data: object[], filters: FilterTypes[], attributes: AttributeTypes[]) => {
    // console.log("applyFilters", filters)

    return data.filter((dataItem: object) => {
        return filters.filter(itemFilter => {
            const attributeIndex = attributes.findIndex((attribute: AttributeTypes) => attribute.name === itemFilter.attribute.name)
            // //@ts-ignore
            // console.log("applyFilter", applyFilter(dataItem, itemFilter, attributeIndex))

            return applyFilter(dataItem, itemFilter, attributeIndex)
        }).length === filters.length;
    })//.length === data.length;
};

const applyFilter = (dataItem: object, filter: FilterTypes, attributeIndex: number) => {
    const {condition, targetValue}: any = filter;

    if(!filter.visible){
        return true;
    }

    // return filter.conditions.filter(condition => {
        if(condition === ConditionsTypes.Equal){
            //@ts-ignore
            return String(dataItem[attributeIndex]) === String(targetValue);
        }else if(condition === ConditionsTypes.Different){
            //@ts-ignore
            return String(dataItem[attributeIndex]) !== String(targetValue);
        }else if(condition === ConditionsTypes.MoreThan){
            //@ts-ignore
            return dataItem[attributeIndex] > targetValue;
        }else if(condition === ConditionsTypes.MoreThanOrEqual){
            //@ts-ignore
            return dataItem[attributeIndex] >= targetValue;
        }else if(condition === ConditionsTypes.LessThan){
            //@ts-ignore
            return dataItem[attributeIndex] < targetValue;
        }else if(condition === ConditionsTypes.LessThanOrEqual){
            //@ts-ignore
            return dataItem[attributeIndex] <= targetValue;
        }
        return false;
    // }).length === filter.conditions.length;
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

export const countAttributeOcurrences = (data: object[], attributeIndex: number) => {
    let result = {};

    for(let item of data){
        // @ts-ignore
        if(result[item[attributeIndex]]){
        // @ts-ignore
            result[item[attributeIndex]]++;
        }else{
        // @ts-ignore
            result[item[attributeIndex]] = 1;
        }
    }

    return [Object.keys(result), Object.values(result)];
}
