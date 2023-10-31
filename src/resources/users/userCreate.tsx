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
} from "react-admin";
import Grid from "@mui/material/Grid";

const CreateForm = () => {
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

  if (isLoadingStates || isLoadingRoles) {
    return <Loading />;
  }
  if (errorStates || errorRoles) {
    return <p>ERROR</p>;
  }

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
          <ReferenceInput label="Office" source="officeId" reference="offices">
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
            source="role"
            choices={roles}
            validate={required()}
            defaultValue={2}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectInput
            fullWidth
            source="state"
            choices={states}
            validate={required()}
            defaultValue={1}
          />
        </Grid>
      </Grid>
    </SimpleForm>
  );
};

export const UserCreate = () => {
  const { isLoading, permissions } = usePermissions(),
    role = permissions.role;

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Create
        mutationOptions={{ meta: { creator_role: role } }}
        redirect="list"
      >
        <>
          {role === 1 || role === 2 ? (
            <CreateForm />
          ) : (
            <div>Only admins can create users</div>
          )}
        </>
      </Create>
    );
  }
};
