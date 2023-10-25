import {
  Loading,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  useGetList,
  useRecordContext,
  usePermissions,
} from "react-admin";
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import Grid from "@mui/material/Grid";

const Editform = () => {
  const record = useRecordContext();

  const {
    data: states,
    isLoading: isLoadingStates,
    error,
  } = useGetList("states");

  if (!record || isLoadingStates) {
    return <Loading />;
  }
  if (error) {
    return <div>ERROR</div>;
  }

  return (
    <SimpleForm toolbar={<PrymaryEditToolbar />}>
      <Grid container spacing={2} maxWidth={700}>
        <Grid item xs="auto">
          <TextInput
            disabled
            label="Id"
            source="id"
            style={{ maxWidth: "7em" }}
          />
        </Grid>
        <Grid item xs>
          <TextInput
            fullWidth
            source="title"
            defaultValue={record.title}
            validate={required()}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            fullWidth
            source="address"
            defaultValue={record.address}
            validate={required()}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            fullWidth
            source="phone"
            defaultValue={record.phone}
            validate={required()}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            fullWidth
            source="url"
            defaultValue={record.url}
            validate={required()}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectInput
            fullWidth
            source="state"
            choices={states}
            validate={required()}
            defaultValue={record.state}
          />
        </Grid>
      </Grid>
    </SimpleForm>
  );
};

export const OfficeEdit = () => {
  const { isLoading, permissions } = usePermissions();

  if (isLoading) {
    return <Loading />;
  } else {
    const role = permissions.role;

    if (role === 1) {
      return (
        <Edit>
          <Editform />
        </Edit>
      );
    } else {
      return <div>Not enough permissions</div>;
    }
  }
};
