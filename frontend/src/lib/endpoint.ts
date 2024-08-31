const BASE_URL = import.meta.env.VITE_API_URL;

export const API_ROUTES = {
    AUTH: {
        REGISTER: `${BASE_URL}/auth/register`,
        LOGIN: `${BASE_URL}/auth/login`,
        LOGOUT: `${BASE_URL}/auth/logout`,
    },
};
