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

import CircleIcon from "@mui/icons-material/Circle";

export const ExchangesList = () => {
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

  if (permissions.role !== 1) {
    return <div>Not enough permissions</div>;
  }
  return (
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField source="id" />
        <FunctionField
          source="state"
          label="State"
          sortable={true}
          sortBy="state"
          render={(record: Exchange) => {
            let stateColor;

            switch (record.state) {
              case -1:
                stateColor = "disabled";
                break;
              case 0:
                stateColor = "error";
                break;
              case 1:
                stateColor = "success";
                break;
              case 2:
                stateColor = "warning";
                break;
              default:
                stateColor = "disabled";
            }

            return (
              <div style={{ textAlign: "center" }}>
                <CircleIcon color={stateColor} sx={{ fontSize: "0.9em" }} />
              </div>
            );
          }}
        />
        <TextField source="title" />
        <TextField source="currencies" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
