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
  useTranslate,
} from "react-admin";

import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import IdMark from "../../layouts/idMark";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Editform = () => {
  const record = useRecordContext(),
    translate = useTranslate();
  if (!record) return null;
  const {
    data: states,
    isLoading: isLoadingStates,
    error: errorStates,
  } = useGetList("states");

  if (isLoadingStates) return <Loading />;
  if (errorStates) return <div className="error loadStates">{translate("errors.loadDataError")}</div>;

  return (
    <TabbedForm toolbar={<PrymaryEditToolbar />} id="editOfficeForm">
      <TabbedForm.Tab label="common.office_edit_tab_01">
        <Container maxWidth="md" sx={{ ml: 0 }}>
          <h2>{translate("common.office_edit_tab_01_main_heading")}</h2>
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
      <TabbedForm.Tab label="common.office_edit_tab_02">
        <Container maxWidth="xl" sx={{ ml: 0 }}>
          <h2>{translate("common.office_edit_tab_02_main_heading")}</h2>
        </Container>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="common.office_edit_tab_03">
        <Container maxWidth="xl" sx={{ ml: 0 }}>
          <h2>{translate("common.office_edit_tab_03_main_heading")}</h2>
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
              <ReferenceField source="role" reference="roles">
                <FunctionField render={(record: any) => record.name} />
              </ReferenceField>
              <ReferenceField source="state" reference="states">
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
  const record = useRecordContext(),
    translate = useTranslate();
  if (!record) return null;
  return <>{translate("common.office")} {record ? `"${record.title}" (id: ${record.id})` : ""}</>;
};

export const OfficeEdit = () => {
  const {
    error: errorPermissions,
    isLoading: isLoadingPermissions,
    permissions,
  } = usePermissions();

  if (isLoadingPermissions) return <Loading />;
  if (errorPermissions) return <div className="error loadPermissions">{translate("errors.loadPermissionsError")}</div>;
  permissions.role !== 1 && permissions.role !== 2 && (
    <div className="warning notEnoughPermissions">{translate("warnings.not_enough_permissions")}</div>
  );

  return (
    <Edit title={<OfficeTitle />}>
      <Editform />
    </Edit>
  );
};
