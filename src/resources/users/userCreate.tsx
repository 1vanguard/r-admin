import {
  AutocompleteInput,
  Create,
  Loading,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetList,
  useGetOne,
  useNotify,
  usePermissions,
  useRedirect,
  useTranslate,
} from "react-admin";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const officeFilterToQuery = (searchText: any) => ({
  title_like: `${searchText}`,
});

const CreateForm = () => {
  const translate = useTranslate(),
    userId = localStorage.getItem("uid"),
    {
      data: user,
      isLoading: isLoadingUser,
      error: errorUser,
    } = useGetOne("users", { id: userId }),
    { permissions, isLoading: isLoadingPermissions } = usePermissions();

  if (isLoadingPermissions || isLoadingUser) return <Loading />;
  if (errorUser) return <div className="error dataError">{translate("errors.loadDataError")}</div>;

  const userOfficeId = user?.officeId;

  return (
    <SimpleForm>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>{translate("common.user_create_heading")}</h2>
      </Container>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={permissions.role === 1 ? 6 : 12}>
            <TextInput
              source="username"
              validate={required()}
              variant="standard"
            />
          </Grid>
          {permissions.role === 1 && (
            <Grid item xs={12} sm={6}>
              <TextInput
                source="password"
                type="password"
                validate={required()}
                variant="standard"
              />
            </Grid>
          )}
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <ReferenceInput
              label="Role"
              reference="roles"
              source="role"
              {...(permissions.role === 2 && { filter: { id: 3 } })}
            >
              <SelectInput
                optionText="name"
                source="role"
                validate={required()}
                variant="standard"
                {...(permissions.role === 2 && { defaultValue: 3 })}
              />
            </ReferenceInput>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ReferenceInput
              label="Office"
              reference="offices"
              source="officeId"
              {...(permissions.role === 2 && { filter: { id: userOfficeId } })}
            >
              <>
                {permissions.role === 1 && (
                  <AutocompleteInput
                    filterToQuery={officeFilterToQuery}
                    optionText="title"
                    validate={required()}
                    variant="standard"
                  />
                )}
                {permissions.role === 2 && (
                  <SelectInput
                    optionText="title"
                    optionValue="id"
                    validate={required()}
                    variant="standard"
                    {...(permissions.role === 2 && {
                      defaultValue: userOfficeId,
                    })}
                  />
                )}
              </>
            </ReferenceInput>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              source="firstName"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              source="lastName"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              source="email"
              type="email"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              source="telegram"
              validate={required()}
              variant="standard"
            />
          </Grid>
        </Grid>
      </Container>
    </SimpleForm>
  );
};

export const UserCreate = () => {
  const translate = useTranslate(),
    { permissions, isLoading: isLoadingPermissions } = usePermissions(),
    {
      data: exchanges,
      isLoading: isLoadingExchanges,
      error: errorExchanges,
    } = useGetList("exchanges"),
    {
      data: offices,
      isLoading: isLoadingOffices,
      error: errorOffices,
    } = useGetList("offices"),
    notify = useNotify(),
    redirect = useRedirect();

  if (isLoadingPermissions || isLoadingExchanges || isLoadingOffices)
    return <Loading />;
  if (errorExchanges || errorOffices)
    return (
      <div className="error loadPermissions">
        {translate("errors.loadPermissionsError")}
      </div>
    );

  if (offices.length === 0) {
    notify(translate("warnings.create_user_warning_02"));
    redirect("offices");
  }
  if (exchanges.length === 0) {
    notify(translate("warnings.create_user_warning_03"));
    redirect("exchanges");
  }

  return (
    <Create
      mutationOptions={{ meta: { creator_role: permissions.role } }}
      redirect="list"
    >
      {permissions.role === 1 || permissions.role === 2 ? (
        <CreateForm />
      ) : (
        <div className="warning createUser">
          {translate("warnings.create_user_warning_01")}
        </div>
      )}
    </Create>
  );
};
