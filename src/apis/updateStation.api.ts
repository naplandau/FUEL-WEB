import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const updateStationApi = async (stationId: string, accessToken: string,
    data = {
        name: '',
        address: '',
        description: '',
        long: 0,
        lat: 0,
        working_hour_from: '',
        working_hour_to: ''
    }) => {
    try {
        const res = await api.put(endpoints.updateStation(stationId), data, {
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

export default updateStationApi;