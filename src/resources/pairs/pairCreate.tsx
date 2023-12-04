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
import Grid from "@mui/material/Grid";

const botFilterToQuery = (searchText: any) => ({
  title_like: `${searchText}`,
});

const CreateForm = () => {
  const baseMin = 0;

  const {
    data: states,
    isLoading: isLoadingStates,
    error: errorStates,
  } = useGetList("states");

  const {
    data: strategies,
    isLoading: isLoadingStrategies,
    error: errorStrategies,
  } = useGetList("strategies");

  if (isLoadingStates || isLoadingStrategies) {
    return <Loading />;
  }
  if (errorStates || errorStrategies) {
    return <p>ERROR</p>;
  }

  return (
    <SimpleForm>
      <Grid container spacing={2} maxWidth={700}>
        <Grid item xs={12}>
          <TextInput fullWidth source="symbol" validate={required()} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ReferenceInput label="Bot" source="bot_id" reference="bots">
            <AutocompleteInput
              fullWidth
              optionText="title"
              validate={required()}
              filterToQuery={botFilterToQuery}
            />
          </ReferenceInput>
        </Grid>
        {/* <Grid item xs={12} md={4}>
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
        </Grid> */}
        <Grid item xs={12} sm={4}>
          <SelectInput
            fullWidth
            source="strategy"
            choices={strategies}
            validate={required()}
            defaultValue={1}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NumberInput
            fullWidth
            label="Start Orders"
            source="start_orders"
            validate={required()}
            min={baseMin}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NumberInput
            fullWidth
            label="Pair limit"
            source="pair_limit"
            validate={required()}
            min={baseMin}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NumberInput
            fullWidth
            label="Step"
            source="step"
            validate={required()}
            min={baseMin}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NumberInput
            fullWidth
            label="Profit in %"
            source="profit"
            validate={required()}
            min={baseMin}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NumberInput
            fullWidth
            label="Trailing stop"
            source="stop_offset"
            validate={required()}
            min={baseMin}
          />
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

export const PairCreate = () => {
  const { permissions, isLoading: isLoadingPermissions } = usePermissions(),
    role = permissions.role;

  if (isLoadingPermissions) return <Loading />;

  return (
    <Create mutationOptions={{ meta: { creator_role: role } }} redirect="list">
      <>
        {role === 1 || role === 2 ? (
          <CreateForm />
        ) : (
          <div>Only admins and managers can create pairs</div>
        )}
      </>
    </Create>
  );
};
