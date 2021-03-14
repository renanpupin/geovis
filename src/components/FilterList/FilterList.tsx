import React, {useCallback} from 'react';
import ReactDOM from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getFilters} from "src/redux/data/selectors";
import Touchable from "src/components/Touchable/Touchable";
import styles from './FilterList.module.scss';
import {toggleFilter} from "src/redux/data/actions";

const filterListRoot = document.getElementById('map-controls')

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
                    <Touchable onClick={() => {}}>
                        <input type={"checkbox"} checked={filter.visible} onChange={toggleFilterVisible}/><span>{filter.name}</span>
                    </Touchable>
                </li>
            )
        })
    }, [filters])

    const element = (
        <div className={styles.filterWrapper}>
            <ul>
                {getFiltersList()}
            </ul>
        </div>
    )
    return ReactDOM.createPortal(
        element,
        // @ts-ignore
        filterListRoot
    );
}

export default FilterList
