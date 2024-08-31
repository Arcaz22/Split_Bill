import { LOCAL_STORAGE_KEY } from "./constanst";

export const getUser = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(data) {
        const user = JSON.parse(data);
        return user;
    } else return null;
}
