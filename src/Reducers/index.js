import { combineReducers } from "redux";
import coinReducer from "./coinReducer";

const rootReducer = combineReducers({
  coin: coinReducer
});

export default rootReducer;
