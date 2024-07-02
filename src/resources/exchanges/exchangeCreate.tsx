import {
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

const CreateForm = () => {
  const translate = useTranslate();
  return (
    <SimpleForm>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>{translate("common.exchange_create_heading")}</h2>
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
            <TextInput
              source="currencies"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <ReferenceInput source="state" reference="states">
              <SelectInput
                defaultValue={1}
                optionText="name"
                source="state"
                translateChoice={true}
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

export const ExchangeCreate = () => {
  const translate = useTranslate(),
    {
      permissions,
      isLoading: isLoadingPermissions,
      error: errorPermissions,
    } = usePermissions();

  if (isLoadingPermissions) return <Loading />;
  if (errorPermissions)
    return (
      <div className="error loadPermissions">
        {translate("errors.loadPermissionsError")}
      </div>
    );

  return (
    <Create
      mutationOptions={{ meta: { creator_role: permissions.role } }}
      redirect="list"
    >
      {permissions.role === 1 ? (
        <CreateForm />
      ) : (
        <div className="warning createExchange">{translate("warnings.create_exchange_warning_01")}</div>
      )}
    </Create>
  );
};
