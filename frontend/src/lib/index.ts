import { LOCAL_STORAGE_KEY } from "./constanst";

export const getUser = () => {
    const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || 'null');
    const user = storedData?.data || null;
    return user && user.token ? user : null;
};
