import React, {useEffect, useRef, useState} from 'react'

import styles from './Menu.module.scss'
import Logo from 'src/assets/img/logo.png'
import {useDispatch} from 'react-redux'
import {
    addVisualization,
    removeVisualization,
    loadData,
    addFilter,
    removeFilter
} from 'src/redux/data/actions'
import {
    VisualizationTypeValues,
    FilterTypes,
    FilterTargetTypes,
    ConditionsTypes,
    VisualizationTypes
} from 'src/redux/data/types'
import DropdownItem from 'src/components/Menu/DropdownItem'
import DropdownMenu from 'src/components/Menu/DropdownMenu'
import DataWizard from 'src/components/DataWizard/DataWizard'
import VisualizationWizard from 'src/components/VisualizationWizard/VisualizationWizard'
import FilterWizard from 'src/components/FilterWizard/FilterWizard'
import RemoveVisualizationWizard from 'src/components/RemoveVisualizationWizard/RemoveVisualizationWizard'
import RemoveFilterWizard from 'src/components/RemoveFilterWizard/RemoveFilterWizard'
import {ENV} from 'src/libs/env'

const fastLoadData = {
    attributes: [
        {name: 'id', type: 'number'},
        {name: 'lat', type: 'number'},
        {name: 'lon', type: 'number'},
        {name: 'name', type: 'string'},
        {name: 'category', type: 'string'},
        {name: 'value', type: 'number'},
        {name: 'age', type: 'number'},
        {name: 'capital', type: 'number'},
        {name: 'active', type: 'boolean'}
    ],
    rows: [
        [1, -22.075, -51.425, 'feature2', 'cat2', 5, 15, 1555, false],
        [2, -22.08, -51.4352, 'feature1', 'cat1', 11, 31, 5555, false],
        [3, -22.075, -51.415, 'feature3', 'cat3', 6, 63, 5123, true],
        [4, -22.065, -51.315, 'feature4', 'cat1', 4, 44, 5111, false],
        [5, -22.04153, -51.4512, 'feature5', 'cat2', 5.56, 55, 7112, true],
        [6, -22.04976, -51.521, 'feature6', 'cat3', 6.21, 61, 9932, false],
        [7, -22.0564, -51.5555, 'feature7', 'cat1', 7.11, 71, 3213, true],
        [8, -22.0974, -51.5895, 'feature8', 'cat1', 8.123, 83, 500, true],
        [9, -22.101, -51.6, 'feature9', 'cat2', 9.3219, 39, 5125, true],
        [10, -22.005, -51.5214, 'feature10', 'cat1', 10.543, 13, 3212, true],
        [11, -22.155, -51.421, 'feature11', 'cat1', 11.543, 53, 3213, true],
        [12, -22.165, -51.431, 'feature12', 'cat2', 12.12, 12, 5521, false],
        [13, -22.169, -51.49, 'feature13', 'cat1', 12.12, 22, 1222, false],
        [14, -22.1, -51.5, 'feature14', 'cat1', 5.12, 52, 3213, true],
        [15, -22.13, -51.54, 'feature15', 'cat3', 7.22, 72, 511, false],
        [16, -22.135, -51.52, 'feature16', 'cat3', 8.65, 85, 9942, true],
        [17, -22.19, -51.63, 'feature17', 'cat2', 1.23, 13, 8162, true],
        [18, -22.22, -51.463, 'feature18', 'cat1', 7.85, 75, 3123, false],
        [19, -22.301, -51.551, 'feature19', 'cat2', 7.86, 76, 12000, true],
        [20, -22.345, -51.412, 'feature20', 'cat2', 5.23, 53, 9842, false],
        [21, -22.223, -51.222, 'feature21', 'cat1', 5.54, 24, 2233, true],
        [22, -22.441, -51.498, 'feature22', 'cat3', 0.56, 6, 8171, false],
        [23, -22.333, -51.519, 'feature23', 'cat1', 7.51, 71, 9172, false],
        [24, -22.212, -51.312, 'feature24', 'cat3', 6.512, 62, 9387, false],
        [25, -22.512, -51.431, 'feature25', 'cat2', 2.12, 22, 9312, true],
        [26, -22.351, -51.551, 'feature26', 'cat1', 9.65, 95, 9317, false],
        [27, -22.514, -51.123, 'feature27', 'cat3', 4.31, 41, 8127, true],
        [28, -22.5813, -51.598, 'feature28', 'cat2', 3.86, 36, 1233, true],
        [29, -22.1234, -51.563, 'feature29', 'cat3', 6.123, 63, 9832, false],
        [30, -22.123, -51.4689, 'feature30', 'cat1', 1.52, 12, 9123, true],
        [31, -22.3567, -51.315, 'feature31', 'cat1', 0.33, 33, 8772, false],
        [32, -22.654, -51.311, 'feature32', 'cat3', 7.81, 71, 8717, true],
        [33, -22.445, -51.313, 'feature33', 'cat2', 5.76, 56, 8771, true]
    ],
    rawDataObj: {
        name: 'example.csv',
        content:
            'id,lat,lon,name,category,value,active\n1,-22.075,-51.425,feature2,cat2,5,false\n2,-22.08,-51.4352,feature1,cat1,11,false\n3,-22.075,-51.415,feature3,cat3,6,true\n4,-22.065,-51.315,feature4,cat1,4,false\n5,-22.04153,-51.4512,feature5,cat2,5.56,true\n6,-22.04976,-51.521,feature6,cat3,6.21,false\n7,-22.0564,-51.5555,feature7,cat1,7.11,true\n8,-22.0974,-51.5895,feature8,cat1,8.123,true\n9,-22.101,-51.6,feature9,cat2,9.3219,true\n10,-22.005,-51.5214,feature10,cat1,10.543,true\n11,-22.155,-51.421,feature11,cat1,11.543,true\n12,-22.165,-51.431,feature12,cat2,12.12,false\n13,-22.169,-51.49,feature13,cat1,12.12,false\n14,-22.1,-51.5,feature14,cat1,5.12,true\n15,-22.13,-51.54,feature15,cat3,7.22,false\n16,-22.135,-51.52,feature16,cat3,8.65,true\n17,-22.19,-51.63,feature17,cat2,1.23,true\n18,-22.22,-51.463,feature18,cat1,7.85,false\n19,-22.301,-51.551,feature19,cat2,7.86,true\n20,-22.345,-51.412,feature20,cat2,5.23,false\n21,-22.223,-51.222,feature21,cat1,5.54,true\n22,-22.441,-51.498,feature22,cat3,0.56,false\n23,-22.333,-51.519,feature23,cat1,7.51,false\n24,-22.212,-51.312,feature24,cat3,6.512,false\n25,-22.512,-51.431,feature25,cat2,2.12,true\n26,-22.301,-51.551,feature26,cat1,9.65,false\n27,-22.514,-51.123,feature27,cat3,4.31,true\n28,-22.5813,-51.598,feature28,cat2,3.86,true\n29,-22.1234,-51.563,feature29,cat3,6.123,false\n30,-22.123,-51.4689,feature30,cat1,1.52,true\n31,-22.3567,-51.315,feature31,cat1,0.33,false\n32,-22.654,-51.311,feature32,cat3,7.81,true\n33,-22.445,-51.313,feature33,cat2,5.76,true\n',
        type: 'text/csv'
    },
    latAttribute: 'lat',
    lonAttribute: 'lon'
}
const fastLoadFilter: Omit<FilterTypes, 'id' | 'visible'> = {
    name: 'Filter boolean',
    condition: ConditionsTypes.Equal,
    attribute: {name: 'active', type: 'boolean'},
    targetType: FilterTargetTypes.value,
    targetValue: false
}
const fastLoadMarkerClusterVis: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.MarkerCluster,
    showChart: 'yes'
}
const fastLoadPieChartVis: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.Chart,
    chartType: 'pie',
    chartLabelAttribute: 'category',
    hasToGroup: true
}
const fastLoadPieChartUngroupedVis: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.Chart,
    chartType: 'pie',
    chartLabelAttribute: 'name',
    chartAttributeY: 'value',
    hasToGroup: false
}
const fastLoadParallelVis: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.ParallelCoordinates
    // chartType: "parallel"
}
const fastLoadMarkerChartPie: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.MarkerChart,
    markerChartType: 'pie',
    markerChartAttributes: ['value']
}
const fastLoadMarkerChartBar: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.MarkerChart,
    markerChartType: 'bar',
    markerChartAttributes: ['value', 'age']
}
const fastLoadMarkerChartLine: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.MarkerChart,
    markerChartType: 'line',
    markerChartAttributes: ['value', 'age']
}
const fastLoadMarkerChartPolar: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.MarkerChart,
    markerChartType: 'polar',
    markerChartAttributes: ['value', 'age']
}
const fastLoadMarkerChartRadar: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.MarkerChart,
    markerChartType: 'radar',
    markerChartAttributes: ['value', 'age', 'capital']
}
const fastLoadMarkerColor: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.MarkerColor,
    markerColorAttribute: 'category'
}
const fastLoadHistogramVis: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.Chart,
    chartAttributeX: undefined,
    chartAttributeY: 'value',
    chartLabelAttribute: 'category',
    chartType: 'histogram',
    hasToGroup: true
}

const fastLoadLineChartVis: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.Chart,
    chartAttributeX: undefined,
    chartAttributeY: 'age',
    chartLabelAttribute: 'name',
    chartType: 'line',
    hasToGroup: true
}

const fastLoadHeatmapVis: Omit<VisualizationTypes, 'id' | 'visible'> = {
    type: VisualizationTypeValues.Heatmap
}

type MenuTypes = {
    viewMode?: 'map' | 'table'
    onChangeMode?: any
}

const Menu: React.FC<MenuTypes> = props => {
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
        document.addEventListener('click', documentClickListener)

        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const loadTestData = urlParams.get('testdata')
        if (ENV !== 'production' && loadTestData === 'true') {
            dispatch(loadData(fastLoadData))
            // dispatch(addFilter(fastLoadFilter))
            dispatch(addVisualization(fastLoadMarkerClusterVis))
            dispatch(addVisualization(fastLoadPieChartVis))
            // dispatch(addVisualization(fastLoadPieChartVis))
            // dispatch(addVisualization(fastLoadMarkerChartPie))
            // dispatch(addVisualization(fastLoadMarkerChartBar))
            // dispatch(addVisualization(fastLoadMarkerChartLine))
            // dispatch(addVisualization(fastLoadMarkerChartPolar))
            dispatch(addVisualization(fastLoadMarkerChartRadar))
            // dispatch(addVisualization(fastLoadMarkerColor))
            // dispatch(addVisualization(fastLoadPieChartUngroupedVis))
            // dispatch(addVisualization(fastLoadParallelVis))
            // dispatch(addVisualization(fastLoadHistogramVis))
            // dispatch(addVisualization(fastLoadHeatmapVis))
            // dispatch(addVisualization(fastLoadLineChartVis))
        }

        return () => {
            document.removeEventListener('click', documentClickListener)
        }
    }, [])

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
        event.preventDefault()
        event.stopPropagation()

        if (menuOpen) {
            // document.removeEventListener('click', closeMenu);
        } else {
            // document.addEventListener('click', closeMenu);
        }

        setMenuOpen(menuOpen !== name ? name : null)
    }

    const onPressItem = (event: any, action: any) => {
        event.preventDefault()
        event.stopPropagation()

        setMenuOpen(null)
        // document.removeEventListener('click', closeMenu);

        switch (action) {
            case 'changeView': {
                onChangeMode()
                break
            }
            case 'loadData': {
                // loadMarkers();
                openDataModal()
                break
            }
            case 'addVis': {
                openVisualizationModal()
                break
            }
            case 'removeVis': {
                openRemoveVisualizationModal()
                // removeHeatmap();
                // removeMarkerCluster();
                break
            }
            case 'addFilter': {
                openFilterModal()
                break
            }
            case 'removeFilter': {
                openRemoveFilterModal()
                break
            }
        }
    }

    const Dropdown = () => {
        return (
            <div ref={dropdownMenu}>
                <ul className={styles.menuList}>
                    <li className={styles.submenu}>
                        <DropdownItem
                            onPress={(event: any) => {
                                onPressItem(event, 'changeView')
                            }}
                        >
                            <i className="material-icons">
                                {props.viewMode === 'map' ? 'table_view' : 'map'}
                            </i>
                            {props.viewMode === 'map' ? 'View table' : 'View map'}
                        </DropdownItem>
                    </li>
                    <li className={styles.submenu}>
                        <DropdownItem
                            onPress={(event: any) => {
                                toggleMenu(event, 'data')
                            }}
                        >
                            <i className="material-icons">assignment</i>Data
                        </DropdownItem>
                        {menuOpen === 'data' && (
                            <DropdownMenu>
                                <li className={styles.submenu}>
                                    <DropdownItem
                                        onPress={(event: any) => {
                                            onPressItem(event, 'loadData')
                                        }}
                                    >
                                        <i className="material-icons">attach_file</i>Load
                                    </DropdownItem>
                                </li>
                            </DropdownMenu>
                        )}
                    </li>
                    <li className={styles.submenu}>
                        <DropdownItem
                            onPress={(event: any) => {
                                toggleMenu(event, 'visualizations')
                            }}
                        >
                            <i className="material-icons">layers</i>Visualizations
                        </DropdownItem>
                        {menuOpen === 'visualizations' && (
                            <DropdownMenu>
                                <li className={styles.submenu}>
                                    <DropdownItem
                                        onPress={(event: any) => {
                                            onPressItem(event, 'addVis')
                                        }}
                                    >
                                        <i className="material-icons">add</i>Add
                                    </DropdownItem>
                                </li>
                                <li className={styles.submenu}>
                                    <DropdownItem
                                        onPress={(event: any) => {
                                            onPressItem(event, 'removeVis')
                                        }}
                                    >
                                        <i className="material-icons">delete</i>Remove
                                    </DropdownItem>
                                </li>
                            </DropdownMenu>
                        )}
                    </li>
                    <li className={styles.submenu}>
                        <DropdownItem
                            onPress={(event: any) => {
                                toggleMenu(event, 'filters')
                            }}
                        >
                            <i className="material-icons">filter_alt</i>Filters
                        </DropdownItem>
                        {menuOpen === 'filters' && (
                            <DropdownMenu>
                                <li className={styles.submenu}>
                                    <DropdownItem
                                        onPress={(event: any) => {
                                            onPressItem(event, 'addFilter')
                                        }}
                                    >
                                        <i className="material-icons">add</i>Add
                                    </DropdownItem>
                                </li>
                                <li className={styles.submenu}>
                                    <DropdownItem
                                        onPress={(event: any) => {
                                            onPressItem(event, 'removeFilter')
                                        }}
                                    >
                                        <i className="material-icons">delete</i>Remove
                                    </DropdownItem>
                                </li>
                            </DropdownMenu>
                        )}
                    </li>
                    {/*<li className={styles.submenu}>*/}
                    {/*    <DropdownItem onPress={onPressItem}>*/}
                    {/*        <i className="material-icons">file_download</i>Salvar*/}
                    {/*    </DropdownItem>*/}
                    {/*</li>*/}
                    {/*<li className={styles.submenu}>*/}
                    {/*    <DropdownItem onPress={onPressItem}>*/}
                    {/*        <i className="material-icons">file_upload</i>Carregar*/}
                    {/*    </DropdownItem>*/}
                    {/*</li>*/}
                </ul>
            </div>
        )
    }

    return (
        <nav id="nav" className={styles.nav}>
            <div className={styles.navbarHeader}>
                <div className={styles.brand}>
                    <img alt={'Logo'} className={styles.navbarLogo} src={Logo} />
                    <span className={styles.navbarTitle}>GeoVIS</span>
                </div>
            </div>

            <Dropdown />

            {showDataWizard && (
                <DataWizard
                    onFinish={data => {
                        // console.log('onFinish', data)
                        setShowDataWizard(false)

                        dispatch(loadData(data))
                    }}
                    onClose={() => {
                        setShowDataWizard(false)
                    }}
                />
            )}

            {showVisualizationWizard && (
                <VisualizationWizard
                    onFinish={(visualization: Omit<VisualizationTypes, 'id' | 'visible'>) => {
                        // console.log('onFinish', visualization)
                        setShowVisualizationWizard(false)

                        dispatch(addVisualization(visualization))
                    }}
                    onClose={() => {
                        setShowVisualizationWizard(false)
                    }}
                />
            )}

            {showRemoveVisualizationWizard && (
                <RemoveVisualizationWizard
                    onFinish={(data: any) => {
                        // console.log('onFinish', data)
                        setShowRemoveVisualizationWizard(false)

                        dispatch(removeVisualization(data.id))
                    }}
                    onClose={() => {
                        setShowRemoveVisualizationWizard(false)
                    }}
                />
            )}

            {showFilterWizard && (
                <FilterWizard
                    onFinish={data => {
                        // console.log('onFinish', data)
                        setShowFilterWizard(false)

                        dispatch(addFilter(data))
                    }}
                    onClose={() => {
                        setShowFilterWizard(false)
                    }}
                />
            )}

            {showRemoveFilterWizard && (
                <RemoveFilterWizard
                    onFinish={(data: any) => {
                        // console.log('onFinish', data)
                        setShowRemoveFilterWizard(false)

                        dispatch(removeFilter(data.id))
                    }}
                    onClose={() => {
                        setShowRemoveFilterWizard(false)
                    }}
                />
            )}
        </nav>
    )
}

export default Menu
