import axios from "axios";
import { LOCAL_STORAGE_KEY } from "@/lib/constanst";

const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || 'null');

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Authorization: `Bearer ${user?.token || ""}` },
});

export const backend = import.meta.env.VITE_API_URL;
export const cancelToken = axios.CancelToken;

export default instance;
