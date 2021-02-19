import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getAllStationsApi = async () => {
    try {
        const res = await api.get(endpoints.getListStations());
        const allStations: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return allStations;
    } catch (err) {
        const errorObj: ResponseError = {
            code: err.response.status,
            error: err.response.data.error,
        };
        return errorObj;
    }
}

export default getAllStationsApi;