import {
  Create,
  Loading,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  usePermissions,
} from "react-admin";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const CreateForm = () => {
  return (
    <SimpleForm>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>Create new office</h2>
      </Container>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextInput
              source="title"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <ReferenceInput label="State" source="state" reference="states">
              <SelectInput
                defaultValue={1}
                optionText="name"
                source="state"
                validate={required()}
                variant="standard"
              />
            </ReferenceInput>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextInput
            source="address"
            validate={required()}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput source="phone" validate={required()} variant="standard" />
        </Grid>
        <Grid item xs={12}>
          <TextInput source="url" variant="standard" />
        </Grid>
      </Container>
    </SimpleForm>
  );
};

export const OfficeCreate = () => {
  const {
    permissions,
    isLoading: isLoadingPermissions,
    error: errorPermissions,
  } = usePermissions();

  isLoadingPermissions && <Loading />;
  errorPermissions && <div>Error loading permissions</div>;

  return (
    <Create
      mutationOptions={{ meta: { creator_role: permissions.role } }}
      redirect="list"
    >
      {permissions.role === 1 ? (
        <CreateForm />
      ) : (
        <div>Only admins can create offices</div>
      )}
    </Create>
  );
};
