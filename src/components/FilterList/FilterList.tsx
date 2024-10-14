import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getFilters, getVisibleRows, getData, getOverlays} from 'src/redux/data/selectors'
import Touchable from 'src/components/Touchable/Touchable'
import styles from './FilterList.module.scss'
import {toggleFilter, toggleOverlay} from 'src/redux/data/actions'
import {capitalize} from '../../utils/string'

const FilterList: React.FC = () => {
    const dispatch = useDispatch()
    const filters = useSelector(getFilters)
    const data = useSelector(getData)
    const visibleData = useSelector(getVisibleRows)
    const overlays = useSelector(getOverlays)

    const toggleFilterVisible = (filter: any) => {
        dispatch(toggleFilter(filter, !filter.visible))
    }

    const toggleOverlayVisible = (overlay: any) => {
        dispatch(toggleOverlay(overlay, !overlay.visible))
    }

    const getFiltersList = useCallback(() => {
        return filters
            .filter(filter => filter.id !== 'temporal')
            .map((filter, index) => {
                return (
                    <li key={index}>
                        <Touchable onClick={() => toggleFilterVisible(filter)}>
                            <div className={styles.inputView}>
                                <input
                                    type={'checkbox'}
                                    checked={filter.visible}
                                    style={{marginRight: 5}}
                                    onChange={() => {}}
                                />
                                <span>{filter.name}</span>
                            </div>
                        </Touchable>
                    </li>
                )
            })
    }, [filters])

    const getOverlaysList = useCallback(() => {
        return overlays.map((overlay: any, index: number) => {
            return (
                <li key={index}>
                    <Touchable onClick={() => toggleOverlayVisible(overlay)}>
                        <div className={styles.inputView}>
                            <input
                                type={'checkbox'}
                                checked={overlay.visible}
                                style={{marginRight: 5}}
                                onChange={() => {}}
                            />
                            <span>
                                {capitalize(overlay.type)} {overlay.id}
                            </span>
                        </div>
                    </Touchable>
                </li>
            )
        })
    }, [overlays])

    const hasFilters = getFiltersList().length > 0 || getOverlaysList().length > 0

    return (
        <div className={styles.filterWrapper}>
            <p style={{fontSize: 12, marginBottom: 10}}>
                <b>
                    {visibleData.length}/{data.length}
                </b>{' '}
                features visible
            </p>
            <ul>
                {!hasFilters ? <li>No filters.</li> : null}
                {getFiltersList()}
                {getOverlaysList()}
            </ul>
        </div>
    )
}

export default FilterList
