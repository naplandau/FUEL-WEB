import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getAllVouchersApi = async (accessToken: string) => {
    try {
        const res = await api.get(endpoints.getListVouchers(), {
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
            code: err.response.status,
            error: err.response.data.error,
        };
        return errorObj;
    }
}

export default getAllVouchersApi;