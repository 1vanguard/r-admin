import {
  Edit,
  Loading,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetList,
  usePermissions,
  useRecordContext,
  useTranslate,
} from "react-admin";

import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import IdMark from "../../layouts/idMark";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Editform = () => {
  const record = useRecordContext(),
    translate = useTranslate();
  if (!record) return null;
  const {
    data: states,
    isLoading: isLoadingStates,
    error: errorStates,
  } = useGetList("states");

  if (isLoadingStates) return <Loading />;
  if (errorStates)
    return (
      <div className="error loadStates">
        {translate("errors.loadDataError")}
      </div>
    );

  return (
    <SimpleForm toolbar={<PrymaryEditToolbar />}>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>{translate("common.exchange_main_heading")}</h2>
      </Container>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} md={2} lg={1} sx={{ textAlign: "center" }}>
            <IdMark id={record.id} />
          </Grid>
          <Grid item xs>
            <TextInput
              defaultValue={record.title}
              margin="none"
              source="title"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
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
              source="state"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <NumberInput
              source="min_order_usdt"
              // validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <NumberInput
              source="market_type"
              // validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <NumberInput
              source="comission_sell"
              // validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <NumberInput
              source="comission_buy"
              // validate={required()}
              variant="standard"
            />
          </Grid>
        </Grid>
      </Container>
    </SimpleForm>
  );
};

const ExchangeTitle = () => {
  const record = useRecordContext(),
    translate = useTranslate();
  if (!record) return null;
  return (
    <>
      {translate("common.exchange")}{" "}
      {record ? `"${record.title}" (id: ${record.id})` : ""}
    </>
  );
};

export const ExchangeEdit = () => {
  const translate = useTranslate(),
    {
      error: errorPermissions,
      isLoading: isLoadingPermissions,
      permissions,
    } = usePermissions();

  if (isLoadingPermissions) return <Loading />;
  if (errorPermissions)
    return (
      <div className="error loadPermissions">
        {translate("errors.loadPermissionsError")}
      </div>
    );
  if (permissions.role !== 1)
    return (
      <div className="warning notEnoughPermissions">
        {translate("warnings.not_enough_permissions")}
      </div>
    );

  const userId = localStorage.getItem("uid"),
    parsedUserId = userId ? parseInt(userId) : null,
    transform = (data) => ({
      ...data,
      modified_by: parsedUserId,
    });

  return (
    <Edit title={<ExchangeTitle />} transform={transform}>
      <Editform />
    </Edit>
  );
};
