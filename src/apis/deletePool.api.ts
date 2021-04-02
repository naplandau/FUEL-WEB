import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const deletePoolApi = async (PoolId: string, accessToken: string) => {
    try {
        const res = await api.delete(endpoints.deletePool(PoolId), {
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

export default deletePoolApi;