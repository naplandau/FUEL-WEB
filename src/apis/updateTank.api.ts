import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const updateTankApi = async (tankId: string, accessToken: string,
    data = {
        fuel_type: '',
        tank_position: 0,
    }) => {
    try {
        const res = await api.put(endpoints.updateTank(tankId), data, {
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

export default updateTankApi;