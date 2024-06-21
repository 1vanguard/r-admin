import * as React from "react";
import {
  AutocompleteInput,
  Datagrid,
  EditButton,
  FunctionField,
  List,
  Loading,
  Pagination,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  TextField,
  TextInput,
  usePermissions,
} from "react-admin";
import { Bot, BotPair, Exchange } from "../../types";
import GridData from "../../helpers/GridData";

import { PairPanel } from "./pairPanel";

import BtnsStateControl from "../../layouts/btnsStateControl";
import IdxMaster from "../../layouts/idxMaster";

import SettingsIcon from "@mui/icons-material/Settings";
import StateIcon from "../../layouts/stateIcon";

const botFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  }),
  exchangeFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  });

const botFilter = () => {
  /* const { data, isLoading } = useListContext();
  const exchangeId = useWatch({
    name: "exchange_id_like",
  }); */

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

  isLoadingPermissions && <Loading />
  errorPermissions && <div>Error loading permissions</div>
  permissions.role !== 1 && permissions.role !== 2 && <div>Not enough permissions</div>

  return (
    <List
      filterDefaultValues={{ state: 1 }}
      filters={pairsFilters}
      pagination={<PairsPagination />}
      perPage={50}
    >
      <Datagrid bulkActionButtons={false} expand={<PairPanel />}>
        <TextField source="id" />
        <FunctionField
          source="state"
          label="State"
          sortable={true}
          sortBy="state"
          render={(record: Bot) => <StateIcon record={record} />}
        />
        <FunctionField
          source="symbol"
          label="Pair"
          sortable={true}
          sortBy="symbol"
          render={(record: BotPair) => {
            let pairPauseUntil;

            if (
              record.pause_until &&
              new Date(record.pause_until).getTime() > new Date().getTime() &&
              record.state === 2
            ) {
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
                      alignItems: "center",
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
        <ReferenceField
          label="Exchange"
          link={(record: any, reference: any) => `/${reference}s/${record.id}`}
          reference="exchange"
          sortable={false}
          source="exchange_id"
        >
          <FunctionField render={(record: Exchange) => record.title} />
        </ReferenceField>
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
