const BASE_URL = import.meta.env.VITE_API_URL;

export const API_ROUTES = {
    AUTH: {
        REGISTER: `${BASE_URL}/auth/register`,
        LOGIN: `${BASE_URL}/auth/login`,
        LOGOUT: `${BASE_URL}/auth/logout`,
    },
    USER: {
        PROFILE: `${BASE_URL}/user/`,
        UPLOAD_AVATAR: "/user/avatar/upload",
        UPDATE_PROFILE: `${BASE_URL}/user/profile`,
        CHANGE_PASSWORD: `${BASE_URL}/user/change-password`
    },
};
