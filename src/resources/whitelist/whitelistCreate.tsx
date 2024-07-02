import {
  Create,
  Loading,
  required,
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
        <h2>{translate("common.whitelist_create_heading")}</h2>
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
  const translate = useTranslate(),
    {
      error: errorPermissions,
      isLoading: isLoadingPermissions,
      permissions,
    } = usePermissions();

  if (isLoadingPermissions) return <Loading />;
  if (errorPermissions)
    return (
      <div className="error loadPermissions">
        {translate("errors.loadPermissionsError")}
      </div>
    );
  if (permissions.role !== 1 && permissions.role !== 2)
    return (
      <div className="warning notEnoughPermissions">
        {translate("warnings.not_enough_permissions")}
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
        <div className="warning createWhitelist">
          {translate("warnings.create_whitelist_warning_01")}
        </div>
      )}
    </Create>
  );
};
