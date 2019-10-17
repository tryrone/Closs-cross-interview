import React, { Component } from "react";
import axios from "axios";
import "./Papertable.css";
import classnames from "classnames";
import PaperContent from "./PaperContent";
import Details from "../Details/Details";
import loader from "../../Dual Ring-0.8s-168px.gif";

class PaperTable extends Component {
  constructor() {
    super();
    this.state = {
      curNames: [],
      detailsId: "",
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

        this.setState({ curNames: names });
      })
      .catch(err => {
        console.log("API call error:", err.message);
      });
  }

  handleDetails(idValue, totDetails) {
    this.setState({ detailsId: idValue });
    this.setState({ details: totDetails });
    console.log(this.state.detailsId);
  }

  handlePrev() {
    this.setState({ detailsId: "" });
  }
  render() {
    let loading;
    if (
      this.state.curNames === null ||
      Object.keys(this.state.curNames).length === 0
    ) {
      loading = (
        <img src={loader} alt="loading..." style={{ alignSelf: "center" }} />
      );
    }
    console.log(this.state.curNames);
    return (
      <div>
        <div className="container">
          <div
            className={classnames("paper", {
              hide: this.state.detailsId
            })}
          >
            <div className="backdrop">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th
                      scope="col"
                      style={{
                        minWidth: "76px",
                        marginRight: "20px"
                      }}
                    >
                      Price
                    </th>
                    <th scope="col">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <span className="load">{loading}</span>
                  {this.state.curNames.map(curName => (
                    <PaperContent
                      totData={curName}
                      id={curName.id}
                      key={curName.cmc_rank}
                      symbol={curName.symbol}
                      name={curName.name}
                      price={curName.quote.USD.price}
                      change={curName.quote.USD.percent_change_1h}
                      onSelectId={this.handleDetails.bind(this)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className={classnames("hide", {
              show: this.state.detailsId
            })}
          >
            <Details
              id={this.state.detailsId}
              onClickPrev={this.handlePrev.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PaperTable;
