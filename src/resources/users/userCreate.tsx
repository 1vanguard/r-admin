import {
  Loading,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  required,
  useGetList,
  usePermissions,
  useGetOne,
  useNotify,
  useRedirect,
  AutocompleteInput,
} from "react-admin";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const officeFilterToQuery = (searchText: any) => ({
  title_like: `${searchText}`,
});

const CreateForm = () => {
  const userId = localStorage.getItem("uid"),
    {
      data: user,
      isLoading: isLoadingUser,
      error: errorUser,
    } = useGetOne("users", { id: userId }),
    { permissions, isLoading: isLoadingPermissions } = usePermissions();

  if (isLoadingPermissions || isLoadingUser) return <Loading />;
  if (errorUser) return <div>Error loading user</div>;

  const userOfficeId = user?.officeId;

  return (
    <SimpleForm>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>Create new user</h2>
      </Container>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={permissions.role === 1 ? 6 : 12}>
            <TextInput
              fullWidth
              source="username"
              validate={required()}
              variant="standard"
            />
          </Grid>
          {permissions.role === 1 && (
            <Grid item xs={12} sm={6}>
              <TextInput
                fullWidth
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
                fullWidth
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
                fullWidth
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
                    fullWidth
                    optionText="title"
                    validate={required()}
                    variant="standard"
                  />
                )}
                {permissions.role === 2 && (
                  <SelectInput
                    fullWidth
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
              fullWidth
              source="firstName"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              fullWidth
              source="lastName"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              fullWidth
              source="email"
              type="email"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              fullWidth
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
  const { permissions, isLoading: isLoadingPermissions } = usePermissions(),
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
    redirect = useRedirect()

  if (isLoadingPermissions || isLoadingExchanges || isLoadingOffices)
    return <Loading />;
  if (errorExchanges || errorOffices)
    return <div>Error loading permissions or offices</div>;

  if (offices.length === 0) {
    notify(`Offices are not created. Please, create offices first`);
    redirect("offices");
  }
  if (exchanges.length === 0) {
    notify(`Exchanges are not created. Please, create exchanges first`);
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
        <div>Only admins and managers can create users</div>
      )}
    </Create>
  );
};
