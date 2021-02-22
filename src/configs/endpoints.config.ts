const base: string = 'http://localhost:8080/api';

const endpoints = {
    base: base,
    getListStations: () => `${base}/stations`,
    deleteStation: (stationId: string) => `${base}/stations/${stationId}`,
    login: () => `${base}/users/auth`,
    getListUsers: () => `${base}/users/detail`,
};

export default endpoints;