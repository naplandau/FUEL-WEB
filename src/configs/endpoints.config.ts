const base: string = 'http://localhost:3000/api';

const endpoints = {
    base: base,
    getListStation: () => `${base}/stations`,
};

export default endpoints;