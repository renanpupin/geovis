import React, {useEffect, useState} from 'react';

import styles from './Menu.module.scss';
import Logo from 'src/assets/img/logo.png';
import {useDispatch} from "react-redux";
import {setMarkers, removeMarker, addMarker} from "src/redux/map/actions";

const markers = [
    {id: 1, lat: 41.0082, lng: 28.9784, title: 'Istanbul'},
    {id: 2, lat: 40.0082, lng: 27.9784, title: 'Istanbul next'},
    {id: 3, lat: -23.7, lng: -46.5, title: 'São Paulo'},
    {id: 4, lat: -22.7, lng: -45.5, title: 'Rio'},
]

const add = {id: 5, lat: -21, lng: -44, title: 'Another'}

const Menu: React.FC = () => {
    const dispatch = useDispatch()

    const loadMarkers = () => {
        dispatch(setMarkers(markers))
    }

    const deleteMarker = () => {
        dispatch(removeMarker(markers[0]))
        dispatch(removeMarker(add))
    }

    const addMarkers = () => {
        dispatch(addMarker(add))
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
                    <button onClick={loadMarkers}>
                        <i className="material-icons">assignment</i>Setar
                    </button>
                    <button onClick={addMarkers}>
                        <i className="material-icons">assignment</i>Adicionar
                    </button>
                    <button onClick={deleteMarker}>
                        <i className="material-icons">assignment</i>Remover
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
