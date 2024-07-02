import {
  Datagrid,
  EditButton,
  List,
  Loading,
  TextField,
  usePermissions,
  useTranslate,
} from "react-admin";

export const WhitelistList = () => {
  const translate = useTranslate(),
    {
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
  if (permissions.role !== 1 && permissions.role !== 2) return (
    <div className="warning notEnoughPermissions">{translate("warnings.not_enough_permissions")}</div>
  )

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
