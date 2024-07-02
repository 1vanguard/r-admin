import {
  AutocompleteInput,
  Create,
  Loading,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  usePermissions,
  useTranslate,
} from "react-admin";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const botFilterToQuery = (searchText: any) => ({
  title_like: `${searchText}`,
});

const CreateForm = () => {
  const translate = useTranslate(),
    baseMin = 0;

  return (
    <SimpleForm>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>{translate("common.pair_create_heading")}</h2>
      </Container>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextInput
              source="symbol"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ReferenceInput label="State" source="state" reference="states">
              <SelectInput
                defaultValue={1}
                optionText="name"
                source="state"
                translateChoice={true}
                validate={required()}
                variant="standard"
              />
            </ReferenceInput>
          </Grid>
          <Grid item xs={12} md={4}>
            <ReferenceInput
              filter={{ state: 1 }}
              label="Bot"
              reference="bots"
              source="bot_id"
            >
              <AutocompleteInput
                filterToQuery={botFilterToQuery}
                optionText="title"
                validate={required()}
                variant="standard"
              />
            </ReferenceInput>
          </Grid>
          {/*
            <Grid item xs={12} sm={4}>
              <SelectInput
                source="strategy"
                choices={strategies}
                validate={required()}
                defaultValue={1}
              />
            </Grid> */}
          <Grid item xs={12} sm={4}>
            <NumberInput
              min={baseMin}
              source="start_orders"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              min={baseMin}
              source="pair_limit"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              min={baseMin}
              source="step"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              min={baseMin}
              source="profit"
              validate={required()}
              variant="standard"
            />
          </Grid>
          {/* <Grid item xs={12} sm={4}>
            <NumberInput
              label="Trailing stop"
              source="stop_offset"
              validate={required()}
              min={baseMin}
            />
          </Grid> */}
        </Grid>
      </Container>
    </SimpleForm>
  );
};

export const PairCreate = () => {
  const translate = useTranslate(),
    {
      permissions,
      isLoading: isLoadingPermissions,
      error: errorPermissions,
    } = usePermissions();

  if (isLoadingPermissions) return <Loading />;
  if (errorPermissions)
    return (
      <div className="error loadPermissions">
        {translate("errors.loadPermissionsError")}
      </div>
    );

  return (
    <Create
      mutationOptions={{ meta: { creator_role: permissions.role } }}
      redirect="list"
    >
      {permissions.role === 1 || permissions.role === 2 ? (
        <CreateForm />
      ) : (
        <div className="warning createPair">
          {translate("warnings.create_pair_warning_01")}
        </div>
      )}
    </Create>
  );
};
