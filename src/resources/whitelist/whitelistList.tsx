import {
  Loading,
  List,
  Datagrid,
  TextField,
  usePermissions,
  EditButton,
} from "react-admin";

export const WhitelistList = () => {
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
      <Datagrid bulkActionButtons={false} rowClick={false}>
        <TextField source="id" />
        <TextField source="symbol" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
