import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toastError } from "@/components/toast"; // Fungsi toast untuk menampilkan pesan error
import { AUTH_TOKEN_KEY } from "@/lib/constanst"; // Pastikan impor key token yang benar

export const useCheckToken = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY); // Ambil token dari localStorage
        if (!token) {
            // Jika token tidak ditemukan atau expired
            toastError("Session expired. Please login again."); // Tampilkan pesan error
            dispatch({ type: "USER_LOGOUT" }); // Dispatch action logout untuk menghapus user dari Redux
            window.location.href = "/login"; // Redirect ke halaman login
        }
    }, [dispatch]);
};
