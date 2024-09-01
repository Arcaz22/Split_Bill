import { LOCAL_STORAGE_KEY } from "./constanst";

export const getUser = () => {
    const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || 'null');
    return storedData && storedData.token ? storedData : null;
};
