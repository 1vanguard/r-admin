import {
  Loading,
  Edit,
  List,
  Datagrid,
  TabbedForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  useRecordContext,
  useGetList,
  useGetManyReference,
  usePermissions,
  useGetMany,
  TextField,
  ReferenceField,
  FunctionField,
  DateField,
  EditButton,
  useGetOne,
  AutocompleteInput,
} from "react-admin";

import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import Grid from "@mui/material/Grid";

const officeFilterToQuery = (searchText: any) => ({
  title_like: `${searchText}`,
});

const Editform = () => {
  const record = useRecordContext(),
    userId = localStorage.getItem("uid");

  const {
    data: states,
    isLoading: isLoadingStates,
    error: errorStates,
  } = useGetList("states");

  const {
    data: roles,
    isLoading: isLoadingRoles,
    error: errorRoles,
  } = useGetList("roles");

  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useGetOne("users", { id: userId });

  const { permissions, isLoading: isLoadingPermissions } = usePermissions();

  if (
    !record ||
    isLoadingStates ||
    isLoadingRoles ||
    isLoadingPermissions ||
    isLoadingUser
  ) {
    return <Loading />;
  }
  if (errorStates || errorRoles || errorUser) {
    return <p>ERROR</p>;
  }

  const role = permissions.role,
    userOfficeId = user?.officeId;

  return (
    <TabbedForm
      toolbar={<PrymaryEditToolbar />}
      id="editUserForm"
      syncWithLocation={false}
    >
      <TabbedForm.Tab label="General">
        <Grid container spacing={2} maxWidth={700}>
          <Grid item xs="auto">
            <TextInput
              label="Id"
              source="id"
              style={{ maxWidth: "7em" }}
              InputProps={{ disabled: true }}
            />
          </Grid>
          <Grid item xs sm>
            {role === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    fullWidth
                    InputProps={{ disabled: true }}
                    source="username"
                    defaultValue={record.username}
                    validate={required()}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    fullWidth
                    source="password"
                    type="password"
                    validate={required()}
                  />
                </Grid>
              </Grid>
            )}
            {role === 2 && (
              <TextInput
                fullWidth
                disabled
                source="username"
                defaultValue={record.username}
              />
            )}
          </Grid>
          <Grid item xs={12} style={{ padding: "0" }}></Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              fullWidth
              source="firstName"
              defaultValue={record.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              fullWidth
              source="lastName"
              defaultValue={record.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              fullWidth
              source="email"
              type="email"
              validate={required()}
              defaultValue={record.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              fullWidth
              source="telegram"
              defaultValue={record.telegram}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ReferenceInput
              label="Office"
              source="officeId"
              reference="offices"
              {...(role === 2 && { filter: { id: userOfficeId } })}
            >
              <>
                {role === 1 && (
                  <AutocompleteInput
                    fullWidth
                    optionText="title"
                    validate={required()}
                    filterToQuery={officeFilterToQuery}
                  />
                )}
                {role === 2 && (
                  <SelectInput
                    fullWidth
                    optionText="title"
                    optionValue="id"
                    validate={required()}
                    {...(role === 2 && { defaultValue: userOfficeId })}
                  />
                )}
              </>
            </ReferenceInput>
          </Grid>
          <Grid item xs={12} sm={4}>
            <SelectInput
              fullWidth
              source="state"
              choices={states}
              validate={required()}
              defaultValue={record.state}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ReferenceInput label="Role" source="role" reference="roles">
              <SelectInput
                fullWidth
                source="role"
                choices={roles}
                validate={required()}
                defaultValue={"2"}
              />
            </ReferenceInput>
          </Grid>
        </Grid>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Bots">
        <List
          resource="bots"
          filter={{ client_id: record.id }}
          sx={{ width: "100%" }}
        >
          <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <ReferenceField label="State" source="state" reference="states">
              <FunctionField render={(record) => record.name} />
            </ReferenceField>
            <DateField
              source="pause_until"
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
            <ReferenceField
              label="Exchange"
              source="exchange_id"
              reference="exchanges"
            >
              <FunctionField render={(record) => record.title} />
            </ReferenceField>
            <ReferenceField
              label="Client"
              source="client_id"
              reference="users"
            />
            <DateField
              source="created"
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
          </Datagrid>
        </List>
      </TabbedForm.Tab>
    </TabbedForm>
  );
};

export const UserEdit = () => {
  return (
    <Edit>
      <Editform />
    </Edit>
  );
};
