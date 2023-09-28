import { useMediaQuery, Theme } from "@mui/material";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  ReferenceField,
  EmailField,
  DateField,
  EditButton
} from "react-admin";
import BtnDelete from "../../layouts/btnDelete";
// import MyUrlField from "./MyUrlField";

export const UsersList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.username}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="username" />
          {/* <ReferenceField source="username" reference="users" link="edit"/> */}
          <TextField source="role" />
          <TextField source="firstName" />
          <TextField source="lastName" />
          <EmailField source="email" />
          <TextField source="telegram" />
          <DateField
            source="registrationDate"
            showTime
            options={{
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }}
          />
          <DateField
            source="lastVisit"
            showTime
            options={{
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }}
          />
          <EditButton />
          <BtnDelete resource="users" />
        </Datagrid>
      )}
    </List>
  );
};
