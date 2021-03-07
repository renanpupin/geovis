
export const getMapState = store => store.map;

export const getMarkers = store =>
    getMapState(store) ? getMapState(store).markers : [];
