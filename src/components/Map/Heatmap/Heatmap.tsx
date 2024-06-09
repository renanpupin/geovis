import React, {useEffect, useMemo} from 'react'

const Heatmap = (props: {map: any; data: any}) => {
    const gmapHeatmap = useMemo(() => {
        return new window.google.maps.visualization.HeatmapLayer({
            data: [],
            map: props.map,
            radius: 30
        })
    }, [props.map])

    useEffect(() => {
        return () => {
            gmapHeatmap.setMap(null)
        }
    }, [])

    useEffect(() => {
        gmapHeatmap.setMap(props.map)

        gmapHeatmap.setData(
            props.data.map((data: any) => {
                return {
                    location: new window.google.maps.LatLng(data.lat, data.lng),
                    weight: 1 //usar com peso de marker clusters
                }
            })
        )
        return () => {
            //TODO: testar aqui, está devagar para usar heatmap + filtro
            gmapHeatmap.setMap(null)
        }
        //TODO: ao remover pontos, não está removendo
    }, [props.data])

    return null
}

export default Heatmap
