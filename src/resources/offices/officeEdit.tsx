import {
  Loading,
  Edit,
  TabbedForm,
  TextInput,
  SelectInput,
  required,
  useGetList,
  useRecordContext,
  usePermissions,
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  ReferenceField,
  FunctionField,
  EditButton,
} from "react-admin";
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import Grid from "@mui/material/Grid";

const Editform = () => {
  const record = useRecordContext();

  const {
    data: states,
    isLoading: isLoadingStates,
    error,
  } = useGetList("states");

  if (!record || isLoadingStates) {
    return <Loading />;
  }
  if (error) {
    return <div>ERROR</div>;
  }

  return (
    <TabbedForm toolbar={<PrymaryEditToolbar />} id="editOfficeForm">
      <TabbedForm.Tab label="Office">
        <Grid container spacing={2} maxWidth={700}>
          <Grid item xs="auto">
            <TextInput
              disabled
              label="Id"
              source="id"
              style={{ maxWidth: "7em" }}
            />
          </Grid>
          <Grid item xs>
            <TextInput
              fullWidth
              source="title"
              defaultValue={record.title}
              validate={required()}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              fullWidth
              source="address"
              defaultValue={record.address}
              validate={required()}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              fullWidth
              source="phone"
              defaultValue={record.phone}
              validate={required()}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              fullWidth
              source="url"
              defaultValue={record.url}
              validate={required()}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectInput
              fullWidth
              source="state"
              choices={states}
              validate={required()}
              defaultValue={record.state}
            />
          </Grid>
        </Grid>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Statistics">Statistics</TabbedForm.Tab>
      <TabbedForm.Tab label="Users">
        <List
          resource="users"
          filter={{ officeId: record.id }}
          sx={{ width: "100%" }}
        >
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
            <ReferenceField label="State" source="state" reference="states">
              <FunctionField render={(record) => record.name} />
            </ReferenceField>
            <EditButton />
          </Datagrid>
        </List>
      </TabbedForm.Tab>
    </TabbedForm>
  );
};

export const OfficeEdit = () => {
  const { isLoading, permissions } = usePermissions();

  if (isLoading) {
    return <Loading />;
  } else {
    const role = permissions.role;

    if (role === 1) {
      return (
        <Edit>
          <Editform />
        </Edit>
      );
    } else {
      return <div>Not enough permissions</div>;
    }
  }
};
