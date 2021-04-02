import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';
import AddEditTank from '../types/AddEditTank.type';

const addTankApi = async (accessToken: string, credentials: AddEditTank) => {
    try {
        const res = await api.post(endpoints.addTank(), credentials, {
            headers: {
                'authorization': "Bearer " + accessToken,
            },
        });
        const tank: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return tank;
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

export default addTankApi;