import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getListHistoryPricesApi = async (accessToken: string) => {
    try {
        const res = await api.get(endpoints.getListHistoryPrices(), {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const historyPrices: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return historyPrices;
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

export default getListHistoryPricesApi;