import React, {useEffect, useState} from 'react';

import styles from './Menu.module.scss';
import Logo from 'src/assets/img/logo.png';
import {useDispatch, useSelector} from "react-redux";
import {setData, removeDataItem, addDataItem, addVisualization} from "src/redux/data/actions";
import {VisualizationTypeValues} from "src/redux/data/types";
import {getVisibleData} from "src/redux/data/selectors";

const markers = [
    {id: 1, lat: 41.0082, lng: 28.9784, title: 'Istanbul'},
    {id: 2, lat: 40.0082, lng: 27.9784, title: 'Istanbul next'},
    {id: 3, lat: -23.7, lng: -46.5, title: 'São Paulo'},
    {id: 4, lat: -22.705, lng: -45.5, title: 'Rio'},
    {id: 5, lat: -22.71, lng: -45.52, title: 'Rio 2'},
    {id: 6, lat: -22.72, lng: -45.55, title: 'Rio 3'},
    {id: 7, lat: -22.73, lng: -45.56, title: 'Rio 4'},
    {id: 8, lat: -22.74, lng: -45.58, title: 'Rio 5'},
    {id: 9, lat: -22.75, lng: -45.59, title: 'Rio 6'},
    {id: 10, lat: -22.46, lng: -45.51, title: 'Rio 7'},
    {id: 11, lat: -22.36, lng: -45.515, title: 'Rio 8'},
    {id: 12, lat: -22.765, lng: -45.525, title: 'Rio 9'},
    {id: 13, lat: -22.66, lng: -45.535, title: 'Rio 10'},
    {id: 14, lat: -22.55, lng: -45.546, title: 'Rio 11'},
]

const add = {id: 5, lat: -21, lng: -44, title: 'Another'}

const Menu: React.FC = (props: any) => {
    const {onChangeMode} = props
    const dispatch = useDispatch()
    const visibleData = useSelector(getVisibleData)

    const loadMarkers = () => {
        dispatch(setData(markers))
    }

    const deleteMarker = () => {
        dispatch(removeDataItem(visibleData[0]))
    }

    const addMarkers = () => {
        dispatch(addDataItem(add))
    }

    const addHeatmap = () => {
        dispatch(addVisualization(VisualizationTypeValues.Heatmap))
    }

    const addMarkerCluster = () => {
        dispatch(addVisualization(VisualizationTypeValues.MarkerCluster))
    }

    return (
        <nav id="nav" className={styles.nav}>
            <div className={styles.navbarHeader}>
                <div className={styles.brand}>
                    <img alt={"Logo"} className={styles.navbarLogo} src={Logo}/>
                    <span className={styles.navbarTitle}>GeoVIS</span>
                </div>
            </div>

            <ul role="menu" className={styles.menuList}>
                <li className="submenu">
                    <button onClick={onChangeMode}>
                        <i className="material-icons">{props.viewMode === 'map' ? 'map' : 'table_view'}</i>{props.viewMode === 'map' ? 'Ver tabela' : 'Ver mapa'}
                    </button>
                    <button onClick={loadMarkers}>
                        <i className="material-icons">assignment</i>Carregar dados
                    </button>
                    <button onClick={addMarkers}>
                        <i className="material-icons">assignment</i>Adicionar dado
                    </button>
                    <button onClick={deleteMarker}>
                        <i className="material-icons">assignment</i>Remover dado
                    </button>
                    <button onClick={addHeatmap}>
                        <i className="material-icons">assignment</i>Heatmap
                    </button>
                    <button onClick={addMarkerCluster}>
                        <i className="material-icons">assignment</i>Adicionar marker cluster
                    </button>
                    {/*<button onClick={loadMarkers}>*/}
                    {/*    <i className="material-icons">assignment</i>Dados*/}
                    {/*</button>*/}
                    {/*<ul>*/}
                    {/*    <li>*/}
                    {/*        <a href="javascript:void(0)" id="carregarDados">*/}
                    {/*            <i className="material-icons">attach_file</i>Carregar*/}
                    {/*        </a>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </li>
                {/*<li className="submenu">*/}
                {/*    <a href="javascript:void(0)">*/}
                {/*        <i className="material-icons">insert_chart</i>Visualizações*/}
                {/*    </a>*/}
                {/*    /!*<ul>*!/*/}
                {/*    /!*    <li>*!/*/}
                {/*    /!*        <a href="javascript:void(0)" id="adicionarVisualizacao">*!/*/}
                {/*    /!*            <i className="material-icons">add</i>Adicionar*!/*/}
                {/*    /!*        </a>*!/*/}
                {/*    /!*    </li>*!/*/}
                {/*    /!*    <li>*!/*/}
                {/*    /!*        <a href="javascript:void(0)" id="removerVisualizacao">*!/*/}
                {/*    /!*            <i className="material-icons">delete</i>Remover*!/*/}
                {/*    /!*        </a>*!/*/}
                {/*    /!*    </li>*!/*/}
                {/*    /!*</ul>*!/*/}
                {/*</li>*/}
                {/*<li className="submenu">*/}
                {/*    <a href="javascript:void(0)">*/}
                {/*        <i className="material-icons">details</i>Filtros*/}
                {/*    </a>*/}
                {/*    /!*<ul>*!/*/}
                {/*    /!*    <li>*!/*/}
                {/*    /!*        <a href="javascript:void(0)" id="adicionarFiltro">*!/*/}
                {/*    /!*            <i className="material-icons">add</i>Adicionar*!/*/}
                {/*    /!*        </a>*!/*/}
                {/*    /!*    </li>*!/*/}
                {/*    /!*    <li>*!/*/}
                {/*    /!*        <a href="javascript:void(0)" id="removerFiltro">*!/*/}
                {/*    /!*            <i className="material-icons">delete</i>Remover*!/*/}
                {/*    /!*        </a>*!/*/}
                {/*    /!*    </li>*!/*/}
                {/*    /!*</ul>*!/*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <a href="javascript:void(0)" id="salvarApp">*/}
                {/*        <i className="material-icons">file_download</i>Salvar*/}
                {/*    </a>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <a href="javascript:void(0)" id="carregarApp">*/}
                {/*        <i className="material-icons">file_upload</i>Carregar*/}
                {/*    </a>*/}
                {/*</li>*/}
            </ul>
        </nav>
    )
}

export default Menu
