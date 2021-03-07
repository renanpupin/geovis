import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './Map.module.css';

class Map extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
    }

    onScriptLoad() {
        const map = new window.google.maps.Map(
            document.getElementById(this.props.id),
            this.props.options);
        this.props.onMapLoad(map)
    }

    componentDidMount() {
        if (!window.google) {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `http://maps.googleapis.com/maps/api/js?v=3.44&key=AIzaSyB3B202UDbbPzCUO9UGp9-rlBQ8glIQ0uQ&libraries=visualization`;
            let x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            // Below is important.
            //We cannot access google.maps until it's finished loading
            s.addEventListener('load', e => {
                this.onScriptLoad()
            })
        } else {
            this.onScriptLoad()
        }
    }

    render() {
        return (
            <div className={styles.map} id={this.props.id} />
        );
    }
}

export default Map
