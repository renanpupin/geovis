import React, {useEffect,  useState} from 'react';
import Map from 'src/components/Map/Map'
import Table from './Table/Table'
import Menu from './Menu/Menu'
import Draggable from 'src/components/Draggable/Draggable'
import Chart from 'src/components/Chart/Chart'
import FilterList from "src/components/FilterList/FilterList";
import LayersList from "src/components/LayersList/LayersList";
import SideMenu from "src/components/SideMenu/SideMenu";

const App: React.FC = () => {
    const [viewMode, setViewMode] = useState('map')
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

            {/*<Chart/>*/}

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
