import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const updatePoolApi = async (poolId: string, accessToken: string,
    data = {
        type_name: '',
        fuel_amount: 0,
    }) => {
    try {
        const res = await api.patch(endpoints.updatePool(poolId), data, {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        console.log(res);
        const pool: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return pool;
    } catch (err) {
        const errorObj: ResponseError = {
            code: err.response.status,
            error: err.response.data.error,
        };
        return errorObj;
    }
}

export default updatePoolApi;