import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const deleteStationApi = async (stationId: string) => {
    try {
        const res = await api.delete(endpoints.deleteStation(stationId));
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

export default deleteStationApi;