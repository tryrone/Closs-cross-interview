import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Papertable.css";

class PaperContent extends Component {
  handleCLickInfo() {
    const { onSelectId, id, totData } = this.props;
    onSelectId(id, totData);
  }
  render() {
    const { name, price, change, symbol } = this.props;

    let naira;

    naira = price * 361.0;

    let roundConv = +(Math.round(naira + "e+2") + "e-2");

    var parts = roundConv.toString().split(".");

    let finalNaira =
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      (parts[1] ? "." + parts[1] : "");

    return (
      <tr className="table-b" style={{ borderBottom: "1px solid #dee2e6" }}>
        <Link to={"/"} onClick={this.handleCLickInfo.bind(this)}>
          <td className="name" style={{ color: "rgb(5, 15, 25)" }}>
            {name}&nbsp;&nbsp;&nbsp;
            <span
              style={{
                lineHeight: "1.3",
                color: "rgba(17, 51, 83, 0.6)",
                fontSize: "18px",
                fontWeight: 400
              }}
            >
              {symbol}
            </span>
          </td>
        </Link>
        <td style={{ color: "rgb(5, 15, 25)" }}>NGN {finalNaira}</td>
        <td
          style={{
            color: Math.sign(change) < 0 ? "red" : "rgb(5, 177, 105)",
            minWidth: "76px",
            marginRight: "20px",
            textAlign: "left"
          }}
        >
          <span>{Math.sign(change) > 0 ? "+" : ""}</span>
          {+(Math.round(change + "e+2") + "e-2")}
        </td>
      </tr>
    );
  }
}

export default PaperContent;
