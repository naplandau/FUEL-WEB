const base: string = 'https://api.fuze.life/api';

const endpoints = {
    base: base,
    getListStations: () => `${base}/stations`,
    deleteStation: (stationId: string) => `${base}/stations/${stationId}`,
    deletePool: (poolId: string) => `${base}/stations/pools/${poolId}`,
    deleteTank: (tankId: string) => `${base}/stations/tanks/${tankId}`,
    login: () => `${base}/admin/auth`,
    getListUsers: () => `${base}/users/all`,
    addStation: () => `${base}/stations`,
    updateStation: (stationId: string) => `${base}/stations/${stationId}`,
    getStationDetails: (stationId: string) => `${base}/stations/${stationId}`,
    addTank: () => `${base}/stations/tanks`,
    addPool: () => `${base}/stations/pools`,
    updateTank: (tankId: string) => `${base}/stations/tanks/${tankId}`,
    updatePool: (poolId: string) => `${base}/stations/pools/${poolId}`,
    getListTransactions: () => `${base}/transactions`,
    getMe: () => `${base}/me`,
    getUserDetails: (userId: string) => `${base}/users/detail/${userId}`,
    getListVouchers: () => `${base}/promo/all`,
    getFuelPrices: () => `${base}/fuels/price`,
    getUserListTransactions: (userId: string) => `${base}/users/transactions/${userId}`,
    getListHistoryPrices: () => `${base}/fuelPrices`,
};

export default endpoints;