import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

export type LoginBody = {
    phoneNumber: string;
    password: string;
    otpCode: string;
};

const LoginApi = async (credentials: LoginBody) => {
    try {
        const response = await api.post(endpoints.login(), credentials);
        const responseUser: ResponseSuccess = {
            code: response.status,
            data: response.data
        };
        return responseUser;
    } catch (error) {
        const errObj: ResponseError = {
            code: error.response.status,
            error: error.response.data.error,
        }
        return errObj;
    }
}

export default LoginApi;