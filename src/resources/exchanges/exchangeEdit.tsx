import {
  Edit,
  Loading,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetList,
  usePermissions,
  useRecordContext,
} from "react-admin";

import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";

import Container from "@mui/material/Container";
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
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>Office main settings</h2>
      </Container>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} md={2} lg={1} sx={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "0.8em",
                lineHeight: "0.8em",
                verticalAlign: "top",
              }}
            >
              ID
            </div>
            <div
              style={{
                fontSize: "1.2em",
                fontWeight: 700,
                lineHeight: "2.1em",
              }}
            >
              {record.id}
            </div>
          </Grid>
          <Grid item xs>
            <TextInput
              defaultValue={record.title}
              fullWidth
              margin="none"
              source="title"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              fullWidth
              source="currencies"
              defaultValue={record.currencies}
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <SelectInput
              choices={states}
              defaultValue={1}
              fullWidth
              source="state"
              validate={required()}
              variant="standard"
            />
          </Grid>
        </Grid>
      </Container>
    </SimpleForm>
  );
};

const ExchangeTitle = () => {
  const record = useRecordContext();
  return <>Exchange {record ? `"${record.title}" (id: ${record.id})` : ""}</>;
};

export const ExchangeEdit = () => {
  const {
    error: errorPermissions,
    isLoading: isLoadingPermissions,
    permissions,
  } = usePermissions();

  isLoadingPermissions && <Loading />;
  errorPermissions && <div>Error loading permissions</div>;
  permissions.role !== 1 && <div>Not enough permissions</div>;

  return (
    <Edit title={<ExchangeTitle />}>
      <Editform />
    </Edit>
  );
};
