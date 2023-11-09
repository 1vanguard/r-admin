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
} from "react-admin";
import Grid from "@mui/material/Grid";

const CreateForm = () => {
  const userId = localStorage.getItem("uid"),
    {
      data: user,
      isLoading: isLoadingUser,
      error: errorUser,
    } = useGetOne("users", { id: userId }),
    { permissions, isLoading: isLoadingPermissions } = usePermissions()

  if (isLoadingPermissions)
    return <Loading />;

  const role = permissions.role,
    userOfficeId = user?.officeId;

  return (
    <SimpleForm>
      <Grid container spacing={2} maxWidth={700}>
        <Grid item xs={12} sm={6}>
          <TextInput fullWidth source="username" validate={required()} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            fullWidth
            source="password"
            type="password"
            validate={required()}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput fullWidth source="firstName" validate={required()} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput fullWidth source="lastName" validate={required()} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            fullWidth
            source="email"
            type="email"
            validate={required()}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput fullWidth source="telegram" validate={required()} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ReferenceInput
            label="Office"
            source="officeId"
            reference="offices"
            {...(role === 2 && { filter: { id: userOfficeId } })}
          >
            <SelectInput
              fullWidth
              optionText="title"
              optionValue="id"
              validate={required()}
              {...(role === 2 && { defaultValue: userOfficeId })}
            />
          </ReferenceInput>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ReferenceInput
            label="Role"
            source="role"
            reference="roles"
            {...(role === 2 && { filter: { id: 3 } })}
          >
            <SelectInput
              fullWidth
              optionText="name"
              source="role"
              validate={required()}
              {...(role === 2 && { defaultValue: 3 })}
            />
          </ReferenceInput>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ReferenceInput label="State" source="state" reference="states">
            <SelectInput
              fullWidth
              optionText="name"
              source="state"
              validate={required()}
              defaultValue={1}
            />
          </ReferenceInput>
        </Grid>
      </Grid>
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
    redirect = useRedirect(),
    role = permissions.role;

  if (isLoadingPermissions || isLoadingExchanges || isLoadingOffices)
    return <Loading />;
  if (errorExchanges || errorOffices) return <p>ERROR</p>;

  if (offices.length === 0) {
    notify(`Offices are not created. Please, create offices first`);
    redirect("offices");
  }
  if (exchanges.length === 0) {
    notify(`Exchanges are not created. Please, create exchanges first`);
    redirect("exchanges");
  }

  return (
    <Create mutationOptions={{ meta: { creator_role: role } }} redirect="list">
      <>
        {role === 1 || role === 2 ? (
          <CreateForm />
        ) : (
          <div>Only admins and managers can create users</div>
        )}
      </>
    </Create>
  );
};
