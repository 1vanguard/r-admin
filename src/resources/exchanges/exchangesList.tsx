import {
  Loading,
  List,
  SimpleList,
  Datagrid,
  TextField,
  FunctionField,
  ReferenceField,
  usePermissions,
  EditButton,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const ExchangesList = () => {
  const { isLoading, permissions } = usePermissions();
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  if (isLoading) {
    return <Loading />;
  } else {
    const role = permissions.role;
    // console.log(role);

    if (role === 1) {
      return (
        <List>
          {isSmall ? (
            <SimpleList
              primaryText={(record) => record.title}
              secondaryText={(record) => record.state}
              tertiaryText={(record) => record.currencies}
            />
          ) : (
            <Datagrid>
              <TextField source="id" />
              <TextField source="title" />
              <ReferenceField label="State" source="state" reference="states">
                <FunctionField render={(record) => record.name} />
              </ReferenceField>
              <TextField source="currencies" />
              {/* <EditButton /> */}
            </Datagrid>
          )}
        </List>
      );
    } else {
      return <div>Not enough permissions</div>;
    }
  }
};
