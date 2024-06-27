import {
  Loading,
  Create,
  SimpleForm,
  TextInput,
  required,
  usePermissions,
} from "react-admin";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const CreateForm = () => {
  return (
    <SimpleForm>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>Whitelist item create</h2>
      </Container>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextInput
              source="symbol"
              validate={required()}
              variant="standard"
            />
          </Grid>
        </Grid>
      </Container>
    </SimpleForm>
  );
};

export const WhitelistCreate = () => {
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
    <Create
      mutationOptions={{ meta: { creator_role: permissions.role } }}
      redirect="list"
    >
      {permissions.role === 1 ? (
        <CreateForm />
      ) : (
        <div>Only admins can create whitelists</div>
      )}
    </Create>
  );
};
