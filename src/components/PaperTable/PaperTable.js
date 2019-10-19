import React, { Component } from "react";
//import axios from "axios";
import "./Papertable.css";
import classnames from "classnames";
import PaperContent from "./PaperContent";
import Details from "../Details/Details";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCryptData } from "../../Actions/coinAction";
import loader from "../../Dual Ring-0.8s-168px.gif";

class PaperTable extends Component {
  constructor() {
    super();
    this.state = {
      detailsId: "",
      details: []
    };
  }

  componentDidMount() {
    this.props.getCryptData();
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

    if (this.props.coin === null || Object.keys(this.props.coin).length === 0) {
      loading = (
        <img src={loader} alt="loading..." style={{ alignSelf: "center" }} />
      );
    }

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
                  {this.props.coin.map(curName => (
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

PaperTable.propTypes = {
  getCryptData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  coin: state.coin.names
});

export default connect(
  mapStateToProps,
  { getCryptData }
)(PaperTable);

// export default PaperTable;
