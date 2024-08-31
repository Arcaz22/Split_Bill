import { combineReducers } from "redux";
import { registerReducer } from "./auth/register";

const rootReducer = combineReducers({
    register: registerReducer,
  });

  export default rootReducer;
