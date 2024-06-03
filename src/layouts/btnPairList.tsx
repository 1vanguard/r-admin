import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";

interface BtnPairsListProps {
  botId: number;
  btnText?: string;
  useIcon?: boolean;
}

const BtnPairsList: React.FC<BtnPairsListProps> = (props) => {
  return (
    <Button
      component={RouterLink}
      color="secondary"
      className="btn_iconOnly"
      variant="contained"
      sx={{ minWidth: 0 }}
      to={`/bots/${props.botId}/pairs`}
    >
      {props.btnText ? props.btnText : null}
      {props.useIcon === false ? null : <CandlestickChartIcon sx={{ fontSize: "1em" }} />}
    </Button>
  );
};

export default BtnPairsList;
