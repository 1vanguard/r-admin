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
  NumberInput,
} from "react-admin";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const botFilterToQuery = (searchText: any) => ({
  title_like: `${searchText}`,
});

const CreateForm = () => {
  const baseMin = 0;

  return (
    <SimpleForm>
      <Container maxWidth="md" sx={{ ml: 0 }}>
        <h2>Create new pair</h2>
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
              label="Start Orders"
              min={baseMin}
              source="start_orders"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              label="Pair limit"
              min={baseMin}
              source="pair_limit"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              label="Step"
              min={baseMin}
              source="step"
              validate={required()}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              label="Profit in %"
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
  const {
    permissions,
    isLoading: isLoadingPermissions,
    error: errorPermissions,
  } = usePermissions();

  isLoadingPermissions && <Loading />;
  errorPermissions && <div>Error loading permissions</div>;

  return (
    <Create
      mutationOptions={{ meta: { creator_role: permissions.role } }}
      redirect="list"
    >
      {permissions.role === 1 || permissions.role === 2 ? (
        <CreateForm />
      ) : (
        <div>Only admins and managers can create pairs</div>
      )}
    </Create>
  );
};
