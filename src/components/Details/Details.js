import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      details: []
    };
  }
  componentDidMount() {
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

    axios
      .get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
        requestOptions
      )
      .then(response => {
        const names = response.data.data;

        this.setState({ details: names });
      })
      .catch(err => {
        console.log("API call error:", err.message);
      });
  }

  handleClickInfo() {
    const { onClickPrev } = this.props;

    onClickPrev();
  }

  render() {
    const { id } = this.props;

    let layout;

    let dummmies = this.state.details.filter(detail => detail.id === id);

    console.log(dummmies);

    dummmies.map(dummy => {
      layout = (
        <div>
          <h1 className="display-4 my-3">
            <span className="text-dark">Currency Name: {dummy.name} </span>
          </h1>
          <h3 className="mb-3">Currency Details</h3>
          <ul className="list-group">
            <li className="list-group-item">
              Circulating Supply : {dummy.circulating_supply}
            </li>
            <li className="list-group-item">Data Added : {dummy.date_added}</li>
            <li className="list-group-item">
              Volume in the Last 24(h) : {dummy.quote.USD.volume_24h}{" "}
            </li>
          </ul>

          <h4 className="my-3">Market Details</h4>
          <ul className="list-group">
            <li className="list-group-item">
              Market Cap: {dummy.quote.USD.market_cap}{" "}
            </li>
            <li className="list-group-item">
              Total Supply: {dummy.total_supply}
            </li>
            <li className="list-group-item">CMC RANK: {dummy.cmc_rank} </li>
          </ul>
          <hr />
          <Link
            to="/"
            className="btn btn-primary"
            style={{ marginBottom: "2rem" }}
            onClick={this.handleClickInfo.bind(this)}
          >
            {" "}
            Back
          </Link>
        </div>
      );
      return dummy;
    });

    return <div>{layout}</div>;
  }
}

export default Details;
