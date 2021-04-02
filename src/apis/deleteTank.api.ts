import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const deleteTankApi = async (tankId: string, accessToken: string) => {
    try {
        const res = await api.delete(endpoints.deleteTank(tankId), {
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

export default deleteTankApi;