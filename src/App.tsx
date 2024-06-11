import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import Map from 'src/components/Map/Map'
import Table from 'src/components/Table/Table'
import Menu from 'src/components/Menu/Menu'
import Chart from 'src/components/Chart/Chart'
import ParallelCoordinates from 'src/components/ParallelCoordinates/ParallelCoordinates'
import FilterList from 'src/components/FilterList/FilterList'
import TemporalFilter from 'src/components/TemporalFilter/TemporalFilter'
import LayersList from 'src/components/LayersList/LayersList'
import SideMenu from 'src/components/SideMenu/SideMenu'
import {getTemporalAttribute, getVisualizations} from 'src/redux/data/selectors'
import {VisualizationTypeValues} from 'src/redux/data/types'

const App: React.FC = () => {
    const [viewMode, setViewMode] = useState<'map' | 'table'>('map')
    const [visMode, setVisMode] = useState<'split' | 'full'>('split')
    const temporalAttribute = useSelector(getTemporalAttribute)
    const visualizations = useSelector(getVisualizations)
    // console.log('visualizations', visualizations)
    // console.log('app temporalAttribute', !!temporalAttribute)
    return (
        <div>
            <Menu
                viewMode={viewMode}
                onChangeMode={() => {
                    setViewMode(viewMode === 'map' ? 'table' : 'map')
                }}
            />

            <div className={'splitView'} style={{display: 'flex', flexDirection: 'row'}}>
                <div
                    className={'dataViewWrapper'}
                    style={{flex: 1, width: visMode === 'split' ? `min(80%, 80% - 400px)` : '100%'}}
                >
                    {viewMode === 'map' ? <Map /> : <Table />}
                </div>
                <div
                    className={'visWrapper'}
                    style={{
                        flex: 0,
                        flexDirection: 'column',
                        maxHeight: `calc(100vh - 65px)`,
                        marginTop: 65,
                        overflowY: 'scroll',
                        width: visMode === 'split' ? `max(20%, 400px)` : '0%',
                        display: 'flex',
                        minWidth: visMode === 'split' ? 400 : 0,
                        borderLeft: '1px solid #e1e1e1'
                    }}
                >
                    <div
                        style={{
                            padding: 30,
                            paddingTop: 15,
                            paddingBottom: 15,
                            borderBottom: '1px solid #e1e1e1'
                        }}
                    >
                        <h6>Visualizations</h6>
                    </div>
                    {visualizations
                        .filter(
                            (item: any) =>
                                item.visible && item.type === VisualizationTypeValues.Chart
                        )
                        .map((item: any, index: number) => (
                            <div key={item.id} style={{borderBottom: '1px solid #e1e1e1'}}>
                                <Chart index={index} visData={item} visMode={visMode} />
                            </div>
                        ))}
                    {visualizations
                        .filter(
                            (item: any) =>
                                item.visible &&
                                item.type === VisualizationTypeValues.ParallelCoordinates
                        )
                        .map((item: any, index: number) => (
                            <div key={index} style={{borderBottom: '1px solid #e1e1e1'}}>
                                <ParallelCoordinates visMode={visMode} />
                            </div>
                        ))}
                </div>
            </div>

            <SideMenu
                items={[
                    {
                        title: 'Layers',
                        component: <LayersList />,
                        icon: 'layers'
                    },
                    {
                        title: 'Filters',
                        component: <FilterList />,
                        icon: 'filter_alt'
                    }
                ]}
            />

            <div
                style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    width: 50,
                    height: 50,
                    backgroundColor: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    borderRadius: 6,
                    userSelect: 'none'
                }}
                onClick={() => {
                    setVisMode(visMode === 'split' ? 'full' : 'split')
                }}
            >
                <i className="material-icons">
                    {visMode === 'split' ? 'fullscreen' : 'vertical_split'}
                </i>
            </div>

            {!!temporalAttribute && viewMode === 'map' && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 'calc(50% - 250px)',
                        width: 500,
                        // height: 75,
                        padding: 20,
                        backgroundColor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        borderRadius: 6,
                        userSelect: 'none'
                    }}
                >
                    <TemporalFilter />
                </div>
            )}
        </div>
    )
}

export default App
