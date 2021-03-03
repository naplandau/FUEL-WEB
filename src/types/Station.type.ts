type StationDetails = {
    isActive: boolean;
    description: string;
    total_tank: number;
    available_tanks: number;
    _id: string;
    name: string;
    address: string;
    long: number;
    lat: number;
    working_hour_from: string;
    working_hour_to: string;
    tanks: [{
        _id: string;
        station_id: string;
        tank_position: number;
        fuel_type: string;
        isActive: boolean;
    }];
    pools: [{
        _id: string;
        fuel_amount: number;
        type_name: string;
    }];
    createdAt: number | string;
    updatedAt: number | string;
}

export default StationDetails;