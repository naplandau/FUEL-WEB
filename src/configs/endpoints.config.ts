const base: string = 'http://localhost:3000/api';

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
    addPool: () => `${base}/stations/pools`,
    updateTank: (tankId: string) => `${base}/stations/tanks/${tankId}`,
    updatePool: (poolId: string) => `${base}/stations/pools/${poolId}`,
    getListTransactions: () => `${base}/transactions`,
    getMe: () => `${base}/users/me`,
    getUserDetails: (userId: string) => `${base}/users/${userId}`,
};

export default endpoints;