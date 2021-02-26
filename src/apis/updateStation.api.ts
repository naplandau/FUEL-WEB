import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';
import AddEditStation from '../types/AddEditStation.type';

const updateStationApi = async (stationId: string, accessToken: string, data: AddEditStation) => {
    try {
        const res = await api.patch(endpoints.updateStation(stationId), data, {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const station: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return station;
    } catch (err) {
        const errorObj: ResponseError = {
            code: err.response.status,
            error: err.response.data.error,
        };
        return errorObj;
    }
}

export default updateStationApi;