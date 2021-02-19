type StationDetails = {
    _id: string;
    isActive: boolean;
    description: string;
    total_tank: number;
    available_tanks: number;
    name: number;
    address: number;
    long: number;
    lat: number;
    working_hour_from: string;
    working_hour_to: string;
    tank: {
        _id: string;
        station_id: string;
        tank_position: number;
        fuel_type: string;
    };
    pool: {
        _id: string;
        fuel_amount: number;
        type_name: string;
    };
    createdAt: number | string;
    updatedAt: number | string;
}

export default StationDetails;