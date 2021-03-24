type Voucher = {
    _id: string;
    owner: {
        isUser: boolean,
        id: string,
        email: string,
        phoneNumber: string,
    },
    donator: {
        id: string,
        phoneNumber: string
    },
    type: number,
    amountValue: number,
    fuelAmount: number,
    fuelType: string,
    bannerImg: string,
    isGiveAway: boolean,
    status: number,
    isOn: boolean,
    isExpireTime: boolean,
    expireTime: Date,
    condition: {
        stationId: Array<string>
    },
    signature: string,
    createdAt: string | number;
}

export default Voucher;