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
  useTranslate,
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
  const translate = useTranslate();
  return (
    <SimpleForm>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>{translate("common.bot_create_heading")}</h2>
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
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
            <ReferenceInput
              filter={{ state: 1 }}
              reference="users"
              source="client_id"
            >
              <AutocompleteInput
                filterToQuery={usernameFilterToQuery}
                label="common.client"
                optionText="username"
                validate={required()}
                variant="standard"
              />
            </ReferenceInput>
          </Grid>
          <Grid item xs={12} md={4}>
            <ReferenceInput
              filter={{ state: 1 }}
              reference="exchange"
              source="exchange"
            >
              <AutocompleteInput
                filterToQuery={exchangeFilterToQuery}
                label="resources.bots.fields.exchange_id"
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
  const translate = useTranslate();
  const {
    permissions,
    isLoading: isLoadingPermissions,
    error: errorPermissions,
  } = usePermissions();

  if (isLoadingPermissions) return <Loading />;
  if (errorPermissions) return <div className="error loadPermissions">{translate("error.loadPermissionsError")}</div>;

  return (
    <Create
      mutationOptions={{ meta: { creator_role: permissions.role } }}
      redirect="list"
    >
      {permissions.role === 1 || permissions.role === 2 ? (
        <CreateForm />
      ) : (
        <div className="warning createBotWarning">{translate("warnings.create_bot_warning_01")}</div>
      )}
    </Create>
  );
};
