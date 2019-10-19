import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCryptData } from "../../Actions/coinAction";
import Moment from "react-moment";

class Details extends Component {
  componentDidMount() {
    this.props.getCryptData();
  }

  handleClickInfo() {
    const { onClickPrev } = this.props;

    onClickPrev();
  }

  render() {
    const { id } = this.props;

    let layout;

    let dummmies = this.props.coin.filter(detail => detail.id === id);

    dummmies.map(dummy => {
      let naira = dummy.total_supply * 361.0;

      let roundConv1 = +(Math.round(naira + "e+2") + "e-2");

      var parts = roundConv1.toString().split(".");

      let finalNaira =
        parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        (parts[1] ? "." + parts[1] : "");

      let roundConv = +Math.round(dummy.circulating_supply);
      layout = (
        <div>
          <h1 className="display-5 my-3">
            <span className="text-dark">Currency Name: {dummy.name} </span>
          </h1>
          <h3 className="mb-3">Currency Details</h3>
          <ul className="list-group">
            <li className="list-group-item">
              <span style={{ fontWeight: "bold" }}>Circulating Supply </span> :
              &nbsp;
              {roundConv}
            </li>
            <li className="list-group-item">
              {" "}
              <span style={{ fontWeight: "bold" }}>Date Added</span> :{" "}
              <Moment format="YYYY/MM/DD">{dummy.date_added}</Moment>
            </li>
            <li className="list-group-item">
              <span style={{ fontWeight: "bold" }}>
                Volume in the Last 24(h){" "}
              </span>{" "}
              : {dummy.quote.USD.volume_24h}{" "}
              <span style={{ fontWeight: "bold" }}>BTC</span>
            </li>
          </ul>

          <h4 className="my-3">Market Details</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <span style={{ fontWeight: "bold" }}> Market Cap </span>:{" "}
              {dummy.quote.USD.market_cap}{" "}
            </li>
            <li className="list-group-item">
              <span style={{ fontWeight: "bold" }}> Total Supply</span>:{" "}
              <b>N</b>&nbsp;
              {finalNaira}
            </li>
            <li className="list-group-item">
              {" "}
              <span style={{ fontWeight: "bold" }}>CMC RANK </span>:{" "}
              {dummy.cmc_rank}{" "}
            </li>
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

Details.propTypes = {
  getCryptData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  coin: state.coin.names
});

export default connect(
  mapStateToProps,
  { getCryptData }
)(Details);
