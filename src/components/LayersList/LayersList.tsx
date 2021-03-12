import React, {useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {useSelector} from 'react-redux';
import {getVisualizations} from "src/redux/data/selectors";
import Touchable from "src/components/Touchable/Touchable";
import styles from './LayersList.module.scss';

const layersListRoot = document.getElementById('map-controls')

const LayersList: React.FC = () => {
    const visualizations = useSelector(getVisualizations)

    const getLayersList = useCallback(() => {
        return visualizations.map((visualizations, index) => {
            return(
                <li key={index}>
                    <Touchable onClick={() => {}}>
                        <input type={"checkbox"} checked={visualizations.visible}/><span>{visualizations.type}</span>
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
