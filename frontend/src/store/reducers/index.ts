import { combineReducers } from "redux";
import { registerReducer } from "./auth/register";
import { loginReducer } from "./auth/login";

const rootReducer = combineReducers({
    register: registerReducer,
    login: loginReducer,
    logout: loginReducer
  });

  export default rootReducer;
