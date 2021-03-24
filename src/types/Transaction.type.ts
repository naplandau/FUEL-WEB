type TransactionDetails = {
    _id: string;
    status: number;
    userId: string;
    userInfo: {
        phoneNumber: string;
        email: string;
    };
    type: string;
    qrData: Object;
    data: {
        station: {
            data: {
                id: string;
                name: string;
                address: string;
                tank_id: string;
                fuel_type: string;
            }
        };
    }
    isComplete: boolean;
    amount: {
        payAmount: number;
        originalFuelAmount: number;
        fuelAmount: number;
        remainFuelAmount: number;
        isRefund: boolean;
        refundAmount: number;
    };
    payInfo: Object;
    payHistory: Array<string>;
    createdAt: number | string;
    updatedAt: number | string;
};

export default TransactionDetails;