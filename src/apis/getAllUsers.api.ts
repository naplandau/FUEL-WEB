import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getAllUsersApi = async (accessToken: string) => {
    try {
        const res = await api.get(endpoints.getListUsers(), {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const allUsers: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return allUsers;
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

export default getAllUsersApi;