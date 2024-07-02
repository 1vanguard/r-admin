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
import { Exchange } from "../../types";

import StateIcon from "../../layouts/stateIcon";

export const ExchangesList = () => {
  const translate = useTranslate(),
    {
      error: errorPermissions,
      isLoading: isLoadingPermissions,
      permissions,
    } = usePermissions();

  if (isLoadingPermissions) return <Loading />;
  if (errorPermissions) return <div className="error loadPermissions">{translate("errors.loadPermissionsError")}</div>;

  if (permissions.role !== 1) return <div>{translate("warnings.not_enough_permissions")}</div>;

  return (
    <List>
      <Datagrid bulkActionButtons={false} rowClick={false}>
        <TextField source="id" />
        <FunctionField
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
