import {
  Loading,
  List,
  Datagrid,
  TextField,
  FunctionField,
  usePermissions,
  EditButton,
} from "react-admin";
import { Exchange } from "../../types";

import StateIcon from "../../layouts/stateIcon";

export const ExchangesList = () => {
  const {
    error: errorPermissions,
    isLoading: isLoadingPermissions,
    permissions,
  } = usePermissions();

  isLoadingPermissions && <Loading />;
  errorPermissions && <div>Error loading permissions</div>;
  permissions.role !== 1 && <div>Not enough permissions</div>;

  return (
    <List>
      <Datagrid bulkActionButtons={false} rowClick={false}>
        <TextField source="id" />
        <FunctionField
          label="State"
          render={(record: Exchange) => <StateIcon record={record} />}
          sortable={true}
          sortBy="state"
          source="state"
        />
        <TextField source="title" />
        <TextField source="currencies" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
