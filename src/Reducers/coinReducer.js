import { GET_CURRENT_COIN_DATA, GET_ERRORS } from "../Actions/types";

const initialState = {
  names: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_COIN_DATA:
      return {
        ...state,
        names: action.payload
      };

    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
