import * as React from "react";
import { useWatch } from "react-hook-form";
import {
  AutocompleteInput,
  AutocompleteInputProps,
  Datagrid,
  DateField,
  EditButton,
  FunctionField,
  List,
  Loading,
  Pagination,
  ReferenceField,
  ReferenceInput,
  SearchInput,
  SelectInput,
  TextField,
  TextInput,
  useListContext,
  usePermissions,
} from "react-admin";
import { Bot, BotPair, Exchange } from "../../types";
import BtnsStateControl from "../../layouts/btnsStateControl";
import GridData from "../../helpers/GridData";
import IdxMaster from "../../layouts/idxMaster";

import CircleIcon from "@mui/icons-material/Circle";
import SettingsIcon from "@mui/icons-material/Settings";
import { PairPanel } from "./pairPanel";

//import { useMediaQuery, Theme } from "@mui/material";

const botFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  }),
  exchangeFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  });

const botFilter = () => {
  const { data, isLoading } = useListContext();
  const exchangeId = useWatch({
    name: "exchange_id_like",
  });

  return (
    <ReferenceInput source="bot_id" reference="bots" allowEmpty>
      <AutocompleteInput optionText="title" filterToQuery={botFilterToQuery} />
    </ReferenceInput>
  );
};

const pairsFilters = [
  <TextInput label="Symbol" source="symbol_like" alwaysOn />,
  <TextInput label="Id" source="id_like" alwaysOn />,
  <ReferenceInput
    allowEmpty
    alwaysOn
    label="State"
    reference="states"
    source="state"
    sort={{ field: "name", order: "ASC" }}
  >
    <SelectInput optionText="name" source="state" />
  </ReferenceInput>,
  <ReferenceInput
    source="bot_id"
    filter={{ state: 1 }}
    reference="bots"
    allowEmpty
    alwaysOn
  >
    <AutocompleteInput optionText="title" filterToQuery={botFilterToQuery} />
  </ReferenceInput>,
  <ReferenceInput
    allowEmpty
    alwaysOn
    filter={{ state: 1 }}
    label="Exchange"
    reference="exchange"
    source="exchange_id"
    sort={{ field: "title", order: "ASC" }}
  >
    <SelectInput optionText="title" source="exchange_id" />
  </ReferenceInput>,
];

const PairsPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} />
);

export const PairsList = () => {
  const {
    error: errorPermissions,
    isLoading: isLoadingPermissions,
    permissions,
  } = usePermissions();

  if (isLoadingPermissions) {
    return <Loading />;
  }

  if (errorPermissions) {
    return <div>Error loading permissions</div>;
  }

  if (permissions.role !== 1 && permissions.role !== 2) {
    return <div>Not enough permissions</div>;
  }

  return (
    <List
      perPage={50}
      filters={pairsFilters}
      filterDefaultValues={{ state: 1 }}
      pagination={<PairsPagination />}
    >
      <Datagrid bulkActionButtons={false} expand={<PairPanel />}>
        <TextField source="id" />
        <FunctionField
          source="state"
          label="State"
          sortable={true}
          sortBy="state"
          render={(record: BotPair) => {
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
          source="symbol"
          label="Pair"
          sortable={true}
          sortBy="symbol"
          render={(record: BotPair) => {
            let pairPauseUntil;

            if (record.pause_until) {
              pairPauseUntil = (
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
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "0.7em" }}>{record.symbol}</span>
                  <span
                    style={{
                      display: "flex",
                      marginLeft: "auto",
                    }}
                  >
                    <BtnsStateControl />
                    <EditButton
                      label=""
                      color="inherit"
                      variant="contained"
                      className="btn_iconOnly"
                      style={{
                        marginLeft: "0.3em",
                        minWidth: "0",
                      }}
                      icon={<SettingsIcon style={{ fontSize: "1em" }} />}
                    />
                  </span>
                </span>
                {pairPauseUntil}
              </div>
            );
          }}
        />
        <ReferenceField label="Bot" source="bot_id" reference="bots">
          <FunctionField render={(record: Bot) => record.title} />
        </ReferenceField>
        {/* <ReferenceField label="Exchange" source="exchange_id" reference="exchanges">
          <FunctionField render={(record: Exchange) => record.title} />
        </ReferenceField> */}
        <FunctionField
          label="RSI_S"
          render={(record: BotPair) => {
            return <IdxMaster idxName="RSI_S" pairId={record.id}></IdxMaster>;
          }}
        />
        <FunctionField
          label="RSI_L"
          render={(record: BotPair) => {
            return <IdxMaster idxName="RSI_L" pairId={record.id}></IdxMaster>;
          }}
        />
        <FunctionField
          label="RSI_SELL"
          render={(record: BotPair) => {
            return (
              <IdxMaster idxName="RSI_SELL" pairId={record.id}></IdxMaster>
            );
          }}
        />
        <FunctionField
          label="Price"
          style={{ textAlign: "center" }}
          render={(record: BotPair) => {
            return <IdxMaster idxName="Price" pairId={record.id}></IdxMaster>;
          }}
        />
        <FunctionField
          label="In orders (USDT)"
          render={(record: BotPair) => {
            return (
              <GridData type="pair" id={record.id} parameter="in_orders" />
            );
          }}
        />
        <FunctionField
          label="Purchases"
          render={(record: BotPair) => {
            return (
              <GridData type="pair" id={record.id} parameter="purchases" />
            );
          }}
        />
        <FunctionField
          label="Sales"
          render={(record: BotPair) => {
            return <GridData type="pair" id={record.id} parameter="sales" />;
          }}
        />
      </Datagrid>
    </List>
  );
};
