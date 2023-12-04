import {
  Loading,
  Create,
  SimpleForm,
  AutocompleteInput,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  useGetList,
  usePermissions,
} from "react-admin";
import Grid from "@mui/material/Grid";

const exchangeFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  }),
  usernameFilterToQuery = (searchText: any) => ({
    username_like: `${searchText}`,
  });

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
        <Grid item xs={12} md={4}>
          <ReferenceInput label="Client" source="client_id" reference="users">
            <AutocompleteInput
              fullWidth
              optionText="username"
              validate={required()}
              filterToQuery={usernameFilterToQuery}
            />
          </ReferenceInput>
        </Grid>
        <Grid item xs={12} md={4}>
          <ReferenceInput
            label="Exchange"
            source="exchange"
            reference="exchange"
          >
            <AutocompleteInput
              fullWidth
              optionText="title"
              validate={required()}
              filterToQuery={exchangeFilterToQuery}
            />
          </ReferenceInput>
        </Grid>
        <Grid item xs={12} md={4}>
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

export const BotCreate = () => {
  const { permissions, isLoading: isLoadingPermissions } = usePermissions(),
    role = permissions.role;

  if (isLoadingPermissions) return <Loading />;

  return (
    <Create mutationOptions={{ meta: { creator_role: role } }} redirect="list">
      <>
        {role === 1 || role === 2 ? (
          <CreateForm />
        ) : (
          <div>Only admins and managers can create bots</div>
        )}
      </>
    </Create>
  );
};
