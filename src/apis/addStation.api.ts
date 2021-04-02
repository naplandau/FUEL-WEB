import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';
import AddEditStation from '../types/AddEditStation.type';

const addStationApi = async (accessToken: string, credentials: AddEditStation) => {
    try {
        const res = await api.post(endpoints.addStation(), credentials, {
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

export default addStationApi;