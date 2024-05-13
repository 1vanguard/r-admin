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
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  FunctionField,
} from "react-admin";

import Grid from "@mui/material/Grid";
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import { PeriodsSelectInput } from "../../layouts/periodsSelectInput";
import { TimeFramesSelectInput } from "../../layouts/timeFramesSelectInput";

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
  ],
  baseMin = 0,
  colorImportant01 = "rgb(0 0 0 / 5%)",
  colorImportantBorder02 = "#2196f3",
  exchangeFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  }),
  usernameFilterToQuery = (searchText: any) => ({
    username_like: `${searchText}`,
  });

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
  console.log("botEdit record", record);
  return (
    <TabbedForm toolbar={<PrymaryEditToolbar />} id="editBotForm">
      <TabbedForm.Tab label="General">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} md={2} lg={1}>
            <TextInput
              fullWidth
              InputProps={{ disabled: true }}
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
                filterToQuery={usernameFilterToQuery}
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
                filterToQuery={exchangeFilterToQuery}
              />
            </ReferenceInput>
          </Grid>
          <Grid item xs={12} md={6}>
            {record.api_ready === 1 ? (
              <div>API is ready</div>
            ) : (
              <TextInput
                fullWidth
                label="API Key"
                source="apikey"
                validate={required()}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {record.api_ready === 1 ? (
              <div>API is ready</div>
            ) : (
              <TextInput
                fullWidth
                label="API Secret"
                source="apisecret"
                validate={required()}
              />
            )}
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
              validate={required()}
              min={baseMin}
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
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Limit for a pair"
              source="auto_limit_pair"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Number of orders in a pair"
              source="auto_order_count"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Indent in %"
              source="auto_offset"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Initial order amount"
              source="auto_start_sum"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Order step, in %"
              source="auto_step"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Martingale, in %"
              source="auto_martin"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Profit, in %"
              source="auto_profit"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Slippage, in %"
              source="auto_squiz"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Min. daily trading volume"
              source="auto_min_vol"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max. daily trading volume"
              source="auto_max_vol"
              validate={required()}
              min={baseMin}
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
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Timeout until the next purchase (in seconds)"
              source="next_buy_timeout"
              validate={required()}
              min={baseMin}
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
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max. RSI to enter the pair"
              source="auto_rsi_max_big"
              validate={required()}
              min={baseMin}
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
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max drop per day, %"
              source="auto_pd_down"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Pause for a pair, hours"
              source="auto_pd_pause"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max BTC growth per hour, %"
              source="pd_up"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Max BTC drop per hour, %"
              source="pd_down"
              validate={required()}
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Pause for the bot, hours"
              source="pd_pause"
              validate={required()}
              min={baseMin}
            />
          </Grid>
        </Grid>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="RSI">
        <Grid container spacing={2} sx={{ maxWidth: 700 }}>
          <Grid item xs={12}>
            <BooleanInput label="Sell by RSI" source="rsi_sell" />
          </Grid>
          <Grid item xs={12}>
            <h2>Short RSI input</h2>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid
              container
              sx={{
                backgroundColor: colorImportant01,
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: colorImportantBorder02,
                p: 2,
              }}
            >
              <Grid item xs={12} md={6}>
                <TimeFramesSelectInput
                  fullWidth
                  name="auto_short_tf"
                  label="RSI timeframe for entry"
                  frameChoices={autoShortTfToFilter}
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
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <NumberInput
              fullWidth
              label="Max. RSI for entry"
              source="auto_rsi_max"
              min={baseMin}
            />
            <NumberInput
              fullWidth
              label="Min. RSI for entry"
              source="auto_rsi_min"
              min={baseMin}
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
          <Grid item xs={12} md={8}>
            <Grid
              container
              sx={{
                backgroundColor: colorImportant01,
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: colorImportantBorder02,
                p: 2,
              }}
            >
              <Grid item xs={12} md={6}>
                <TimeFramesSelectInput
                  fullWidth
                  name="auto_long_tf"
                  label="RSI timeframe for entry"
                  frameChoices={autoLongTfToFilter}
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
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <NumberInput
              fullWidth
              label="Max. RSI for entry"
              source="auto_rsi_max_1h"
              min={baseMin}
            />
            <NumberInput
              fullWidth
              label="Min. RSI for entry"
              source="auto_rsi_min_1h"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12}>
            <h2>RSI for sale</h2>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid
              container
              sx={{
                backgroundColor: colorImportant01,
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: colorImportantBorder02,
                p: 2,
              }}
            >
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
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <NumberInput
              fullWidth
              label="Max. RSI for sale"
              source="auto_rsi_max_sell"
              min={baseMin}
            />
            <NumberInput
              fullWidth
              label="Min. RSI for sale"
              source="auto_rsi_min_sell"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Difference from the previous RSI value for purchase, %"
              source="auto_rsi_diff"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Difference from the previous RSI value for sale, %"
              source="rsi_sell_diff"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Percentage price increase for blocking for a month"
              source="long_pump"
              min={baseMin}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              fullWidth
              label="Percentage price drop for blocking for a month"
              source="long_dump"
              min={baseMin}
            />
          </Grid>
        </Grid>
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Pairs">
        <List
          resource="pairs"
          filter={{ bot_id: record.id }}
          sx={{ width: "100%" }}
        >
          <Datagrid>
            <TextField source="id" />
            <TextField source="symbol" />
            <ReferenceField label="State" source="state" reference="states">
              <FunctionField render={(record) => record.name} />
            </ReferenceField>
            <TextField source="pair_limit" />
            <TextField source="step" />
            <TextField source="start_offset" />
            <TextField source="profit" />
            <TextField source="squiz" />
            <EditButton />
          </Datagrid>
        </List>
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
