import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getFilters} from "src/redux/data/selectors";
import Touchable from "src/components/Touchable/Touchable";

const FilterList: React.FC = () => {
    const filters = useSelector(getFilters)
    // console.log("redux filters", filters)

    const getFiltersList = useCallback(() => {
        return filters.map((filter, index) => {
            return(
                <li key={index}>
                    <Touchable onClick={() => {}}>
                        <input type={"checkbox"} checked={filter.visible}/><span>{filter.name}</span>
                    </Touchable>
                </li>
            )
        })
    }, [filters])

    return (
        <div>
            <ul>
                {getFiltersList()}
            </ul>
        </div>
    )
}

export default FilterList
