import axios from "axios";

import {
  GET_CURRENT_COIN_DATA,
  GET_ERRORS,
  FETCH_TODOS_REQUEST
} from "./types";

// GET Cryptocurrency Data

const requestOptions = {
  qs: {
    start: "1",
    limit: "1",
    convert: "USD,BTC",
    sort: "percent_change_1h"
  },
  headers: {
    "X-CMC_PRO_API_KEY": "6fde424d-05f4-4573-9a18-e7df799ae0e2"
  },
  json: true,
  gzip: true
};

export function fetchTodosRequest() {
  return {
    type: FETCH_TODOS_REQUEST
  };
}

export function getCryptData() {
  return dispatch => {
    dispatch(fetchTodosRequest());
    return axios
      .get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
        requestOptions
      )
      .then(response => {
        dispatch({
          type: GET_CURRENT_COIN_DATA,
          payload: response.data.data
        });
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
}
