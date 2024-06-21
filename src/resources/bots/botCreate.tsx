import {
  AutocompleteInput,
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

const exchangeFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  }),
  usernameFilterToQuery = (searchText: any) => ({
    username_like: `${searchText}`,
  });

const CreateForm = () => {
  return (
    <SimpleForm>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>Create new bot</h2>
      </Container>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextInput
              fullWidth
              source="title"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ReferenceInput label="State" source="state" reference="states">
              <SelectInput
                defaultValue={1}
                fullWidth
                optionText="name"
                source="state"
                validate={required()}
                variant="standard"
              />
            </ReferenceInput>
          </Grid>
          <Grid item xs={12} md={4}>
            <ReferenceInput
              filter={{ state: 1 }}
              label="Client"
              reference="users"
              source="client_id"
            >
              <AutocompleteInput
                filterToQuery={usernameFilterToQuery}
                fullWidth
                optionText="username"
                validate={required()}
                variant="standard"
              />
            </ReferenceInput>
          </Grid>
          <Grid item xs={12} md={4}>
            <ReferenceInput
              filter={{ state: 1 }}
              label="Exchange"
              reference="exchange"
              source="exchange"
            >
              <AutocompleteInput
                filterToQuery={exchangeFilterToQuery}
                fullWidth
                optionText="title"
                validate={required()}
                variant="standard"
              />
            </ReferenceInput>
          </Grid>
        </Grid>
      </Container>
    </SimpleForm>
  );
};

export const BotCreate = () => {
  const {
    permissions,
    isLoading: isLoadingPermissions,
    error: errorPermissions,
  } = usePermissions();

  isLoadingPermissions && <Loading />
  errorPermissions && <div>Error loading permissions</div>

  return (
    <Create
      mutationOptions={{ meta: { creator_role: permissions.role } }}
      redirect="list"
    >
      {permissions.role === 1 || permissions.role === 2 ? (
        <CreateForm />
      ) : (
        <div>Only admins and managers can create bots</div>
      )}
    </Create>
  );
};
