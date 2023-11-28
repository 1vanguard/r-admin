import {
  Loading,
  Edit,
  TabbedForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  useRecordContext,
  useGetList,
  usePermissions,
} from "react-admin";

import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import Grid from "@mui/material/Grid";

const Editform = () => {
  const record = useRecordContext();

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

  if (!record || isLoadingStates || isLoadingRoles) {
    return <Loading />;
  }
  if (errorStates || errorRoles) {
    return <p>ERROR</p>;
  }

  return (
    <TabbedForm toolbar={<PrymaryEditToolbar />} id="editUserForm"  syncWithLocation={false}>
      <TabbedForm.Tab label="General">
        <Grid container spacing={2} maxWidth={700}>
          <Grid item xs="auto">
            <TextInput
              disabled
              label="Id"
              source="id"
              style={{ maxWidth: "7em" }}
            />
          </Grid>
          <Grid item xs sm>
            <TextInput
              fullWidth
              disabled
              source="username"
              defaultValue={record.username}
            />
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
            >
              <SelectInput
                fullWidth
                optionText="title"
                optionValue="id"
                validate={required()}
              />
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
