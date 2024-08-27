import { addToBlacklist } from "../../utils/blacklist";

export const Logout = async (token: string) => {
    addToBlacklist(token);
};
