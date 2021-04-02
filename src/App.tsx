import React, {useEffect,  useState} from 'react';
import Map from 'src/components/Map/Map'
import Table from './Table/Table'
import Menu from './Menu/Menu'
import Draggable from 'src/components/Draggable/Draggable'
import Chart from 'src/components/Chart/Chart'
import FilterList from "src/components/FilterList/FilterList";
import LayersList from "src/components/LayersList/LayersList";
import SideMenu from "src/components/SideMenu/SideMenu";
import {useSelector} from "react-redux";
import {getVisualizations} from "src/redux/data/selectors";
import {VisualizationTypeValues} from 'src/redux/data/types'

const App: React.FC = () => {
    const [viewMode, setViewMode] = useState('map')
    const visualizations = useSelector(getVisualizations)
    return (
        <div>
            {viewMode === 'map' ? <Map/> : <Table/>}
            <Menu
                //@ts-ignore
                viewMode={viewMode}
                onChangeMode={() => {
                    setViewMode(viewMode === 'map' ? 'table' : 'map')
                }}
            />

            {/*<Draggable initialPosition={{x: 150, y: 150}}>*/}
            {/*    <div style={{padding: 20}}>*/}
            {/*        Charts content*/}
            {/*    </div>*/}
            {/*</Draggable>*/}

            {visualizations.filter((item: any) => item.type === VisualizationTypeValues.Chart).map((item: any, index: number) => (<Chart key={index} index={index} visData={item}/>))}

            <SideMenu
                items={[
                    {
                        title: 'Layers',
                        component: <LayersList/>,
                        icon: 'layers'
                    },
                    {
                        title: 'Filters',
                        component: <FilterList/>,
                        icon: 'filter_alt'
                    },
                ]}
            />
        </div>
    );
}

export default App;
