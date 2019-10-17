import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PaperTable from "../PaperTable/PaperTable";
import Details from "../Details/Details";
import Header from "../Header/Header";

function Main() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Header} />
        <Route exact path="/" component={PaperTable} />
        <Route exact path="/details" component={Details} />
      </div>
    </Router>
  );
}

export default Main;
