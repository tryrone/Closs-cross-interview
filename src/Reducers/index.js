import { combineReducers } from "redux";
import coinReducer from "./coinReducer";

// export default combineReducers({
//   coin: coinReducer
// });
const rootReducer = combineReducers({
  coin: coinReducer
});

export default rootReducer;
