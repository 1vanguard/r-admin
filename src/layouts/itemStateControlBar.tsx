import React from "react";
import { EditButton } from "react-admin";

import { Bot, BotPair } from "../types";
import BtnPairsList from "../layouts/btnPairList";
import BtnsStateControl from "../layouts/btnsStateControl";

import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";

type ItemStateControlBarProps = {
  record: Bot | BotPair;
};

interface ItemApiIconProps {
  isBot: boolean;
  apiReady: any;
}

const ItemApiIcon: React.FC<ItemApiIconProps> = ({ isBot, apiReady }) => {
  if (isBot) {
    return (
      <Tooltip
        arrow
        leaveDelay={200}
        placement="top"
        title={
          isBot
            ? apiReady !== 1
              ? "API Not Ready"
              : "API Ready"
            : "No API Data"
        }
        style={{ textAlign: "center" }}
      >
        {isBot ? (
          apiReady !== 1 ? (
            <KeyOffIcon
              style={{ color: "red", fontSize: "1.1em", marginRight: "5px" }}
            />
          ) : (
            <KeyIcon
              style={{ color: "green", fontSize: "1.1em", marginRight: "5px" }}
            />
          )
        ) : (
          <></>
        )}
      </Tooltip>
    );
  } else {
    return null;
  }
};

const PauseUntil = (pauseUntil: string) => {
  return (
    <span style={{ fontSize: "0.8em" }}>
      <span style={{ fontWeight: "700", marginRight: "5px" }}>
        Pause until:
      </span>
      {new Date(pauseUntil).toLocaleString()}
    </span>
  );
};

const ItemStateControlBar = ({ record }: ItemStateControlBarProps) => {
  const itemBot = "api_ready" in record ? true : false,
    botApiIcon = <ItemApiIcon isBot={itemBot} apiReady={record.api_ready} />,
    itemPair = "bot_id" in record ? false : true;

  return (
    <span style={{ display: "flex", alignItems: "center" }}>
      {itemBot && botApiIcon}
      <span style={{ marginRight: "0.7em" }}>
        {itemBot ? record.title : record.symbol}
      </span>
      <span
        style={{
          alignItems: "center",
          display: "flex",
          marginLeft: "auto",
        }}
      >
        {itemBot && (record.api_ready !== 1 || record.exchange_id === 0) ? (
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
            {record.api_ready !== 1 && (
              <span style={{ display: "inline-block" }}>API not ready</span>
            )}
            {record.exchange_id === 0 && (
              <span style={{ display: "inline-block" }}>Exchange not set</span>
            )}
          </span>
        ) : (
          <BtnsStateControl style={{ marginRight: "0.7rem" }} />
        )}
        {itemBot && (
          <BtnPairsList style={{ marginRight: "0.3rem" }} botId={record.id} />
        )}
        <EditButton
          label=""
          color="inherit"
          variant="contained"
          className="btn_iconOnly"
          style={{ minWidth: "0" }}
          icon={<SettingsIcon style={{ fontSize: "1em" }} />}
        />
      </span>
      {record.state === 2 &&
        record.pause_until &&
        new Date(record.pause_until).getTime() > new Date().getTime() &&
        PauseUntil(record.pause_until)}
    </span>
  );
};

export default ItemStateControlBar;
