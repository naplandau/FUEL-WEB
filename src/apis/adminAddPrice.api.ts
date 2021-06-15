import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

export type AddPrice = {
    fuels: Object
};

const addPriceApi = async (accessToken: string, credentials: AddPrice) => {
    try {
        const res = await api.post(endpoints.adminAddPrice(), credentials, {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const price: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return price;
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

export default addPriceApi;