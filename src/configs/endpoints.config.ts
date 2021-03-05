const base: string = 'http://localhost:8080/api';

const endpoints = {
    base: base,
    getListStations: () => `${base}/stations`,
    deleteStation: (stationId: string) => `${base}/stations/${stationId}`,
    deletePool: (poolId: string) => `${base}/stations/pools/${poolId}`,
    deleteTank: (tankId: string) => `${base}/stations/tanks/${tankId}`,
    login: () => `${base}/admin/auth`,
    getListUsers: () => `${base}/users/detail`,
    addStation: () => `${base}/stations`,
    updateStation: (stationId: string) => `${base}/stations/${stationId}`,
    getStationDetails: (stationId: string) => `${base}/stations/${stationId}`,
    addTank: () => `${base}/stations/tanks`,
    addPool: () => `${base}/stations/pools`
};

export default endpoints;