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
            />
          </ReferenceInput>
        </Grid>
        <Grid item xs={12} md={4}>
          <ReferenceInput
            label="Exchange"
            source="exchange"
            reference="exchange"
          >
            <SelectInput
              fullWidth
              optionText="title"
              source="exchange"
              validate={required()}
              defaultValue={1}
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
          {role === 1 ? <CreateForm /> : <div>Only admins can create bots</div>}
        </>
      </Create>
    );
  }
};
