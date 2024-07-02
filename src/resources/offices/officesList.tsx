import {
  Datagrid,
  EditButton,
  FunctionField,
  List,
  Loading,
  TextField,
  usePermissions,
  useTranslate,
} from "react-admin";

import { Office } from "../../types";
import StateIcon from "../../layouts/stateIcon";

export const OfficesList = () => {
  const translate = useTranslate(),
    {
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
    <List>
      <Datagrid bulkActionButtons={false} rowClick={false}>
        <TextField source="id" />
        <FunctionField
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
