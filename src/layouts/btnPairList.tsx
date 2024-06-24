import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";

interface BtnPairsListProps {
  botId: number;
  btnText?: string;
  style?: React.CSSProperties;
  useIcon?: boolean;
}

const BtnPairsList: React.FC<BtnPairsListProps> = (props) => {
  return (
    <Button
      className="btn_iconOnly"
      color="secondary"
      component={RouterLink}
      style={{...props.style}}
      sx={{ minWidth: 0 }}
      to={`/bots/${props.botId}/pairs`}
      variant="contained"
    >
      {props.btnText ? props.btnText : null}
      {props.useIcon === false ? null : <CandlestickChartIcon sx={{ fontSize: "1em" }} />}
    </Button>
  );
};

export default BtnPairsList;
