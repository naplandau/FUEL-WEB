import api from '../configs/api.config';
import endpoints from '../configs/endpoints.config';
import ResponseError from "../types/ResponseError.type";
import ResponseSuccess from '../types/ResponseSuccess.type';

const getFuelPriceApi = async () => {
    try {
        const res = await api.get(endpoints.getFuelPrices());
        const fuelPrice: ResponseSuccess = {
            code: res.status,
            data: res.data,
        };
        return fuelPrice;
    } catch (err) {
        const errorObj: ResponseError = {
            code: err.response.status,
            error: err.response.data.error,
        };
        return errorObj;
    }
}

export default getFuelPriceApi;