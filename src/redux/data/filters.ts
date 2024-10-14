import {ConditionsTypes, FilterTypes, AttributeTypes, AttributeStatsType} from 'src/redux/data/types'

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
    const {condition, targetValue, targetType}: any = filter;
    // console.log('filter', filter)

    if (!filter.visible) {
        return true;
    }

    // return filter.conditions.filter(condition => {
    if (condition === ConditionsTypes.Equal) {
        //@ts-ignore
        return String(dataItem[attributeIndex]) === String(targetValue);
    } else if (condition === ConditionsTypes.Different) {
        //@ts-ignore
        return String(dataItem[attributeIndex]) !== String(targetValue);
    } else if (condition === ConditionsTypes.MoreThan) {
        //@ts-ignore
        return dataItem[attributeIndex] > targetValue;
    } else if (condition === ConditionsTypes.MoreThanOrEqual) {
        //@ts-ignore
        return dataItem[attributeIndex] >= targetValue;
    } else if (condition === ConditionsTypes.LessThan) {
        //@ts-ignore
        return dataItem[attributeIndex] < targetValue;
    } else if (condition === ConditionsTypes.LessThanOrEqual) {
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
    switch (typeof attribute) {
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

    for (let item of data) {
        // @ts-ignore
        if (result[item[attributeIndex]]) {
            // @ts-ignore
            result[item[attributeIndex]]++;
        } else {
            // @ts-ignore
            result[item[attributeIndex]] = 1;
        }
    }

    return [Object.keys(result), Object.values(result)];
}

export const calculateAverageAttributeValue = (data: object[], attributeIndex: number) => {
    if (data.length === 0) {
        return 0;
    }

    let sum: number = 0;
    for (let item of data) {
        // @ts-ignore
        sum += item[attributeIndex]
    }

    return sum / data.length
}

export const calculateMinAttributeValue = (data: object[], attributeIndex: number) => {
    let min;
    for (let item of data) {
        // @ts-ignore
        if (!min || item[attributeIndex] < min) {
            // @ts-ignore
            min = item[attributeIndex];
        }
    }

    return min;
}

export const calculateMaxAttributeValue = (data: object[], attributeIndex: number) => {
    let max;
    for (let item of data) {
        // @ts-ignore
        if (!max || item[attributeIndex] > max) {
            // @ts-ignore
            max = item[attributeIndex];
        }
    }

    return max;
}

export const getAttributesStats = (data: object[], attributes: any): AttributeStatsType[] => {
    let stats: AttributeStatsType[] = [];
    attributes.forEach((attribute: any, index: number) => {
        if(attribute.type === "number"){
            return stats.push({
                attribute: attribute.name,
                min: calculateMinAttributeValue(data, index),
                max: calculateMaxAttributeValue(data, index),
                avg: calculateAverageAttributeValue(data, index),
            });
        }
    })

    return stats;
}
