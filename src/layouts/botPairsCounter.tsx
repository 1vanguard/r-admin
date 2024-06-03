import * as React from "react";

interface BotPairsCounterProps {
  bot: any;
  pairs: any[];
}

const BotPairsCounter: React.FC<BotPairsCounterProps> = (props) => {
  const botAutoPairCount = props.bot.auto_pair_count;
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
  const botAutoPairCountStyles = {
    textAlign: "right",
    width: "35%",
  };
  const acvtivePairsStyles = {
    color:
      botAutoPairCount > 0
        ? pairsWithState1Count > botAutoPairCount
          ? "red"
          : "green"
        : "black",
    fontWeight: botAutoPairCount > 0 ? "bold" : "normal",
    textAlign: "left",
    width: "35%",
  };

  return (
    <span style={counterStyles}>
      <span style={botAutoPairCountStyles}>{botAutoPairCount}</span>
      <span style={counterDividerStyles}>/</span>
      <span style={acvtivePairsStyles}>{pairsWithState1Count}</span>
    </span>
  );
};

export default BotPairsCounter;
