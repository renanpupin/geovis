import React, {useEffect, useRef, useState} from 'react';

import styles from './Menu.module.scss';
import Logo from 'src/assets/img/logo.png';
import {useDispatch, useSelector} from "react-redux";
import {addDataItem, addVisualization, removeDataItem, removeVisualization, setData} from "src/redux/data/actions";
import {VisualizationTypeValues} from "src/redux/data/types";
import {getVisibleData, getVisualizations} from "src/redux/data/selectors";
import DropdownItem from "src/Menu/DropdownItem";
import DropdownMenu from "src/Menu/DropdownMenu";

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
    const visualizations = useSelector(getVisualizations)

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
    const removeHeatmap = () => {
        dispatch(removeVisualization(visualizations.filter(item => item.type === VisualizationTypeValues.Heatmap)?.[0]))
    }

    const addMarkerCluster = () => {
        dispatch(addVisualization(VisualizationTypeValues.MarkerCluster))
    }
    const removeMarkerCluster = () => {
        dispatch(removeVisualization(visualizations.filter(item => item.type === VisualizationTypeValues.MarkerCluster)?.[0]))
    }

    const dropdownMenu = useRef(null)
    const [menuOpen, setMenuOpen] = useState<string | null>(null)

    const documentClickListener = (event: any) => {
        //@ts-ignore
        if (!dropdownMenu?.current?.contains(event.target)) {
            // document.removeEventListener('click', closeMenu);
            setMenuOpen(null)
        }
    }

    useEffect(() => {
        document.addEventListener('click', documentClickListener);
        return () => {
            document.removeEventListener('click', documentClickListener);
        }
    }, []);

    const toggleMenu = (event: any, name: string) => {
        event.preventDefault();
        event.stopPropagation();

        if (menuOpen) {
            // document.removeEventListener('click', closeMenu);
        } else {
            // document.addEventListener('click', closeMenu);
        }

        setMenuOpen(menuOpen !== name ? name : null);
    }

    const onPressItem = (event: any, action: any) => {
        event.preventDefault();
        event.stopPropagation();

        setMenuOpen(null);
        // document.removeEventListener('click', closeMenu);

        switch(action){
            case 'changeView': {
                onChangeMode();
                break;
            }
            case 'loadData': {
                loadMarkers();
                break;
            }
            case 'addVis': {
                addHeatmap();
                addMarkerCluster();
                break;
            }
            case 'removeVis': {
                removeHeatmap();
                removeMarkerCluster();
                break;
            }
        }
    }

    const Dropdown = () => {
        return (
            <div ref={dropdownMenu}>
                <ul className={styles.menuList}>
                    <li className={styles.submenu}>
                        <DropdownItem onPress={(event: any) => {onPressItem(event, 'changeView')}}>
                            <i className="material-icons">{props.viewMode === 'map' ? 'map' : 'table_view'}</i>{props.viewMode === 'map' ? 'Ver tabela' : 'Ver mapa'}
                        </DropdownItem>
                    </li>
                    <li className={styles.submenu}>
                        <DropdownItem onPress={(event: any) => {toggleMenu(event, 'data')}}>
                            <i className="material-icons">assignment</i>Dados
                        </DropdownItem>
                        {menuOpen === 'data' && <DropdownMenu>
                            <li className={styles.submenu}>
                                <DropdownItem onPress={(event: any) => {onPressItem(event, 'loadData')}}>
                                    <i className="material-icons">attach_file</i>Carregar
                                </DropdownItem>
                            </li>
                        </DropdownMenu>}
                    </li>
                    <li className={styles.submenu}>
                        <DropdownItem onPress={(event: any) => {toggleMenu(event, 'visualizations')}}>
                            <i className="material-icons">insert_chart</i>Visualizações
                        </DropdownItem>
                        {menuOpen === 'visualizations' && <DropdownMenu>
                            <li className={styles.submenu}>
                                <DropdownItem onPress={(event: any) => {onPressItem(event, 'addVis')}}>
                                    <i className="material-icons">add</i>Adicionar
                                </DropdownItem>
                            </li>
                            <li className={styles.submenu}>
                                <DropdownItem onPress={(event: any) => {onPressItem(event, 'removeVis')}}>
                                    <i className="material-icons">delete</i>Remover
                                </DropdownItem>
                            </li>
                        </DropdownMenu>}
                    </li>
                    <li className={styles.submenu}>
                        <DropdownItem onPress={(event: any) => {toggleMenu(event, 'filters')}}>
                            <i className="material-icons">details</i>Filtros
                        </DropdownItem>
                        {menuOpen === 'filters' && <DropdownMenu>
                            <li className={styles.submenu}>
                                <DropdownItem onPress={onPressItem}>
                                    <i className="material-icons">add</i>Adicionar
                                </DropdownItem>
                            </li>
                            <li className={styles.submenu}>
                                <DropdownItem onPress={onPressItem}>
                                    <i className="material-icons">delete</i>Remover
                                </DropdownItem>
                            </li>
                        </DropdownMenu>}
                    </li>
                    <li className={styles.submenu}>
                        <DropdownItem onPress={onPressItem}>
                            <i className="material-icons">file_download</i>Salvar
                        </DropdownItem>
                    </li>
                    <li className={styles.submenu}>
                        <DropdownItem onPress={onPressItem}>
                            <i className="material-icons">file_upload</i>Carregar
                        </DropdownItem>
                    </li>
                </ul>
            </div>
        )
    }

    // <li className="nav-item">
    //     <a className="nav-link" href="#">Link</a>
    // </li>
    // <li className="nav-item dropdown">
    //     <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
    //        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //         Dropdown
    //     </a>
    //     <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    //         <a className="dropdown-item" href="#">Action</a>
    //         <a className="dropdown-item" href="#">Another action</a>
    //         <div className="dropdown-divider"></div>
    //         <a className="dropdown-item" href="#">Something else here</a>
    //     </div>
    // </li>

    return (
        <nav id="nav" className={styles.nav}>
            <div className={styles.navbarHeader}>
                <div className={styles.brand}>
                    <img alt={"Logo"} className={styles.navbarLogo} src={Logo}/>
                    <span className={styles.navbarTitle}>GeoVIS</span>
                </div>
            </div>

            <Dropdown/>
        </nav>
    )
}

export default Menu
