import * as React from "react";

const BotPairsCounter = (props) => {
  const allPairsCount = props.pairs.length;
  const pairsWithState1Count = props.pairs.filter(
    (pair) => pair.state === 1
  ).length;
  const counterStyles = {
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
    width: "100%",
    whiteSpace: "nowrap",
  };
  const counterDividerStyles = {
    padding: "0 0.2em",
    textAlign: "center",
    width: "30%",
  };
  const allPairsCountStyles = {
    textAlign: "right",
    width: "35%",
  };
  const acvtivePairsStyles = {
    color:
      allPairsCount > 0
        ? pairsWithState1Count > allPairsCount
          ? "red"
          : "green"
        : "black",
    fontWeight: allPairsCount > 0 ? "bold" : "normal",
    textAlign: "left",
    width: "35%",
  };

  return (
    <span style={counterStyles}>
      <span style={allPairsCountStyles}>{allPairsCount}</span>
      <span style={counterDividerStyles}>/</span>
      <span style={acvtivePairsStyles}>{pairsWithState1Count}</span>
    </span>
  );
};

export default BotPairsCounter;
