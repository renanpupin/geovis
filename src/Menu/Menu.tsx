import React, {useEffect, useRef, useState} from 'react';

import styles from './Menu.module.scss';
import Logo from 'src/assets/img/logo.png';
import {useDispatch} from "react-redux";
import { addVisualization, removeVisualization, loadData, addFilter, removeFilter} from "src/redux/data/actions";
import {VisualizationTypeValues} from "src/redux/data/types";
import DropdownItem from "src/Menu/DropdownItem";
import DropdownMenu from "src/Menu/DropdownMenu";
import DataWizard from "src/components/DataWizard/DataWizard";
import VisualizationWizard from "src/components/VisualizationWizard/VisualizationWizard";
import FilterWizard from "src/components/FilterWizard/FilterWizard";
import RemoveVisualizationWizard from "src/components/RemoveVisualizationWizard/RemoveVisualizationWizard";
import RemoveFilterWizard from "src/components/RemoveFilterWizard/RemoveFilterWizard";
import {ENV} from "src/libs/env";

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
    const [showDataWizard, setShowDataWizard] = useState(false)
    const [showVisualizationWizard, setShowVisualizationWizard] = useState(false)
    const [showFilterWizard, setShowFilterWizard] = useState(false)
    const [showRemoveVisualizationWizard, setShowRemoveVisualizationWizard] = useState(false)
    const [showRemoveFilterWizard, setShowRemoveFilterWizard] = useState(false)

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

    const openFilterModal = () => {
        setShowFilterWizard(true)
    }

    const openDataModal = () => {
        setShowDataWizard(true)
    }

    const openVisualizationModal = () => {
        setShowVisualizationWizard(true)
    }

    const openRemoveVisualizationModal = () => {
        setShowRemoveVisualizationWizard(true)
    }

    const openRemoveFilterModal = () => {
        setShowRemoveFilterWizard(true)
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
                openVisualizationModal();
                break;
            }
            case 'removeVis': {
                openRemoveVisualizationModal();
                // removeHeatmap();
                // removeMarkerCluster();
                break;
            }
            case 'addFilter': {
                openFilterModal();
                break;
            }
            case 'removeFilter': {
                openRemoveFilterModal();
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
                            <i className="material-icons">{props.viewMode === 'map' ? 'table_view' : 'map'}</i>{props.viewMode === 'map' ? 'Ver tabela' : 'Ver mapa'}
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
                            <i className="material-icons">layers</i>Visualizações
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
                            <i className="material-icons">filter_alt</i>Filtros
                        </DropdownItem>
                        {menuOpen === 'filters' && <DropdownMenu>
                            <li className={styles.submenu}>
                                <DropdownItem onPress={(event: any) => {onPressItem(event, 'addFilter')}}>
                                    <i className="material-icons">add</i>Adicionar
                                </DropdownItem>
                            </li>
                            <li className={styles.submenu}>
                                <DropdownItem onPress={(event: any) => {onPressItem(event, 'removeFilter')}}>
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

            {showVisualizationWizard && <VisualizationWizard
                onFinish={(data) => {
                    console.log("onFinish", data);
                    setShowVisualizationWizard(false);

                    if(data.type === 'heatmap'){
                        dispatch(addVisualization(VisualizationTypeValues.Heatmap))
                    }else if(data.type === 'cluster'){
                        dispatch(addVisualization(VisualizationTypeValues.MarkerCluster))
                    }
                }}
                onClose={() => {
                    setShowVisualizationWizard(false);
                }}
            />}

            {showRemoveVisualizationWizard && <RemoveVisualizationWizard
                onFinish={(data: any) => {
                    console.log("onFinish", data);
                    setShowRemoveVisualizationWizard(false);

                    dispatch(removeVisualization(data.id))
                }}
                onClose={() => {
                    setShowRemoveVisualizationWizard(false);
                }}
            />}

            {showFilterWizard && <FilterWizard
                onFinish={(data) => {
                    console.log("onFinish", data);
                    setShowFilterWizard(false);

                    dispatch(addFilter(data))
                }}
                onClose={() => {
                    setShowFilterWizard(false);
                }}
            />}

            {showRemoveFilterWizard && <RemoveFilterWizard
                onFinish={(data: any) => {
                    console.log("onFinish", data);
                    setShowRemoveFilterWizard(false);

                    dispatch(removeFilter(data.id))
                }}
                onClose={() => {
                    setShowRemoveFilterWizard(false);
                }}
            />}
        </nav>
    )
}

export default Menu
