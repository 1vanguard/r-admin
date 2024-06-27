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
import IdMark from "../../layouts/idMark";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Editform = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <SimpleForm toolbar={<PrymaryEditToolbar />}>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>Whitelist settings</h2>
      </Container>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} md={2} lg={1} sx={{ textAlign: "center" }}>
            <IdMark id={record.id} />
          </Grid>
          <Grid item xs={12} sm={8} md={10} lg={11}>
            <TextInput
              margin="none"
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
  if (!record) return null;
  return <>Whitelist {record ? `"${record.symbol}" (id: ${record.id})` : ""}</>;
};

export const WhitelistEdit = () => {
  const {
    error: errorPermissions,
    isLoading: isLoadingPermissions,
    permissions,
  } = usePermissions();

  isLoadingPermissions && <Loading />;
  errorPermissions && <div>Error loading permissions</div>;
  permissions.role !== 1 && permissions.role !== 2 && (
    <div>Not enough permissions</div>
  );

  return (
    <Edit title={<WhitelistTitle />}>
      <Editform />
    </Edit>
  );
};
