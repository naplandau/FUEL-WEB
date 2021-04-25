import api from '../configs/api.config';
import endpoints from "../configs/endpoints.config";
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const changeAccountAvatarApi = async (data: FormData, accessToken: string) => {
    try {
        const response = await api.patch(endpoints.changeAccountAvatar(), data, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
                message: error.response.data.error,
            }
        };

        return errorObj;
    }
};

export default changeAccountAvatarApi;
