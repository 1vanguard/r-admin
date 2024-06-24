import * as React from "react";
import {
  AutocompleteInput,
  Datagrid,
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
import { PairPanel } from "./pairPanel";
import GridData from "../../helpers/GridData";
import IdxMaster from "../../layouts/idxMaster";
import ItemStateControlBar from "../../layouts/itemStateControlBar";
import StateIcon from "../../layouts/stateIcon";

const botFilterToQuery = (searchText: any) => ({
  title_like: `${searchText}`,
});

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

  isLoadingPermissions && <Loading />;
  errorPermissions && <div>Error loading permissions</div>;
  permissions.role !== 1 && permissions.role !== 2 && (
    <div>Not enough permissions</div>
  );

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
          label="State"
          render={(record: Bot) => <StateIcon record={record} />}
          sortable={true}
          sortBy="state"
          source="state"
        />
        <FunctionField
          label="Pair"
          render={(record: BotPair) => <ItemStateControlBar record={record} />}
          sortable={true}
          sortBy="symbol"
          source="symbol"
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
