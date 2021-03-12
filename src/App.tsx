import React, {useEffect,  useState} from 'react';
import Map from './Map/Map'
import Table from './Table/Table'
import Menu from './Menu/Menu'

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
        </div>
    );
}

export default App;
