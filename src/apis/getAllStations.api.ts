import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getAllStationsApi = async (accessToken: string) => {
    try {
        const res = await api.get(endpoints.getListStations(), {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const allStations: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return allStations;
    } catch (err) {
        const errorObj: ResponseError = {
            data: {
                code: err.response.status,
                message: err.response.data.error,
            }
        };
        return errorObj;
    }
}

export default getAllStationsApi;