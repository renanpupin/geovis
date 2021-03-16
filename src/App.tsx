import React, {useEffect,  useState} from 'react';
import Map from 'src/components/Map/Map'
import Table from './Table/Table'
import Menu from './Menu/Menu'
import Draggable from 'src/components/Draggable/Draggable'
import Chart from 'src/components/Chart/Chart'

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
        </div>
    );
}

export default App;
