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
  useTranslate,
  WithListContext,
} from "react-admin";

import { FBot, Exchange } from "../../types";
import { FBotPanel } from "./fbotPanel";
import BotPairsCounter from "../../layouts/botPairsCounter";
import GridData from "../../helpers/GridData";
import ItemStateControlBar from "../../layouts/itemStateControlBar";
import StateIcon from "../../layouts/stateIcon";

import LinearProgress from "@mui/material/LinearProgress";

const botsFilter = [
  <TextInput
    label="resources.fbots.fields.title"
    source="title_like"
    alwaysOn
  />,
  <TextInput label="resources.fbots.fields.id" source="id_like" alwaysOn />,
  <ReferenceInput
    allowEmpty
    alwaysOn
    reference="states"
    source="state"
    sort={{ field: "name", order: "ASC" }}
  >
    <SelectInput optionText="name" source="name" translateChoice={true} />
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

export const FBotsList = () => {
  const translate = useTranslate();
  const {
    error: errorPermissions,
    isLoading: isLoadingPermissions,
    permissions,
  } = usePermissions();

  if (isLoadingPermissions) return <Loading />;
  if (errorPermissions)
    return (
      <div className="error loadPermissions">
        {translate("errors.loadPermissionsError")}
      </div>
    );
  permissions.role !== 1 && permissions.role !== 2 && (
    <div className="warning notEnoughPermissions">
      {translate("warnings.not_enough_permissions")}
    </div>
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
        expand={<FBotPanel />}
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
          label={translate("common.bot")}
          render={(record: FBot) => (
            <ItemStateControlBar record={record} type="fbot" />
          )}
          source="title"
        />
        <ReferenceField reference="exchanges" source="exchange_id">
          <FunctionField render={(record: Exchange) => record.title} />
        </ReferenceField>
        <ReferenceManyField
          label={translate("resources.bots.fields.pairs")}
          perPage={1000000}
          reference="fpairs"
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
        <TextField source="auto_start_sum" />
        <FunctionField
          source="auto_profit"
          render={(record) => `${record.auto_profit}%`}
        />
        <TextField source="botlimit" />
        <FunctionField
          label={translate("resources.bots.fields.in_trades")}
          render={(record: FBot) => {
            return (
              <GridData type="fbot" id={record.id} parameter="in_trades" />
            );
          }}
        />
        <FunctionField
          label={translate("resources.bots.fields.profit")}
          render={(record: FBot) => {
            return (
              <GridData type="fbot" id={record.id} parameter="profit" dimension={record.baseAsset} />
            );
          }}
        />
      </Datagrid>
    </List>
  );
};
