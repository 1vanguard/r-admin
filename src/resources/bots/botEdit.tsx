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

import { TimeFramesSelectInput } from "../../layouts/timeFramesSelectInput";
import { PeriodsSelectInput } from "../../layouts/periodsSelectInput";
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import Grid from "@mui/material/Grid";

const autoPairTfToFilter = [0, 30, 60, 240, 1440],
  autoShortTfToFilter = [5, 15, 30, 60, 240],
  autoLongTfToFilter = [30, 60, 240],
  autoSellTfToFilter = [0, 5, 15, 30, 60, 240, 1440];

const autoRsiPeriodOptionsToFilter = [6, 8, 10, 14],
  autoRsiPeriod1hOptionsToFilter = [6, 8, 12, 14],
  autoSellPeriodOptionsToFilter = [6, 8, 10, 12, 14];

const autoSortOptions = [
  { id: 1, name: "Value" },
  { id: 2, name: "Volatility" },
];

const Editform = () => {
  const record = useRecordContext();

  if (!record) {
    return <Loading />;
  }
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
    <TabbedForm toolbar={<PrymaryEditToolbar />}>
      <TabbedForm.Tab label="General">
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
          <Grid item xs={12} sm={8} md={10} lg={11}>
            <TextInput
              fullWidth
              source="title"
              defaultValue={record.title}
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectInput
              fullWidth
              source="state"
              choices={states}
              validate={required()}
              defaultValue={record.state}
            />
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
              source="exchange_id"
              reference="exchanges"
            >
              <AutocompleteInput
                fullWidth
                optionText="title"
                validate={required()}
              />
            </ReferenceInput>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              label="API Key"
              source="apikey"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              label="API Secret"
              source="apisecret"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              fullWidth
              label="Replenishment currency"
              source="baseAsset"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Trading limit"
              source="botlimit"
              min={0}
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BooleanInput
              label="BNB is used to pay commissions"
              source="useBNB"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BooleanInput label="Enable autotrading" source="auto_on" />
          </Grid>
        </Grid>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Auto">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Pairs quantity"
              source="auto_pair_count"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Limit for a pair"
              source="auto_limit_pair"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Number of orders in a pair"
              source="auto_order_count"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Indent in %"
              source="auto_offset"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Initial order amount"
              source="auto_start_sum"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Order step, in %"
              source="auto_step"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Martingale, in %"
              source="auto_martin"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Profit, in %"
              source="auto_profit"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Slippage, in %"
              source="auto_squiz"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Min. daily trading volume"
              source="auto_min_vol"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max. daily trading volume"
              source="auto_max_vol"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectInput
              fullWidth
              source="auto_sort"
              choices={autoSortOptions}
              validate={required()}
              defaultValue={record.auto_sort}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Timeout in seconds for entering the pair"
              source="timeout"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Timeout until the next purchase (in seconds)"
              source="next_buy_timeout"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TimeFramesSelectInput
              fullWidth
              name="auto_pair_tf"
              label="The RSI timeframe for choosing a pair"
              frameChoices={autoPairTfToFilter}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Min. RSI to enter the pair"
              source="auto_rsi_min_big"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max. RSI to enter the pair"
              source="auto_rsi_max_big"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              fullWidth
              multiline
              source="whitelist"
              defaultValue={record.whitelist}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max growth per day, %"
              source="auto_pd_up"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max drop per day, %"
              source="auto_pd_down"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Pause for a pair, hours"
              source="auto_pd_pause"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max BTC growth per hour, %"
              source="pd_up"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max BTC drop per hour, %"
              source="pd_down"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Pause for the bot, hours"
              source="pd_pause"
              validate={required()}
            />
          </Grid>
        </Grid>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="RSI">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BooleanInput label="Sell by RSI" source="rsi_sell" />
          </Grid>
          <Grid item xs={12}>
            <h2>Short RSI input</h2>
          </Grid>
          <Grid item xs={12} md={6}>
            <TimeFramesSelectInput
              fullWidth
              name="auto_short_tf"
              label="RSI timeframe for entry (short)"
              frameChoices={autoShortTfToFilter}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Min. RSI for entry"
              source="auto_rsi_min"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max. RSI for entry"
              source="auto_rsi_max"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PeriodsSelectInput
              fullWidth
              name="auto_rsi_period"
              label="The RSI period for entry"
              periodChoices={autoRsiPeriodOptionsToFilter}
            />
          </Grid>
          <Grid item xs={12}>
            <h2>Long RSI input</h2>
          </Grid>
          <Grid item xs={12}>
            <BooleanInput
              label="Use a long timeframe when buying"
              source="auto_use_ltf"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TimeFramesSelectInput
              fullWidth
              name="auto_long_tf"
              label="RSI timeframe for entry (long)"
              frameChoices={autoLongTfToFilter}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Min. RSI for entry"
              source="auto_rsi_min_1h"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max. RSI for entry"
              source="auto_rsi_max_1h"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PeriodsSelectInput
              fullWidth
              name="auto_rsi_period_1h"
              label="The RSI period for entry"
              periodChoices={autoRsiPeriod1hOptionsToFilter}
            />
          </Grid>
          <Grid item xs={12}>
            <h2>RSI for sale</h2>
          </Grid>
          <Grid item xs={12} md={6}>
            <TimeFramesSelectInput
              fullWidth
              name="auto_sell_tf"
              label="The RSI timeframe for sale"
              frameChoices={autoSellTfToFilter}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PeriodsSelectInput
              fullWidth
              name="auto_sell_period"
              label="RSI period for Sale"
              periodChoices={autoSellPeriodOptionsToFilter}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Min. RSI for sale"
              source="auto_rsi_min_sell"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max. RSI for sale"
              source="auto_rsi_max_sell"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Difference from the previous RSI value for purchase, %"
              source="auto_rsi_diff"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Difference from the previous RSI value for sale, %"
              source="rsi_sell_diff"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Percentage price increase for blocking for a month"
              source="long_pump"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Percentage price drop for blocking for a month"
              source="long_dump"
            />
          </Grid>
        </Grid>
      </TabbedForm.Tab>
    </TabbedForm>
  );
};

export const BotEdit = () => {
  return (
    <Edit>
      <Editform />
    </Edit>
  );
};
