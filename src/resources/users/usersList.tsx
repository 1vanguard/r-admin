import {
  Loading,
  List,
  SimpleList,
  Datagrid,
  TextField,
  ReferenceField,
  FunctionField,
  EmailField,
  DateField,
  EditButton,
  usePermissions,
  useGetIdentity,
  useGetOne,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const UsersList = () => {
  const { data: identity, isLoading: isLoadingIdentity } = useGetIdentity();
  const { permissions, isLoading: isLoadingPermissions } = usePermissions();
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  const {data: user, isLoading: isLoadingUser, error: errorUser} = useGetOne("users", { id: identity?.id });

  console.log(isLoadingPermissions);
  console.log(isLoadingIdentity);
  console.log(identity);

  if (isLoadingIdentity || isLoadingPermissions) { return <Loading />; }


  console.log(isLoadingPermissions);
  console.log(isLoadingIdentity);

    console.log(identity.id);

    /* if (isLoadingUser) {
      return <Loading />;
    } else {
      //console.log(user);
      if (role === 2) {
      }
    } */
  const role = permissions.role;


  if (role === 1 || role === 2) {
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
            <ReferenceField label="Role" source="role" reference="roles">
              <FunctionField render={(record) => record.name} />
            </ReferenceField>
            <ReferenceField label="Office" source="officeId" reference="office">
              <FunctionField render={(record) => record.title} />
            </ReferenceField>
            <ReferenceField label="State" source="state" reference="states">
              <FunctionField render={(record) => record.name} />
            </ReferenceField>
            <EditButton />
          </Datagrid>
        )}
      </List>
    );
  } else {
    return <div>Not enough permissions</div>;
  }
};
