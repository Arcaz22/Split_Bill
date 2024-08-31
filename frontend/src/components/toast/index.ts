import { ApiError } from "@/lib/interface/api-interface";
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastError = (error: unknown, msg: string = "", opt?: ToastOptions) => {
  let errMessage = "";

  if (typeof error === 'object' && error !== null && 'response' in error) {
    const apiError = error as ApiError;
    if (apiError.response && apiError.response.status === 500) {
      errMessage = apiError.response.data.message;
    }
  } else if (typeof error === 'string') {
    errMessage = error;
  } else {
    errMessage = String(error);
  }

  return toast(msg + errMessage, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    type: `error`,
    ...opt
  });
};

export const toastSuccess = (msg: string, opt?: ToastOptions) => {
  return toast(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    type: `success`,
    ...opt
  });
};

export const toastWarning = (msg: string, opt?: ToastOptions) => {
  return toast(msg, {
    position: "top-right",
    autoClose: 1800,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    type: `warning`,
    ...opt
  });
};
