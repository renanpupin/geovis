import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getVisualizations} from 'src/redux/data/selectors'
import Touchable from 'src/components/Touchable/Touchable'
import styles from './LayersList.module.scss'
import {setHighlight, toggleVisualization} from 'src/redux/data/actions'
import {VisualizationTypes, VisualizationTypeValues} from '../../redux/data/types'

const LayersList: React.FC = () => {
    const dispatch = useDispatch()
    const visualizations = useSelector(getVisualizations)

    const toggleLayer = (visualization: VisualizationTypes) => {
        //force reset highlight when hiding some types of vis
        if (
            [VisualizationTypeValues.Chart, VisualizationTypeValues.ParallelCoordinates].includes(
                visualization?.type
            )
        ) {
            dispatch(setHighlight([]))
        }
        dispatch(toggleVisualization(visualization.id, !visualization.visible))
    }

    const getLayersList = useCallback(() => {
        return visualizations.map((visualization, index) => {
            return (
                <li key={index}>
                    <Touchable onClick={() => toggleLayer(visualization)}>
                        <div className={styles.inputView}>
                            <input
                                type={'checkbox'}
                                checked={visualization.visible}
                                style={{marginRight: 5}}
                                onChange={() => {}}
                            />
                            <span>
                                {visualization.type} - #{visualization.id}
                            </span>
                        </div>
                    </Touchable>
                </li>
            )
        })
    }, [visualizations])

    return (
        <div className={styles.visualizationWrapper}>
            <ul>
                {visualizations.length === 0 && <li>No layers.</li>}
                {getLayersList()}
            </ul>
        </div>
    )
}

export default LayersList
