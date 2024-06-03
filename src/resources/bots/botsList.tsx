import React from "react";
import {
  Datagrid,
  EditButton,
  FunctionField,
  List,
  Pagination,
  ReferenceField,
  ReferenceInput,
  ReferenceManyField,
  SelectInput,
  TextField,
  TextInput,
  usePermissions,
  useRecordContext,
  WithListContext,
} from "react-admin";
import { Bot, Exchange } from "../../types";
import { BotPanel } from "./botPanel";
import BotPairsCounter from "../../layouts/botPairsCounter";
import BtnPairsList from "../../layouts/btnPairList";
import BtnsStateControl from "../../layouts/btnsStateControl";
import GridData from "../../helpers/GridData";

import { useMediaQuery, Theme } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import SettingsIcon from "@mui/icons-material/Settings";

const botsFilter = [
  <TextInput label="Title" source="title_like" alwaysOn />,
  <TextInput label="Id" source="id_like" alwaysOn />,
  <ReferenceInput
    label="State"
    source="state"
    reference="states"
    allowEmpty
    alwaysOn
  >
    <SelectInput optionText="name" source="name" />
  </ReferenceInput>,
  <ReferenceInput
    label="Exchange"
    source="exchange_id"
    reference="exchange"
    allowEmpty
    alwaysOn
  >
    <SelectInput optionText="title" source="exchange_id" />
  </ReferenceInput>,
];

const BotsPagination = () => <Pagination perPage={5} />;

export const BotsList = () => {
  const { isLoading: isLoadingPermissions, permissions } = usePermissions();

  if (isLoadingPermissions) {
    return <div>Permissions is loading...</div>;
  }

  if (permissions.role !== 1 && permissions.role !== 2) {
    return <div>Not enough permissions</div>;
  }

  return (
    <List
      resource="bots"
      filters={botsFilter}
      filterDefaultValues={{ state: 1 }}
      perPage={1000000}
      //pagination={false}
      pagination={<BotsPagination />}
      sx={{ marginBottom: 3 }}
    >
      <Datagrid bulkActionButtons={false} expand={<BotPanel />}>
        <TextField source="id" />
        <FunctionField
          source="state"
          label="State"
          sortable={true}
          sortBy="state"
          render={(record: Bot) => {
            let stateColor;

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

            return (
              <div style={{ textAlign: "center" }}>
                <CircleIcon color={stateColor} sx={{ fontSize: "0.9em" }} />
              </div>
            );
          }}
        />
        <FunctionField
          source="title"
          label="Bot"
          render={(record: Bot) => {
            let botApiState = (
                <KeyIcon
                  style={{ color: "green", marginRight: "5px" }}
                  sx={{ fontSize: "1.1em" }}
                />
              ),
              botPauseUntil;

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
                  {botApiState}
                  <span style={{ marginRight: "0.7em" }}>{record.title}</span>
                  <span style={{ display: "flex", marginLeft: "auto" }}>
                    <BtnsStateControl style={{ marginRight: "0.7rem" }} />
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
          <FunctionField render={(record: Exchange) => record.title} />
        </ReferenceField>
        <ReferenceManyField
          reference="pairs"
          target="bot_id"
          label="Pairs count"
          perPage={1000000}
        >
          <WithListContext
            render={({ isLoading: isLoadingPairs, data: dataPairs }) => {
              const record = useRecordContext();
              return (
                !isLoadingPairs && (
                  <BotPairsCounter bot={record} pairs={dataPairs} />
                )
              );
            }}
          />
        </ReferenceManyField>
        <TextField label="Order" source="auto_start_sum" />
        <TextField label="Profit %" source="auto_profit" />
        <TextField label="Limit" source="botlimit" />
        <FunctionField
          label="In trades"
          render={(record: Bot) => {
            return <GridData type="bot" id={record.id} parameter="in_trades" />;
          }}
        />
        <FunctionField
          label="Profit"
          render={(record: Bot) => {
            return <GridData type="bot" id={record.id} parameter="profit" />;
          }}
        />
      </Datagrid>
    </List>
  );
};
