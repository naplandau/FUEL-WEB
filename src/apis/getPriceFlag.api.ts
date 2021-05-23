import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getPriceFlagApi = async (accessToken: string) => {
    try {
        const res = await api.get(endpoints.getPriceFlag(), {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const PriceFlag: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return PriceFlag;
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

export default getPriceFlagApi;