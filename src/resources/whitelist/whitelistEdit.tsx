import {
  Loading,
  Edit,
  SimpleForm,
  TextInput,
  required,
  useRecordContext,
  usePermissions,
} from "react-admin";
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const Editform = () => {
  const record = useRecordContext();

  if (!record) {
    return <div>Record error</div>;
  }

  return (
    <SimpleForm toolbar={<PrymaryEditToolbar />}>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>Whitelist settings</h2>
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
          <Grid item xs={12} sm={8} md={10} lg={11}>
            <TextInput
              margin="none"
              fullWidth
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

const WhitelistTitle = () => {
  const record = useRecordContext();
  return (
    <>Whitelist {record ? `"${record.symbol}" (id: ${record.id})` : ""}</>
  );
};

export const WhitelistEdit = () => {
  const {
    error: errorPermissions,
    isLoading: isLoadingPermissions,
    permissions,
  } = usePermissions();

  if (isLoadingPermissions) {
    return <Loading />;
  }

  if (errorPermissions) {
    return <div>Error loading permissions</div>;
  }

  if (permissions.role !== 1 && permissions.role !== 2) {
    return <div>Not enough permissions</div>;
  }

  return (
    <Edit title={<WhitelistTitle />}>
      <Editform />
    </Edit>
  );
};
