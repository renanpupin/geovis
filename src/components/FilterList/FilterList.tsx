import React, {useCallback} from 'react';
import ReactDOM from 'react-dom';
import {useSelector} from 'react-redux';
import {getFilters} from "src/redux/data/selectors";
import Touchable from "src/components/Touchable/Touchable";
import styles from './FilterList.module.scss';

const filterListRoot = document.getElementById('map-controls')

const FilterList: React.FC = () => {
    const filters = useSelector(getFilters)

    const toggleFilter = (e: any) => {
        console.log(e)
    }

    const getFiltersList = useCallback(() => {
        return filters.map((filter, index) => {
            return(
                <li key={index}>
                    <Touchable onClick={() => {}}>
                        <input type={"checkbox"} checked={filter.visible} onChange={toggleFilter}/><span>{filter.name}</span>
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
