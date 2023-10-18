import {
  Loading,
  List,
  SimpleList,
  Datagrid,
  TextField,
  EditButton,
  ReferenceField,
  usePermissions,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const OfficesList = () => {
  const { isLoading, permissions } = usePermissions();
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  if (isLoading) {
    return <Loading />;
  } else {
    const role = permissions.role;
    // console.log(role);
1
    if (role === 1) {
      return (
        <List>
          {isSmall ? (
            <SimpleList
              primaryText={(record) => record.title}
              secondaryText={(record) => record.address}
              tertiaryText={(record) => record.phone}
            />
          ) : (
            <Datagrid>
              <TextField source="id" />
              <TextField source="title" />
              <TextField source="address" />
              <TextField source="phone" />
              <TextField source="url" />
              <ReferenceField source="state" reference="states">
                <TextField source="name" />
              </ReferenceField>
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
