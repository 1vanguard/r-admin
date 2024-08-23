import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";

interface BtnPairsListProps {
  botId: number;
  btnText?: string;
  style?: React.CSSProperties;
  type?: string;
  useIcon?: boolean;
}

const BtnPairsList: React.FC<BtnPairsListProps> = (props) => {
  let pairsType = 'pairs'
  switch (props.type) {
    case "bot":
      pairsType = 'pairs'
      break;
    case "fbot":
      pairsType = 'fpairs'
      break;
    default:
      pairsType = 'pairs'
  }
  const btnURL = `/${props.type}s/${props.botId}/${pairsType}`;
  return (
    <Button
      className="btn_iconOnly"
      color="secondary"
      component={RouterLink}
      style={{...props.style}}
      sx={{ minWidth: 0 }}
      to={btnURL}
      variant="contained"
    >
      {props.btnText ? props.btnText : null}
      {props.useIcon === false ? null : <CandlestickChartIcon sx={{ fontSize: "1em" }} />}
    </Button>
  );
};

export default BtnPairsList;
