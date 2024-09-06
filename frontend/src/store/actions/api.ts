import axios from "axios";
import { AUTH_TOKEN_KEY } from "@/lib/constanst";
import {jwtDecode} from "jwt-decode";

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return true;
    }
};

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);

        if (token && !isTokenExpired(token)) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.warn("Authorization token is missing or expired");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const backend = import.meta.env.VITE_API_URL;
export const cancelToken = axios.CancelToken;

export default instance;
