import React from "react";
import { useGetOne } from "react-admin";
import { State } from "../types";

import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import LinearProgress from "@mui/material/LinearProgress";

interface StateIconProps {
  record: any;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const StateIcon: React.FC<StateIconProps> = ({ record }) => {
  const {
    data: stateData,
    isLoading: isStateLoading,
    error: stateError,
  } = useGetOne<State>("states", { id: record.state });

  if (isStateLoading) return <LinearProgress />;
  if (stateError) return <div>ERROR</div>;

  const stateName = stateData?.name;
  const stateNameCapitalize = capitalizeFirstLetter(stateName || "");

  let stateColor,
    stateText = "";

  switch (record.state) {
    case -1:
      stateColor = "disabled";
      stateText = "Deleted";
      break;
    case 0:
      stateColor = "error";
      stateText = "Inactive";
      break;
    case 1:
      stateColor = "success";
      stateText = "Active";
      break;
    case 2:
      stateColor = "warning";
      stateText = "Paused";
      break;
    default:
      stateColor = "disabled";
      stateText = "Disabled";
      break;
  }

  return (
    <Tooltip
      arrow
      leaveDelay={200}
      placement="top"
      title={stateNameCapitalize}
      style={{ textAlign: "center" }}
    >
      <CircleIcon color={stateColor} sx={{ fontSize: "0.9em" }} />
    </Tooltip>
  );
};

export default StateIcon;
