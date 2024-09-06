import { combineReducers } from "redux";
import { registerReducer } from "./auth/register";
import { loginReducer } from "./auth/login";
import { profileReducer } from "./user/profil";
import { changePasswordReducer } from "./user/change-password";

const rootReducer = combineReducers({
    register: registerReducer,
    login: loginReducer,
    logout: loginReducer,
    profile: profileReducer,
    changePassword: changePasswordReducer
  });

  export default rootReducer;
