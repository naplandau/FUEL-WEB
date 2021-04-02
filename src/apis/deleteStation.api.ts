import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const deleteStationApi = async (stationId: string, accessToken: string) => {
    try {
        const res = await api.delete(endpoints.deleteStation(stationId), {
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
            data: {
                code: err.response.status,
                message: err.response.data.error,
            }
        };
        return errorObj;
    }
}

export default deleteStationApi;