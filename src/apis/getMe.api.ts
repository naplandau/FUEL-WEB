import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getMeApi = async (accessToken: string) => {
    try {
        const res = await api.get(endpoints.getMe(), {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const me: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return me;
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

export default getMeApi;