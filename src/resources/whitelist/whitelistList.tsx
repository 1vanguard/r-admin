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
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="symbol" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
