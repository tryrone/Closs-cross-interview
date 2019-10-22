import reducers from "../Reducers/coinReducer";
import * as actions from "../Actions/coinAction";
import * as types from "../Actions/types";

const initialState = {
  names: []
};

describe("actions", () => {
  it("should  return the initial state", () => {
    console.log(reducers);
  });
});
