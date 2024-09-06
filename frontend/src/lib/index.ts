import { jwtDecode } from "jwt-decode";
import { AUTH_TOKEN_KEY } from "./constanst";
interface JwtPayload {
  exp: number;
}

export const getToken = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);

            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                localStorage.removeItem(AUTH_TOKEN_KEY);
                return null;
            }

            return token;
        } catch {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            return null;
        }
    }

    return null;
};

export const getUser = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const userData = JSON.parse(atob(token.split('.')[1]));
        return userData;
    } catch {
        return null;
    }
};
