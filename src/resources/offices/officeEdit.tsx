import {
  Datagrid,
  DateField,
  Edit,
  EditButton,
  EmailField,
  FunctionField,
  Loading,
  Pagination,
  ReferenceField,
  ReferenceManyField,
  required,
  SelectInput,
  TabbedForm,
  TextField,
  TextInput,
  useGetList,
  usePermissions,
  useRecordContext,
} from "react-admin";

import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import IdMark from "../../layouts/idMark";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Editform = () => {
  const record = useRecordContext();
  if (!record) return null;
  const {
    data: states,
    isLoading: isLoadingStates,
    error: errorStates,
  } = useGetList("states");

  isLoadingStates && <Loading />;
  errorStates && <div>Loading states error</div>;

  return (
    <TabbedForm toolbar={<PrymaryEditToolbar />} id="editOfficeForm">
      <TabbedForm.Tab label="Office">
        <Container maxWidth="md" sx={{ ml: 0 }}>
          <h2>Office main settings</h2>
        </Container>
        <Container maxWidth="md" sx={{ ml: 0 }}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              lg={1}
              sx={{ textAlign: "center" }}
            >
              <IdMark id={record.id} />
            </Grid>
            <Grid item xs={12} sm={8} md={10} lg={11}>
              <TextInput
                defaultValue={record.title}
                margin="none"
                source="title"
                validate={required()}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <SelectInput
                choices={states}
                source="state"
                validate={required()}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                defaultValue={record.address}
                source="address"
                validate={required()}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                defaultValue={record.phone}
                source="phone"
                validate={required()}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                defaultValue={record.url}
                source="url"
                validate={required()}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Container>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Statistics">
        <Container maxWidth="xl" sx={{ ml: 0 }}>
          <h2>Office statistics</h2>
        </Container>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Users">
        <Container maxWidth="xl" sx={{ ml: 0 }}>
          <h2>Office users</h2>
        </Container>
        <Container maxWidth="xl" sx={{ ml: 0 }}>
          <ReferenceManyField
            reference="users"
            filter={{ officeId: record.id }}
            label="Office users"
            target="officeId"
            perPage={10}
            pagination={<Pagination />}
          >
            <Datagrid bulkActionButtons={false}>
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
                <FunctionField render={(record: any) => record.name} />
              </ReferenceField>
              <ReferenceField label="State" source="state" reference="states">
                <FunctionField render={(record: any) => record.name} />
              </ReferenceField>
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
        </Container>
      </TabbedForm.Tab>
    </TabbedForm>
  );
};

const OfficeTitle = () => {
  const record = useRecordContext();
  if (!record) return null;
  return <>Office {record ? `"${record.title}" (id: ${record.id})` : ""}</>;
};

export const OfficeEdit = () => {
  const {
    error: errorPermissions,
    isLoading: isLoadingPermissions,
    permissions,
  } = usePermissions();

  isLoadingPermissions && <Loading />;
  errorPermissions && <div>Error loading permissions</div>;
  permissions.role !== 1 && permissions.role !== 2 && (
    <div>Not enough permissions</div>
  );

  return (
    <Edit title={<OfficeTitle />}>
      <Editform />
    </Edit>
  );
};
