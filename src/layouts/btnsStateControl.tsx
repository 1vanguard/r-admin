import {
  useRefresh,
  useUpdate,
  useRecordContext,
  useResourceContext,
} from "react-admin";

import Button from "@mui/material/Button";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import BlockIcon from "@mui/icons-material/Block";
import CircleIcon from "@mui/icons-material/Circle";
import LinearProgress from "@mui/material/LinearProgress";

interface BtnsStateControlProps {
  style?: React.CSSProperties;
  iconSize?: string;
}

const BtnsStateControl: React.FC<BtnsStateControlProps> = ({
  style = {},
  iconSize = "1em",
}) => {
  const refresh = useRefresh();
  const resource = useResourceContext();
  const record = useRecordContext();

  let playPauseBtnColor = "default",
    playPauseIcon,
    startStopBtnColor = "default",
    startStopIcon,
    targetPlayPauseDisabled,
    targetPlayPauseState,
    targetPlayPauseText,
    targetStartStopDisabled,
    targetStartStopState,
    targetStartStopText;

  switch (record.state) {
    case -1:
      playPauseBtnColor = "inherit";
      playPauseIcon = <BlockIcon sx={{ fontSize: iconSize }} />;
      startStopBtnColor = "inherit";
      startStopIcon = <BlockIcon sx={{ fontSize: iconSize }} />;
      targetPlayPauseDisabled = true;
      targetPlayPauseState = 0;
      targetPlayPauseText = "-";
      targetStartStopDisabled = true;
      targetStartStopState = 0;
      targetStartStopText = "-";
      break;
    case 0:
      playPauseBtnColor = "inherit";
      playPauseIcon = <BlockIcon sx={{ fontSize: iconSize }} />;
      startStopBtnColor = "success";
      startStopIcon = <PlayArrowIcon sx={{ fontSize: iconSize }} />;
      targetPlayPauseDisabled = true;
      targetPlayPauseState = 0;
      targetPlayPauseText = "-";
      targetStartStopDisabled = false;
      targetStartStopState = 1;
      targetStartStopText = "Start";
      break;
    case 1:
      playPauseBtnColor = "warning";
      playPauseIcon = <PauseIcon sx={{ fontSize: iconSize }} />;
      startStopBtnColor = "error";
      startStopIcon = <StopIcon sx={{ fontSize: iconSize }} />;
      targetPlayPauseDisabled = false;
      targetPlayPauseState = 2;
      targetPlayPauseText = "Pause";
      targetStartStopDisabled = false;
      targetStartStopState = 0;
      targetStartStopText = "Stop";
      break;
    case 2:
      playPauseBtnColor = "success";
      playPauseIcon = <PlayArrowIcon sx={{ fontSize: iconSize }} />;
      startStopBtnColor = "error";
      startStopIcon = <StopIcon sx={{ fontSize: iconSize }} />;
      targetPlayPauseDisabled = false;
      targetPlayPauseState = 1;
      targetPlayPauseText = "Resume";
      targetStartStopDisabled = false;
      targetStartStopState = 0;
      targetStartStopText = "Stop";
      break;
    default:
      playPauseBtnColor = "inherit";
      playPauseIcon = <CircleIcon sx={{ fontSize: iconSize }} />;
      startStopBtnColor = "inherit";
      startStopIcon = <CircleIcon sx={{ fontSize: iconSize }} />;
      targetPlayPauseDisabled = true;
      targetPlayPauseState = 0;
      targetPlayPauseText = "-";
      targetStartStopDisabled = true;
      targetStartStopState = 0;
      targetStartStopText = "-";
  }

  const [
    updateStartStop,
    { isLoading: isLoadingStartStop, error: errorStartStop },
  ] = useUpdate();
  const [
    updatePlayPause,
    { isLoading: isLoadingPlayPause, error: errorPlayPause },
  ] = useUpdate();

  const handleClick = (action: string) => {
    const updateFunction =
      action === "startStop" ? updateStartStop : updatePlayPause;
    const state =
      action === "startStop" ? targetStartStopState : targetPlayPauseState;

    updateFunction(
      resource,
      {
        id: record.id,
        data: {
          id: record.id,
          state: state,
        },
        previousData: record,
      },
      {
        onSuccess: () => {
          console.log("onSuccess");
        },
        onError: (error) => {
          console.log("onError", error);
        },
        onSettled: (data, error) => {
          console.log("onSettled", data, error);
          refresh();
        },
      }
    );
  };

  if (isLoadingStartStop || isLoadingPlayPause) {
    return (
      <span style={style} className="btns_state_control isLoading">
        <LinearProgress />
      </span>
    );
  }
  if (errorStartStop || errorPlayPause) {
    return <p>ERROR</p>;
  }

  return (
    <span style={style} className="btns_state_control">
      <Button
        color={startStopBtnColor}
        variant="contained"
        disabled={targetStartStopDisabled}
        onClick={handleClick.bind(this, "startStop")}
      >
        {startStopIcon}
      </Button>
      <Button
        color={playPauseBtnColor}
        variant="contained"
        disabled={targetPlayPauseDisabled}
        onClick={handleClick.bind(this, "playPause")}
      >
        {playPauseIcon}
      </Button>
    </span>
  );
};

export default BtnsStateControl;
