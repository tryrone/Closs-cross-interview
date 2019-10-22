import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import * as actions from "../Actions/coinAction";
//import { getCryptData } from "../Actions/coinAction";
import * as types from "../Actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("it should handle getting cryptocurrency data from API", () => {
    fetchMock.getOnce("/latest", {
      body: { types: types.GET_CURRENT_COIN_DATA },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: types.GET_CURRENT_COIN_DATA, body: { names: ["do something"] } }
    ];
    const store = mockStore({ names: [] });

    return actions
      .getCryptData()
      .then(res => {
        expect(store.getActions().toEqual(expectedActions));
      })
      .catch(err => {
        return undefined;
      });
  });
});
