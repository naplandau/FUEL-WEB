import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

type credentials = {
    userId: string;
    refreshToken: string;
}

const getAccessTokenApi = async (data: credentials) => {
    try {
        const response = await api.post(endpoints.getAccessToken(), data);
        const accessToken: ResponseSuccess = {
            code: response.status,
            data: response.data,
        };
        return accessToken;
    }
    catch (error) {
        const errorObj: ResponseError = {
            data: {
                code: error.response.status,
                message: error.response.data.error
            }
        };

        return errorObj;
    }
};

export default getAccessTokenApi;
