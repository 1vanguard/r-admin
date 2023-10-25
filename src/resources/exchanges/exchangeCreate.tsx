import {
  Loading,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  useGetList,
  usePermissions,
} from "react-admin";
import Grid from "@mui/material/Grid";

const CreateForm = () => {
  const {
    data: states,
    isLoading: isLoadingStates,
    error,
  } = useGetList("states");

  if (isLoadingStates) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }

  return (
    <SimpleForm>
      <Grid container spacing={2} maxWidth={700}>
        <Grid item xs={12}>
          <TextInput fullWidth source="title" validate={required()} />
        </Grid>
        <Grid item xs={12}>
          <TextInput fullWidth source="currencies" validate={required()} />
        </Grid>
        <Grid item xs={12}>
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

export const ExchangeCreate = () => {
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
          {role === 1 ? (
            <CreateForm />
          ) : (
            <div>Only admins can create exchanges</div>
          )}
        </>
      </Create>
    );
  }
};
