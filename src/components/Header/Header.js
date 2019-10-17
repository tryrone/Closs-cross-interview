import React from "react";
import "../mainPage/main.css";

export default function Header() {
  return (
    <div className="home-back-drop">
      <nav>
        <h2 className="info">coin-data</h2>
        <div className="hero-container">
          <span className="hero-text">Buy and sell cryptocurrency</span>
          <h4 className="hero-mini">
            Coin-data is the easiest place to manage your cryptocurrency
            portfolio, with all the information we provide.
          </h4>
        </div>
      </nav>
    </div>
  );
}
