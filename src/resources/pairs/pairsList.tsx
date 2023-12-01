import * as React from "react";
import {
  List,
  SimpleList,
  Datagrid,
  DateField,
  FunctionField,
  TextField,
  TextInput,
  ReferenceField,
  EditButton,
  usePermissions,
} from "react-admin";

import { useMediaQuery, Theme } from "@mui/material";

const pairsFilters = [
    <TextInput label="Search" source="q" alwaysOn />
]

export const PairsList = () => {
  const { isLoading, permissions } = usePermissions();
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  if (isLoading) {
    return <div>Checking permissions...</div>;
  } else {
    const role = permissions.role;

    if (role === 1 || role === 2) {
      return (
        <List perPage={10}>
          {isSmall ? (
            <SimpleList
              primaryText={(record) => record.title}
              secondaryText={(record) => record.state}
              tertiaryText={(record) => record.currencies}
            />
          ) : (
            <Datagrid>
              <TextField source="id" />
              <TextField source="symbol" />
              <ReferenceField label="State" source="state" reference="states">
                <FunctionField render={(record) => record.name} />
              </ReferenceField>
              <ReferenceField label="Bot" source="bot_id" reference="bots">
                <FunctionField render={(record) => record.title} />
              </ReferenceField>
              <TextField source="pair_limit" />
              <TextField source="step" />
              <TextField source="start_offset" />
              <TextField source="profit" />
              <TextField source="squiz" />
              <EditButton />
            </Datagrid>
          )}
        </List>
      );
    } else {
      return <div>Not enough permissions</div>;
    }
  }
};
