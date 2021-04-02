import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';
import AddEditPool from '../types/AddEditPool.type';

const addPoolApi = async (accessToken: string, credentials: AddEditPool) => {
    try {
        const res = await api.post(endpoints.addPool(), credentials, {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const pool: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return pool;
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

export default addPoolApi;