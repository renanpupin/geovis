import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFilters} from "src/redux/data/selectors";
import Touchable from "src/components/Touchable/Touchable";
import styles from './FilterList.module.scss';
import {toggleFilter} from "src/redux/data/actions";

const FilterList: React.FC = () => {
    const dispatch = useDispatch()
    const filters = useSelector(getFilters)

    const toggleFilterVisible = (filter: any) => {
        dispatch(toggleFilter(filter, !filter.visible))
    }

    const getFiltersList = useCallback(() => {
        return filters.map((filter, index) => {
            return(
                <li key={index}>
                    <Touchable onClick={() => toggleFilterVisible(filter)}>
                        <div className={styles.inputView}>
                        <input
                            type={"checkbox"}
                            checked={filter.visible}
                            style={{marginRight: 5}}
                        />
                        <span>{filter.name}</span>
                        </div>
                    </Touchable>
                </li>
            )
        })
    }, [filters])

    return(
        <div className={styles.filterWrapper}>
            <ul>
                {filters.length === 0 && <li>No filters.</li>}
                {getFiltersList()}
            </ul>
        </div>
    )
}

export default FilterList
