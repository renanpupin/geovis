import React, {useEffect} from 'react';

const Heatmap = (props: any) => {
    const gmapHeatmap = new window.google.maps.visualization.HeatmapLayer({
        data: [],
        map: props.map,
        radius: 30
    })

    useEffect(() => {
        return () => {
            gmapHeatmap.setMap(null)
        };
    }, []);

    useEffect(() => {
        //TODO: adicionar suporte ao highlight
        gmapHeatmap.setData(props.data.map((data: any) => {
            return {
                location: new window.google.maps.LatLng(data.lat, data.lng),
                weight: 1   //usar com peso de marker clusters
            }
        }));
        return () => {
            //TODO: testar aqui, está devagar para usar heatmap + filtro
            gmapHeatmap.setMap(null)
        };
        //TODO: ao remover pontos, não está removendo
    }, [props.data]);

    return null;
}

export default Heatmap;
