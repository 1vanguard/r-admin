import * as React from "react";
import {
  Loading,
  Edit,
  TabbedForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  required,
  useRecordContext,
  NumberInput,
  AutocompleteInput,
  BooleanInput,
  useGetList,
} from "react-admin";

import Grid from "@mui/material/Grid";
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import { PeriodsSelectInput } from "../../layouts/periodsSelectInput";
import { TimeFramesSelectInput } from "../../layouts/timeFramesSelectInput";

const botFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  }),
  entryShortRsiTfToFilter = [5, 15, 30, 60, 240],
  entryLongRsiTfToFilter = [30, 60, 240],
  autoPairRsiTfToFilter = [30, 60, 240, 1440],
  aiutoSellRsiTfToFilter = [5, 15, 30, 60, 240, 1440],
  autoRsiSellPeriodOptionsToFilter = [6, 8, 10, 12, 14],
  baseMin = 0;

const Editform = () => {
  const userId = localStorage.getItem("uid"),
    record = useRecordContext();

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

  if (!record || isLoadingStates || isLoadingStrategies) {
    return <Loading />;
  }
  if (errorStates || errorStrategies) {
    return <div>ERROR</div>;
  }

  return (
    <TabbedForm
      toolbar={<PrymaryEditToolbar />}
      id="editPairForm"
      syncWithLocation={false}
    >
      <TabbedForm.Tab label="Pair">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={2} lg={1}>
            <TextInput
              fullWidth
              disabled
              label="Id"
              source="id"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ReferenceInput label="Bot" source="bot_id" reference="bots">
              <AutocompleteInput
                fullWidth
                optionText="title"
                validate={required()}
                filterToQuery={botFilterToQuery}
              />
            </ReferenceInput>
          </Grid>
          <Grid item xs={12} sm={4}>
            <SelectInput
              fullWidth
              source="strategy"
              choices={strategies}
              validate={required()}
              defaultValue={record.state}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextInput
              fullWidth
              label="Base Currency"
              source="base_cur"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextInput
              fullWidth
              label="Alternative Currency"
              source="alt_cur"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Interval, ms"
              source="interval"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <BooleanInput label="Reinvest" source="reinvest" />
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
              label="The initial amount of the order, in the base currency"
              source="start_sum"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Start offset"
              source="start_offset"
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
              label="Martingale"
              source="martin"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Additional Martingale"
              source="add_martin"
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
              label="Additional Step"
              source="add_step"
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
              label="Squiz"
              source="squiz"
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
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Percentage of market growth"
              source="growth"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Timeout (sec)"
              source="start_timeout"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Timeout after purchase (sec)"
              source="next_buy_timeout"
              validate={required()}
              min={baseMin}
            />
          </Grid>
        </Grid>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Indicators">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="RSI period"
              source="rsi_period"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="RSI min"
              source="rsi_min"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="RSI max"
              source="rsi_max"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TimeFramesSelectInput
              fullWidth
              name="rsi_short_tf"
              label="The RSI timeframe for entry (short)"
              frameChoices={entryShortRsiTfToFilter}
            />
          </Grid>
          <Grid item xs={12}>
            <BooleanInput
              label="Use a long timeframe when buying"
              source="use_ltf"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="RSI period (long)"
              source="rsi_period_1h"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="RSI min (long)"
              source="rsi_min_1h"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="RSI max (long)"
              source="rsi_max_1h"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TimeFramesSelectInput
              fullWidth
              name="rsi_long_tf"
              label="The RSI timeframe for entry (long)"
              frameChoices={entryLongRsiTfToFilter}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <BooleanInput label="Auto" source="is_auto" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Difference from the previous RSI, %"
              source="rsi_diff"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <BooleanInput label="Sell on the RSI signal" source="rsi_sell" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Difference from the previous RSI for sale, %"
              source="rsi_sell_diff"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TimeFramesSelectInput
              fullWidth
              name="auto_pair_tf"
              label="The RSI timeframe for entering the pair"
              frameChoices={autoPairRsiTfToFilter}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PeriodsSelectInput
              fullWidth
              name="auto_sell_period"
              label="The RSI period for sale"
              periodChoices={autoRsiSellPeriodOptionsToFilter}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Min RSI to enter the pair"
              source="auto_rsi_min_big"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Max RSI to enter the pair"
              source="auto_rsi_max_big"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TimeFramesSelectInput
              fullWidth
              name="auto_sell_tf"
              label="The RSI timeframe for sale"
              frameChoices={aiutoSellRsiTfToFilter}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Min RSI for sale"
              source="auto_rsi_min_sell"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Max RSI for sale"
              source="auto_rsi_max_sell"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Max growth per day, %"
              source="pd_up"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Min growth per day, %"
              source="pd_down"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="Pause, until"
              source="pause_until"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="A percentage increase in the price for blocking for a month"
              source="long_pump"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <NumberInput
              fullWidth
              label="A percentage drop in the price for blocking for a month"
              source="long_dump"
              min={baseMin}
            />
          </Grid>
        </Grid>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="3">
        <Grid container spacing={2}></Grid>
      </TabbedForm.Tab>
    </TabbedForm>
  );
};

export const PairEdit = () => {
  return (
    <Edit>
      <Editform />
    </Edit>
  );
};
