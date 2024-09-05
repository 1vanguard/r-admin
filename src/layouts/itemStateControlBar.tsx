import React from "react";
import { EditButton, useTranslate } from "react-admin";

import { Bot, BotPair, FBot, FBotPair } from "../types";
import BtnPairsList from "../layouts/btnPairList";
import BtnsStateControl from "../layouts/btnsStateControl";

import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";

type ItemStateControlBarProps = {
  record: Bot | BotPair | FBot | FBotPair;
  type?: "bot" | "botpair" | "fbot" | "fbotpair";
};

interface ItemApiIconProps {
  isBot: boolean;
  apiReady: any;
}

const ItemApiIcon: React.FC<ItemApiIconProps> = ({ isBot, apiReady }) => {
  const translate = useTranslate();
  if (isBot) {
    return (
      <Tooltip
        arrow
        leaveDelay={200}
        placement="top"
        title={
          isBot ? (
            apiReady !== 1 ? (
              <>{translate("state.spec_states.api_not_ready")}</>
            ) : (
              <>{translate("state.spec_states.api_ready")}</>
            )
          ) : (
            <>{translate("state.spec_states.no_api_data")}</>
          )
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

const ItemStrategyIcon = () => {
  const translate = useTranslate();
  return (
    <Tooltip
      arrow
      leaveDelay={200}
      placement="top"
      title={<>{translate("common.strategy")}</>}
      style={{ textAlign: "center" }}
    >
      <SettingsApplicationsIcon
        style={{ fontSize: "1.5em", marginRight: "5px" }}
      />
    </Tooltip>
  );
};

const PauseUntil = (pauseUntil: string) => {
  const translate = useTranslate();
  return (
    <span style={{ fontSize: "0.8em" }}>
      <span style={{ fontWeight: "700", marginRight: "5px" }}>
        {translate("common.pause_until")}:
      </span>
      {new Date(pauseUntil).toLocaleString()}
    </span>
  );
};

const ItemStateControlBar = ({ record, type }: ItemStateControlBarProps) => {
  const translate = useTranslate();
  const itemBot = "api_ready" in record ? true : false,
    botApiIcon = <ItemApiIcon isBot={itemBot} apiReady={record.api_ready} />,
    botStrategyIcon = <ItemStrategyIcon />

  return (
    <span style={{ display: "flex", alignItems: "center" }}>
      {record.is_strategy ? botStrategyIcon : null}
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
              <span style={{ display: "inline-block" }}>
                {translate("state.spec_states.api_not_ready")}
              </span>
            )}
            {record.exchange_id === 0 && (
              <span style={{ display: "inline-block" }}>
                {translate("state.spec_states.exchange_not_set")}
              </span>
            )}
          </span>
        ) : (
          <BtnsStateControl style={{ marginRight: "0.7rem" }} />
        )}
        {itemBot && (
          <BtnPairsList style={{ marginRight: "0.3rem" }} botId={record.id} type={type} />
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
