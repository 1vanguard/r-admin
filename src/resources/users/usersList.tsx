import {
  Datagrid,
  DateField,
  EditButton,
  EmailField,
  FunctionField,
  List,
  Loading,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  TextField,
  TextInput,
  useGetOne,
  usePermissions,
} from "react-admin";
import { Office, Role, User, usersPermanentFilter } from "../../types";

import CircleIcon from "@mui/icons-material/Circle";

export const UsersList = () => {
  const userId = localStorage.getItem("uid"),
    {
      data: user,
      isLoading: isLoadingUser,
      error: errorUser,
    } = useGetOne("users", { id: userId });

  const {
    error: errorPermissions,
    isLoading: isLoadingPermissions,
    permissions,
  } = usePermissions();

  if (isLoadingPermissions || isLoadingUser) {
    return <Loading />;
  }

  if (errorPermissions || errorUser) {
    return <div>Error loading permissions</div>;
  }

  if (permissions.role !== 1 && permissions.role !== 2) {
    return <div>Not enough permissions</div>;
  }

  const role = permissions.role,
    userOfficeId = user?.officeId,
    usersPermanentFilter: usersPermanentFilter = {},
    usersFilter = [
      <TextInput label="Username" source="username_like" alwaysOn />,
      <ReferenceInput
        allowEmpty
        alwaysOn
        label="State"
        reference="states"
        source="state"
        sort={{ field: "name", order: "ASC" }}
      >
        <SelectInput optionText="name" source="name" />
      </ReferenceInput>,
    ];

  if (role === 1) {
    usersFilter.push(
      <ReferenceInput
        allowEmpty
        alwaysOn
        filter={{ state: 1 }}
        label="Office"
        reference="offices"
        sort={{ field: "title", order: "ASC" }}
        source="office_id"
      >
        <SelectInput optionText="title" source="office_id" />
      </ReferenceInput>
    );
  }
  if (role === 2) {
    usersPermanentFilter.officeId = userOfficeId;
    usersPermanentFilter.role = 3;
  }

  return (
    <List
      filter={usersPermanentFilter}
      filters={usersFilter}
      sort={{ field: "id", order: "DESC" }}
      title="Users"
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="id" />
        <FunctionField
          source="state"
          label="State"
          sortable={true}
          sortBy="state"
          render={(record: User) => {
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
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="firstName" />
        <TextField source="lastName" />
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
          <FunctionField render={(record: Role) => record.name} />
        </ReferenceField>
        <ReferenceField label="Office" source="officeId" reference="office">
          <FunctionField render={(record: Office) => record.title} />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );
};
