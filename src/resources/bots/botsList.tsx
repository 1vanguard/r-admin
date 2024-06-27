import React from "react";
import {
  Datagrid,
  FunctionField,
  List,
  Loading,
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
import GridData from "../../helpers/GridData";
import ItemStateControlBar from "../../layouts/itemStateControlBar";
import StateIcon from "../../layouts/stateIcon";

import LinearProgress from "@mui/material/LinearProgress";

const botsFilter = [
  <TextInput label="Title" source="title_like" alwaysOn />,
  <TextInput label="Id" source="id_like" alwaysOn />,
  <ReferenceInput
    allowEmpty
    alwaysOn
    label="State"
    reference="states"
    source="state"
    sort={{ field: "name", order: "ASC" }}
  >
    <SelectInput optionText="name" source="name" />
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

const BotsPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} />
);

export const BotsList = () => {
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
      filters={botsFilter}
      pagination={<BotsPagination />}
      perPage={50}
    >
      <Datagrid
        bulkActionButtons={false}
        expand={<BotPanel />}
        rowClick={false}
      >
        <TextField source="id" />
        <FunctionField
          label="State"
          render={(record: Bot) => <StateIcon record={record} />}
          sortable={true}
          sortBy="state"
          source="state"
        />
        <FunctionField
          label="Bot"
          render={(record: Bot) => <ItemStateControlBar record={record} />}
          source="title"
        />
        <ReferenceField
          label="Exchange"
          reference="exchanges"
          source="exchange_id"
        >
          <FunctionField render={(record: Exchange) => record.title} />
        </ReferenceField>
        <ReferenceManyField
          label="Pairs count"
          perPage={1000000}
          reference="pairs"
          target="bot_id"
        >
          <WithListContext
            render={({ isLoading: isLoadingPairs, data: dataPairs }) => {
              const record = useRecordContext();
              if (!record) return null;
              if (isLoadingPairs) return <LinearProgress />;
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
