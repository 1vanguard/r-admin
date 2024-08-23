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
  useTranslate,
} from "react-admin";

import { FBot, FBotPair, Exchange } from "../../types";
import { FPairPanel } from "./fpairPanel";
import GridData from "../../helpers/GridData";
import IdxMaster from "../../layouts/idxMaster";
import ItemStateControlBar from "../../layouts/itemStateControlBar";
import StateIcon from "../../layouts/stateIcon";

const botFilterToQuery = (searchText: any) => ({
  title_like: `${searchText}`,
});

const pairsFilters = [
  <TextInput label="resources.fpairs.fields.symbol" source="symbol_like" alwaysOn />,
  <TextInput label="resources.fpairs.fields.id" source="id_like" alwaysOn />,
  <ReferenceInput
    allowEmpty
    alwaysOn
    label="State"
    reference="states"
    source="state"
    sort={{ field: "name", order: "ASC" }}
  >
    <SelectInput optionText="name" source="state" translateChoice={true} />
  </ReferenceInput>,
  <ReferenceInput
    source="bot_id"
    filter={{ state: 1 }}
    reference="fbots"
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

export const FPairsList = () => {
  const translate = useTranslate();
  const {
    error: errorPermissions,
    isLoading: isLoadingPermissions,
    permissions,
  } = usePermissions();

  if (isLoadingPermissions) return <Loading />;
  if (errorPermissions) return <div className="error loadPermissions">{translate("errors.loadPermissionsError")}</div>;
  permissions.role !== 1 && permissions.role !== 2 && (
    <div className="warning notEnoughPermissions">{translate("warnings.not_enough_permissions")}</div>
  );

  return (
    <List
      filterDefaultValues={{ state: 1 }}
      filters={pairsFilters}
      pagination={<PairsPagination />}
      perPage={50}
    >
      <Datagrid
        bulkActionButtons={false}
        expand={<FPairPanel />}
        rowClick={false}
      >
        <TextField source="id" />
        <FunctionField
          render={(record: FBot) => <StateIcon record={record} />}
          sortable={true}
          sortBy="state"
          source="state"
        />
        <FunctionField
          label="common.pair"
          render={(record: FBotPair) => <ItemStateControlBar record={record} />}
          sortable={true}
          sortBy="symbol"
          source="symbol"
        />
        <ReferenceField source="bot_id" reference="bots">
          <FunctionField render={(record: FBot) => record.title} />
        </ReferenceField>
        <ReferenceField
          link={(record: any, reference: any) => `/${reference}s/${record.id}`}
          reference="exchange"
          sortable={false}
          source="exchange_id"
        >
          <FunctionField render={(record: Exchange) => record.title} />
        </ReferenceField>
        <FunctionField
          label="common.rsi_s"
          render={(record: FBotPair) => {
            return <IdxMaster idxName="RSI_S" pairId={record.id}></IdxMaster>;
          }}
        />
        <FunctionField
          label="common.rsi_l"
          render={(record: FBotPair) => {
            return <IdxMaster idxName="RSI_L" pairId={record.id}></IdxMaster>;
          }}
        />
        <FunctionField
          label="common.rsi_sell"
          render={(record: FBotPair) => {
            return (
              <IdxMaster idxName="RSI_SELL" pairId={record.id}></IdxMaster>
            );
          }}
        />
        <FunctionField
          label="common.price"
          style={{ textAlign: "center" }}
          render={(record: FBotPair) => {
            return <IdxMaster idxName="Price" pairId={record.id}></IdxMaster>;
          }}
        />
        <FunctionField
          label={translate("common.in_orders") + " (" + translate("common.usdt") + ")"}
          render={(record: FBotPair) => {
            return (
              <GridData type="fpair" id={record.id} parameter="in_orders" />
            );
          }}
        />
        <FunctionField
          label="common.purchases"
          render={(record: FBotPair) => {
            return (
              <GridData type="fpair" id={record.id} parameter="purchases" />
            );
          }}
        />
        <FunctionField
          label="common.sales"
          render={(record: FBotPair) => {
            return <GridData type="fpair" id={record.id} parameter="sales" />;
          }}
        />
      </Datagrid>
    </List>
  );
};
