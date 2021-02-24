type User = {
    _id: string
    email: string;
    phoneNumber: string;
    name: string;
    role: 0 | 1;
    status: number;
    userName: string;
};

export default User;