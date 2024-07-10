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
  useTranslate,
} from "react-admin";

import { Office, Role, User, usersPermanentFilter } from "../../types";
import StateIcon from "../../layouts/stateIcon";

export const UsersList = () => {
  const translate = useTranslate();
  const userId = localStorage.getItem("uid"),
    {
      data: user,
      error: errorUser,
      isLoading: isLoadingUser,
    } = useGetOne("users", { id: userId });

  const {
    error: errorPermissions,
    isLoading: isLoadingPermissions,
    permissions,
  } = usePermissions();

  if (isLoadingPermissions || isLoadingUser) return <Loading />;
  if (errorPermissions || errorUser)
    return (
      <div className="error loadData">{translate("errors.loadDataError")}</div>
    );
  permissions.role !== 1 && permissions.role !== 2 && (
    <div className="warning notEnoughPermissions">
      {translate("warnings.not_enough_permissions")}
    </div>
  );

  const userOfficeId = user?.officeId,
    usersPermanentFilter: usersPermanentFilter = {},
    usersFilter = [
      <TextInput label="common.username" source="username_like" alwaysOn />,
      <ReferenceInput
        allowEmpty
        alwaysOn
        reference="states"
        sort={{ field: "name", order: "ASC" }}
        source="state"
      >
        <SelectInput optionText="name" source="name" translateChoice={true} />
      </ReferenceInput>,
    ];

  if (permissions.role === 1) {
    usersFilter.push(
      <ReferenceInput
        allowEmpty
        alwaysOn
        filter={{ state: 1 }}
        reference="offices"
        sort={{ field: "title", order: "ASC" }}
        source="office_id"
      >
        <SelectInput
          optionText="title"
          source="office_id"
        />
      </ReferenceInput>
    );
  }
  if (permissions.role === 2) {
    usersPermanentFilter.officeId = userOfficeId;
    usersPermanentFilter.role = 3;
  }

  return (
    <List
      filter={usersPermanentFilter}
      filters={usersFilter}
      sort={{ field: "id", order: "DESC" }}
    >
      <Datagrid bulkActionButtons={false} rowClick={false}>
        <TextField source="id" />
        <FunctionField
          render={(record: User) => <StateIcon record={record} />}
          sortable={true}
          sortBy="state"
          source="state"
        />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="telegram" />
        <DateField
          options={{
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }}
          showTime
          source="registerDate"
        />
        <DateField
          options={{
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }}
          showTime
          source="lastvisitDate"
        />
        <ReferenceField source="role" reference="roles">
          <FunctionField render={(record: Role) => record.name} />
        </ReferenceField>
        <ReferenceField source="officeId" reference="office">
          <FunctionField render={(record: Office) => record.title} />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );
};
