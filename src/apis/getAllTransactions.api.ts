import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getAllTransactionsApi = async (accessToken: string) => {
    try {
        const res = await api.get(endpoints.getListTransactions(), {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const allTransactions: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return allTransactions;
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

export default getAllTransactionsApi;