const base: string = 'http://localhost:8080/api';

const endpoints = {
    base: base,
    getListStations: () => `${base}/stations`,
    deleteStation: (stationId: string) => `${base}/stations/${stationId}`,
    login: () => `${base}/admin/auth`,
    getListUsers: () => `${base}/users/detail`,
    addStation: () => `${base}/stations`,
    updateStation: (stationId: string) => `${base}/stations/${stationId}`,
};

export default endpoints;