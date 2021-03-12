import React, {useCallback} from 'react';
import ReactDOM from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getVisualizations} from "src/redux/data/selectors";
import Touchable from "src/components/Touchable/Touchable";
import styles from './LayersList.module.scss';
import {toggleVisualization} from "src/redux/data/actions";

const layersListRoot = document.getElementById('map-controls')

const LayersList: React.FC = () => {
    const dispatch = useDispatch()
    const visualizations = useSelector(getVisualizations)

    const toggleLayer = (visualization: any) => {
        dispatch(toggleVisualization(visualization, !visualization.visible))
    }

    const getLayersList = useCallback(() => {
        return visualizations.map((visualization, index) => {
            return(
                <li key={index}>
                    <Touchable onClick={() => {}}>
                        <input type={"checkbox"} checked={visualization.visible} onChange={(event: any) => {toggleLayer(visualization)}}/><span>{visualization.type}</span>
                    </Touchable>
                </li>
            )
        })
    }, [visualizations])

    const element = (
        <div className={styles.visualizationWrapper}>
            <ul>
                {getLayersList()}
            </ul>
        </div>
    )
    return ReactDOM.createPortal(
        element,
        // @ts-ignore
        layersListRoot
    );
}

export default LayersList
