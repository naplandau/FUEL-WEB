import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

export type Data = {
    flag: string
}

const changePriceFlagApi = async (data: Data, accessToken: string) => {
    try {
        const response = await api.put(endpoints.updatePriceFlag(), data, {
            headers: {
                'authorization': "Bearer " + accessToken,
            }
        });

        const changePriceFlag: ResponseSuccess = {
            code: response.status,
            data: response.data,
        };
        return changePriceFlag;
    }
    catch (error) {
        const errorObj: ResponseError = {
            data: {
                code: error.response.status,
                message: error.response.data.error,
            }
        };

        return errorObj;
    }
};

export default changePriceFlagApi;
