import React, {useEffect, useRef, useState} from 'react';

import styles from './Menu.module.scss';
import Logo from 'src/assets/img/logo.png';
import {useDispatch, useSelector} from "react-redux";
import { addVisualization, removeVisualization, loadData} from "src/redux/data/actions";
import {VisualizationTypeValues} from "src/redux/data/types";
import {getAttributes, getVisibleData, getVisualizations} from "src/redux/data/selectors";
import DropdownItem from "src/Menu/DropdownItem";
import DropdownMenu from "src/Menu/DropdownMenu";
import Modal from "src/components/Modal/Modal";
import DataWizard from "src/components/DataWizard/DataWizard";

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
    const attributes = useSelector(getAttributes)
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [showDataWizard, setShowDataWizard] = useState(false)
    const [modalContent, setModalContent] = useState<string | null>(null)

    // const loadMarkers = () => {
    //     dispatch(loadData(markers))
    // }

    // const deleteMarker = () => {
    //     dispatch(removeDataItem(visibleData[0]))
    // }
    //
    // const addMarkers = () => {
    //     dispatch(addDataItem(add))
    // }

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

    const openFilterDropdown = () => {
        setModalContent('filter')
        setDropdownVisible(true)
    }

    const openDataModal = () => {
        setShowDataWizard(true)
    }

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
                // loadMarkers();
                openDataModal();
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
            case 'addFilter': {
                openFilterDropdown();
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
                                <DropdownItem onPress={(event: any) => {onPressItem(event, 'addFilter')}}>
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

    const getModalContent = () => {
        if(modalContent === 'filter'){
            return(
                <div>
                    <div>
                        <label htmlFor="inputFiltroAddName">Nome do filtro</label>
                        <input type="text" id="inputFiltroAddName"/>
                    </div>
                    <div>
                        <label htmlFor="inputFiltroAddAttribute">Attribute</label>
                        <select id="inputFiltroAddAttribute">
                            {attributes.map((item, index) => {
                                return(
                                    <option key={index} value={item.name}>{item.name} ({item.type})</option>
                                )
                            })}
                            {attributes.length === 0 && <option value={undefined}>No attributes found.</option>}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="inputFiltroAddCondition">Condition</label>
                        <select id="inputFiltroAddCondition">
                            <option value="equal">Equal</option>
                            <option value="equal">Different</option>
                            <option value="more than">More than</option>
                            <option value="more than or equal">More than or equal</option>
                            <option value="less than">Less than</option>
                            <option value="less than or equal">Less than or equal</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="inputFiltroAddCondition">Value</label>
                        {/*if boolean*/}
                        <select id="inputFiltroAddCondition">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>

                        {/*if string*/}
                        <input type="text" id="inputFiltroAddName"/>

                        {/*if number*/}
                        <select id="inputFiltroAddCondition">
                            <option value="more than">More than</option>
                            <option value="equal">Equal</option>
                            {/*...*/}
                        </select>

                        <select id="inputFiltroAddCondition">
                            <option value="average">Average</option>
                            <option value="median">Median</option>
                            {/*...*/}
                        </select>
                    </div>
                </div>
            )
        }
    }

    return (
        <nav id="nav" className={styles.nav}>
            <div className={styles.navbarHeader}>
                <div className={styles.brand}>
                    <img alt={"Logo"} className={styles.navbarLogo} src={Logo}/>
                    <span className={styles.navbarTitle}>GeoVIS</span>
                </div>
            </div>

            <Dropdown/>

            {showDataWizard && <DataWizard
                onFinish={(data) => {
                    console.log("onFinish", data);
                    setShowDataWizard(false);

                    dispatch(loadData(data))
                }}
                onClose={() => {
                    setShowDataWizard(false);
                }}
            />}

            <Modal
                visible={dropdownVisible}
                onConfirm={() => setDropdownVisible(false)}
                onClose={() => setDropdownVisible(false)}
                title={'Add filters'}
            >
                {getModalContent()}
            </Modal>
        </nav>
    )
}

export default Menu
