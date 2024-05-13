import React from "react";
import {
  List,
  SimpleList,
  Datagrid,
  FunctionField,
  TextField,
  ReferenceField,
  ReferenceManyField,
  EditButton,
  usePermissions,
  WithListContext,
  useListController,
  Loading,
  useRecordContext,
} from "react-admin";
// import { Bot, BotIdx } from "../../types";
import { BotPanel } from "./botPanel";
import BotPairsCounter from "../../layouts/botPairsCounter";
import BtnsStateControl from "../../layouts/btnsStateControl";
import GridData from "../../helpers/GridData";

import { useMediaQuery, Theme } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import SettingsIcon from "@mui/icons-material/Settings";

export const BotsList = () => {
  // const [bots, setBots] = useState<Bot[]>([]);
  const {
    isLoading: isLoadingBoats,
    data: botsData,
    total: totalBots,
  } = useListController();
  // const [botsIdxs, setBotsIdxs] = useState<BotIdx[]>([]);
  const { isLoading: isLoadingPermissions, permissions } = usePermissions();
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  if (isLoadingPermissions) {
    return <div>Permissions is loading...</div>;
  }

  if (isLoadingBoats) {
    return <Loading />;
  }

  const role = permissions.role;

  if (role === 1 || role === 2) {
    console.log("List component isLoadingBoats: ", isLoadingBoats);
    console.log("List component data: ", botsData);
    console.log("List component totalBots: ", totalBots);
    return (
      <List perPage={10}>
        {isSmall ? (
          <SimpleList
            primaryText={(record) => record.title}
            secondaryText={(record) => record.state}
            tertiaryText={(record) => record.currencies}
          />
        ) : (
          <Datagrid expand={<BotPanel />}>
            <TextField source="id" />
            <FunctionField
              source="title"
              label="Bot"
              render={(record) => {
                let stateColor,
                  botApiState = (
                    <KeyIcon
                      style={{ color: "green", marginRight: "5px" }}
                      sx={{ fontSize: "1.1em" }}
                    />
                  ),
                  botPauseUntil;

                switch (record.state) {
                  case -1:
                    stateColor = "disabled";
                    break;
                  case 0:
                    stateColor = "error";
                    break;
                  case 1:
                    stateColor = "success";
                    break;
                  case 2:
                    stateColor = "warning";
                    break;
                  default:
                    stateColor = "disabled";
                }

                if (record.api_ready === 0) {
                  botApiState = (
                    <KeyOffIcon
                      style={{ color: "red", marginRight: "5px" }}
                      sx={{ fontSize: "1.1em" }}
                    />
                  );
                }

                if (record.pause_until) {
                  botPauseUntil = (
                    <span style={{ fontSize: "0.8em" }}>
                      <span style={{ fontWeight: "700", marginRight: "5px" }}>
                        Pause until:
                      </span>
                      {new Date(record.pause_until).toLocaleString()}
                    </span>
                  );
                }

                return (
                  <div>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <CircleIcon
                        color={stateColor}
                        style={{ marginRight: "5px" }}
                        sx={{ fontSize: "0.9em" }}
                      />
                      {botApiState}
                      <span style={{ marginRight: "0.7em" }}>
                        {record.title}
                      </span>
                      <span style={{ display: "flex", marginLeft: "auto" }}>
                        <BtnsStateControl />
                        <EditButton
                          label=""
                          color="inherit"
                          variant="contained"
                          className="btn_iconOnly"
                          style={{ marginLeft: "0.3em", minWidth: "0" }}
                          icon={<SettingsIcon style={{ fontSize: "1em" }} />}
                        />
                      </span>
                    </span>
                    {botPauseUntil}
                  </div>
                );
              }}
            />
            <ReferenceField
              label="Exchange"
              source="exchange_id"
              reference="exchanges"
            >
              <FunctionField render={(record) => record.title} />
            </ReferenceField>
            <ReferenceManyField
              reference="pairs"
              target="bot_id"
              label="Pairs count"
            >
                <WithListContext
                  render={({ isLoading, data }) => {
                    const record = useRecordContext();
                    return !isLoading && <BotPairsCounter bot={record} pairs={data} />;
                  }}
                />
            </ReferenceManyField>
            <TextField label="Order" source="auto_start_sum" />
            <TextField label="Profit %" source="auto_profit" />
            <TextField label="Limit" source="botlimit" />
            <FunctionField
              source="id"
              label="In trades"
              render={(record) => {
                return (
                  <GridData type="bot" id={record.id} parameter="in_trades" />
                );
              }}
            />
            <FunctionField
              source="id"
              label="Profit"
              render={(record) => {
                return (
                  <GridData type="bot" id={record.id} parameter="profit" />
                );
              }}
            />
          </Datagrid>
        )}
      </List>
    );
  } else {
    return <div>Not enough permissions</div>;
  }
};
