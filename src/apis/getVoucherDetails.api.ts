import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getVoucherDetailsApi = async (accessToken: string, voucherId: string) => {
    try {
        const res = await api.get(endpoints.getVoucherDetails(voucherId), {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const voucher: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return voucher;
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

export default getVoucherDetailsApi;