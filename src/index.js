import React from "react";
import ReactDOM from "react-dom";
import BarChartContainer from "./BarChartContainer";
import "./style.css";

const App = () => {
  return <BarChartContainer />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
