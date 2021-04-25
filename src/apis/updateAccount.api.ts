import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

export type UpdateAccountBody = {
    email?: string;
    name?: string;
    currentPassword?: string;
    password?: string;
};

const UpdateAccountApi = async (updateBody: UpdateAccountBody, accessToken: string) => {
    try {
        const response = await api.put(endpoints.updateAccount(), updateBody, {
            headers: {
                'authorization': "Bearer " + accessToken,
            }
        });
        const responseUser: ResponseSuccess = {
            code: response.status,
            data: response.data,
        };
        return responseUser;
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

export default UpdateAccountApi;
