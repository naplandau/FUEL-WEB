type Price = {
    _id: string;
    fuels: [{
        fuel_name: string,
        price: number,
        update_at: Date,
        _id: string
    }];
    createdAt: number | string;
    updatedAt: number | string;
}

export default Price;