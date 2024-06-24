import {
  Loading,
  List,
  Datagrid,
  TextField,
  EditButton,
  usePermissions,
  FunctionField,
} from "react-admin";

import { Office } from "../../types";
import StateIcon from "../../layouts/stateIcon";

export const OfficesList = () => {
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
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField source="id" />
        <FunctionField
          label="State"
          render={(record: Office) => <StateIcon record={record} />}
          sortable={true}
          sortBy="state"
          source="state"
        />
        <TextField source="title" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
