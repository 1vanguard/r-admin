import React from "react";
import { EditButton } from "react-admin";

import { Bot, BotPair } from "../types";
import BtnPairsList from "../layouts/btnPairList";
import BtnsStateControl from "../layouts/btnsStateControl";

import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import LinearProgress from "@mui/material/LinearProgress";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";

type ItemStateControlBarProps = {
  record: Bot | BotPair;
};

const ItemApiIcon = ({ record }: ItemStateControlBarProps) => {
  if ("api_ready" in record){
    return (
      <Tooltip
        arrow
        leaveDelay={200}
        placement="top"
        title={
          "api_ready" in record
            ? record.api_ready !== 1
              ? "API Not Ready"
              : "API Ready"
            : "No API Data"
        }
        style={{ textAlign: "center" }}
      >
        {"api_ready" in record ? (
          record.api_ready !== 1 ? (
            <KeyOffIcon style={{ color: "red", fontSize: "1.1em", marginRight: "5px" }} />
          ) : (
            <KeyIcon style={{ color: "green", fontSize: "1.1em", marginRight: "5px" }} />
          )
        ) : (
          <></>
        )}
      </Tooltip>
    )
  } else {
    return null
  }
}

const ItemStateControlBar = ({ record }: ItemStateControlBarProps) => {
  const botApiIcon = <ItemApiIcon record={record} />;

  if (
    record.pause_until &&
    new Date(record.pause_until).getTime() > new Date().getTime() &&
    record.state === 2
  ) {
  }
  const pauseUntil = (
    <span style={{ fontSize: "0.8em" }}>
      <span style={{ fontWeight: "700", marginRight: "5px" }}>
        Pause until:
      </span>
      {record.pause_until && new Date(record.pause_until).toLocaleString()}
    </span>
  );

  return (
    <div>
      <span style={{ display: "flex", alignItems: "center" }}>
        {"api_ready" in record && botApiIcon}
        <span style={{ marginRight: "0.7em" }}>{record.title}</span>
        <span
          style={{
            marginRight: "0.7em",
            alignItems: "center",
            display: "flex",
            marginLeft: "auto",
          }}
        >
          {"api_ready" in record &&
          "exchange_id" in record &&
          (record.api_ready !== 1 || record.exchange_id === 0) ? (
            <span
              style={{
                color: "red",
                display: "inline-flex",
                flexDirection: "column",
                fontSize: "0.8em",
                marginRight: "0.5em",
                textAlign: "center",
              }}
            >
              {record.api_ready !== 1 ? (
                <span style={{ display: "inline-block" }}>API not ready</span>
              ) : (
                ""
              )}
              {record.exchange_id === 0 ? (
                <span style={{ display: "inline-block" }}>
                  Exchange not set
                </span>
              ) : (
                ""
              )}
            </span>
          ) : (
            <BtnsStateControl style={{ marginRight: "0.7rem" }} />
          )}
          <BtnPairsList botId={record.id} />
          <EditButton
            label=""
            color="inherit"
            variant="contained"
            className="btn_iconOnly"
            style={{ marginLeft: "0.3em", minWidth: "0" }}
            icon={<SettingsIcon style={{ fontSize: "1em" }} />}
          />
        </span>
        {record.pause_until &&
          new Date(record.pause_until).getTime() > new Date().getTime() &&
          record.state === 2 &&
          pauseUntil}
      </span>
    </div>
  );
};

export default ItemStateControlBar;
