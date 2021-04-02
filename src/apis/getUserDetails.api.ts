import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getUserDetailsApi = async (accessToken: string, userId: string) => {
    try {
        const res = await api.get(endpoints.getUserDetails(userId), {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const user: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return user;
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

export default getUserDetailsApi;