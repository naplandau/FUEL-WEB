import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getUserVouchersApi = async (accessToken: string, userId: string) => {
    try {
        const res = await api.get(endpoints.getUserListVouchers(userId), {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const allVouchers: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return allVouchers;
    } catch (err) {
        const errorObj: ResponseError = {
            data: {
                code: err.response.status,
                message: err.response.data.error
            }
        };
        return errorObj;
    }
}

export default getUserVouchersApi;