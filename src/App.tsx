import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import Map from './Map/Map'
import Menu from './Menu/Menu'
import {setMarkers} from 'src/redux/map/actions'

const markers = [
    {lat: 41.0082, lng: 28.9784, title: 'Istanbul'},
    {lat: -23.7, lng: -46.5, title: 'São Paulo'},
]

const App: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setMarkers(markers))
    }, [])

    return (
        <div>
            <Map/>
            <Menu/>
        </div>
    );
}

export default App;
