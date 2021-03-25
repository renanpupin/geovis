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
import {ENV} from "src/libs/env";
import FPSStats from "src/libs/fps-stats";

const fastLoadData = {"attributes":[{"name":"id","type":"number"},{"name":"lat","type":"number"},{"name":"lon","type":"number"},{"name":"name","type":"string"},{"name":"category","type":"string"},{"name":"value","type":"number"},{"name":"active","type":"boolean"}],"rows":[[1,-22.075,-51.425,"feature2","cat2",5,false],[2,-22.08,-51.4352,"feature1","cat1",11,false],[3,-22.075,-51.415,"feature3","cat3",6,true],[4,-22.065,-51.315,"feature4","cat1",4,false],[5,-22.04153,-51.4512,"feature5","cat2",5.56,true],[6,-22.04976,-51.521,"feature6","cat3",6.21,false],[7,-22.0564,-51.5555,"feature7","cat1",7.11,true],[8,-22.0974,-51.5895,"feature8","cat1",8.123,true],[9,-22.101,-51.6,"feature9","cat2",9.3219,true],[10,-22.005,-51.5214,"feature10","cat1",10.543,true],[11,-22.155,-51.421,"feature11","cat1",11.543,true],[12,-22.165,-51.431,"feature12","cat2",12.12,false],[13,-22.169,-51.49,"feature13","cat1",12.12,false],[14,-22.1,-51.5,"feature14","cat1",5.12,true],[15,-22.13,-51.54,"feature15","cat3",7.22,false],[16,-22.135,-51.52,"feature16","cat3",8.65,true],[17,-22.19,-51.63,"feature17","cat2",1.23,true],[18,-22.22,-51.463,"feature18","cat1",7.85,false],[19,-22.301,-51.551,"feature19","cat2",7.86,true],[20,-22.345,-51.412,"feature20","cat2",5.23,false],[21,-22.223,-51.222,"feature21","cat1",5.54,true],[22,-22.441,-51.498,"feature22","cat3",0.56,false],[23,-22.333,-51.519,"feature23","cat1",7.51,false],[24,-22.212,-51.312,"feature24","cat3",6.512,false],[25,-22.512,-51.431,"feature25","cat2",2.12,true],[26,-22.301,-51.551,"feature26","cat1",9.65,false],[27,-22.514,-51.123,"feature27","cat3",4.31,true],[28,-22.5813,-51.598,"feature28","cat2",3.86,true],[29,-22.1234,-51.563,"feature29","cat3",6.123,false],[30,-22.123,-51.4689,"feature30","cat1",1.52,true],[31,-22.3567,-51.315,"feature31","cat1",0.33,false],[32,-22.654,-51.311,"feature32","cat3",7.81,true],[33,-22.445,-51.313,"feature33","cat2",5.76,true]],"rawDataObj":{"name":"example.csv","content":"id,lat,lon,name,category,value,active\n1,-22.075,-51.425,feature2,cat2,5,false\n2,-22.08,-51.4352,feature1,cat1,11,false\n3,-22.075,-51.415,feature3,cat3,6,true\n4,-22.065,-51.315,feature4,cat1,4,false\n5,-22.04153,-51.4512,feature5,cat2,5.56,true\n6,-22.04976,-51.521,feature6,cat3,6.21,false\n7,-22.0564,-51.5555,feature7,cat1,7.11,true\n8,-22.0974,-51.5895,feature8,cat1,8.123,true\n9,-22.101,-51.6,feature9,cat2,9.3219,true\n10,-22.005,-51.5214,feature10,cat1,10.543,true\n11,-22.155,-51.421,feature11,cat1,11.543,true\n12,-22.165,-51.431,feature12,cat2,12.12,false\n13,-22.169,-51.49,feature13,cat1,12.12,false\n14,-22.1,-51.5,feature14,cat1,5.12,true\n15,-22.13,-51.54,feature15,cat3,7.22,false\n16,-22.135,-51.52,feature16,cat3,8.65,true\n17,-22.19,-51.63,feature17,cat2,1.23,true\n18,-22.22,-51.463,feature18,cat1,7.85,false\n19,-22.301,-51.551,feature19,cat2,7.86,true\n20,-22.345,-51.412,feature20,cat2,5.23,false\n21,-22.223,-51.222,feature21,cat1,5.54,true\n22,-22.441,-51.498,feature22,cat3,0.56,false\n23,-22.333,-51.519,feature23,cat1,7.51,false\n24,-22.212,-51.312,feature24,cat3,6.512,false\n25,-22.512,-51.431,feature25,cat2,2.12,true\n26,-22.301,-51.551,feature26,cat1,9.65,false\n27,-22.514,-51.123,feature27,cat3,4.31,true\n28,-22.5813,-51.598,feature28,cat2,3.86,true\n29,-22.1234,-51.563,feature29,cat3,6.123,false\n30,-22.123,-51.4689,feature30,cat1,1.52,true\n31,-22.3567,-51.315,feature31,cat1,0.33,false\n32,-22.654,-51.311,feature32,cat3,7.81,true\n33,-22.445,-51.313,feature33,cat2,5.76,true\n","type":"text/csv"},"latAttribute":"lat","lonAttribute":"lon"};

// const markers = [
//     {id: 1, lat: 41.0082, lng: 28.9784, title: 'Istanbul'},
//     {id: 2, lat: 40.0082, lng: 27.9784, title: 'Istanbul next'},
//     {id: 3, lat: -23.7, lng: -46.5, title: 'São Paulo'},
//     {id: 4, lat: -22.705, lng: -45.5, title: 'Rio'},
//     {id: 5, lat: -22.71, lng: -45.52, title: 'Rio 2'},
//     {id: 6, lat: -22.72, lng: -45.55, title: 'Rio 3'},
//     {id: 7, lat: -22.73, lng: -45.56, title: 'Rio 4'},
//     {id: 8, lat: -22.74, lng: -45.58, title: 'Rio 5'},
//     {id: 9, lat: -22.75, lng: -45.59, title: 'Rio 6'},
//     {id: 10, lat: -22.46, lng: -45.51, title: 'Rio 7'},
//     {id: 11, lat: -22.36, lng: -45.515, title: 'Rio 8'},
//     {id: 12, lat: -22.765, lng: -45.525, title: 'Rio 9'},
//     {id: 13, lat: -22.66, lng: -45.535, title: 'Rio 10'},
//     {id: 14, lat: -22.55, lng: -45.546, title: 'Rio 11'},
// ]
//
// const add = {id: 5, lat: -21, lng: -44, title: 'Another'}

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

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const loadTestData = urlParams.get('testdata');
        if(ENV !== 'production' && (loadTestData === "true")){
            dispatch(loadData(fastLoadData))
        }

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
