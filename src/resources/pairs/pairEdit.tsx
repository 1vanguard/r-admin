import * as React from "react";
import {
  AutocompleteInput,
  BooleanInput,
  Datagrid,
  DateField,
  DateTimeInput,
  Edit,
  FunctionField,
  Loading,
  NumberInput,
  ReferenceInput,
  ReferenceManyField,
  required,
  TabbedForm,
  TextInput,
  useGetOne,
  useRecordContext,
} from "react-admin";

import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import { PeriodsSelectInput } from "../../layouts/periodsSelectInput";
import { TimeFramesSelectInput } from "../../layouts/timeFramesSelectInput";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import { PairPause } from "../../types";

const botFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  }),
  color01 = "#2196f3",
  color02 = "rgba(33, 150, 243, 0.2)",
  entryShortRsiTfToFilter = [5, 15, 30, 60, 240],
  entryLongRsiTfToFilter = [5, 30, 60, 240],
  autoPairRsiTfToFilter = [30, 60, 240, 1440],
  rsiPeriodOptionsToFilter = [6, 8, 10, 12, 14],
  rsiPeriodLongOptionsToFilter = [6, 8, 10, 12, 14],
  rsiTimeframeOptionsToFilter = [1, 5, 15, 30, 60, 240, 1440, 10080, 43200],
  aiutoSellRsiTfToFilter = [5, 15, 30, 60, 240, 1440],
  autoRsiSellPeriodOptionsToFilter = [6, 8, 10, 12, 14],
  baseMin = 0;

const Editform = () => {
  const record = useRecordContext(),
    botId = record?.bot_id;

  if (!record) {
    return <p>Record not found</p>;
  }

  const {
    data: botData,
    isLoading: isLoadingBoatData,
    error: errorBotData,
  } = useGetOne("bots", {
    id: botId,
  });

  if (isLoadingBoatData) {
    return <Loading />;
  }

  if (errorBotData) {
    return <div>ERROR</div>;
  }

  return (
    <div>
      <Box sx={{ padding: 2 }}>
        <h2 style={{ margin: 0 }}>
          {record.symbol} <small>(Bot: {botData?.title})</small>
        </h2>
      </Box>
      <TabbedForm toolbar={<PrymaryEditToolbar />} id="editPairForm">
        <TabbedForm.Tab label="Main settings">
          <Container maxWidth="md" sx={{ ml: 0 }}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sm={4}
                md={2}
                lg={1}
                sx={{ textAlign: "center" }}
              >
                <div
                  style={{
                    fontSize: "0.8em",
                    lineHeight: "0.8em",
                    verticalAlign: "top",
                  }}
                >
                  Pair ID
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
                  defaultValue={record.title}
                  fullWidth
                  label="Symbol"
                  margin="none"
                  source="symbol"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <ReferenceInput
                  filter={{ state: [1, 2] }}
                  label="Bot"
                  reference="bots"
                  source="bot_id"
                >
                  <AutocompleteInput
                    filterToQuery={botFilterToQuery}
                    fullWidth
                    optionText="title"
                    validate={required()}
                    variant="standard"
                  />
                </ReferenceInput>
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <SelectInput
                  fullWidth
                  source="strategy"
                  choices={strategies}
                  validate={required()}
                  defaultValue={record.state}
                />
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <TextInput
                  fullWidth
                  label="Base Currency"
                  source="base_cur"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextInput
                  fullWidth
                  label="Alternative Currency"
                  source="alt_cur"
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Interval, ms"
                  source="interval"
                  min={baseMin}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <BooleanInput label="Reinvest" source="reinvest" />
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Start Orders"
                  min={baseMin}
                  source="start_orders"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="The initial amount of the order in base currency"
                  min={baseMin}
                  source="start_sum"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Start offset"
                  source="start_offset"
                  min={baseMin}
                />
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Pair limit"
                  min={baseMin}
                  source="pair_limit"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Martingale"
                  source="martin"
                  min={baseMin}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Additional Martingale"
                  source="add_martin"
                  min={baseMin}
                />
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Step"
                  min={baseMin}
                  source="step"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Additional Step"
                  source="add_step"
                  min={baseMin}
                />
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Profit in %"
                  min={baseMin}
                  source="profit"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Squiz"
                  min={baseMin}
                  source="squiz"
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Trailing stop"
                  source="stop_offset"
                  validate={required()}
                  min={baseMin}
                />
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <NumberInput
                  format={(value) => {
                    if (value) {
                      return value.toString().replace(/0+$/, "");
                    }
                    return value;
                  }}
                  fullWidth
                  label="Percentage of market growth"
                  min={baseMin}
                  source="growth"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Timeout (sec)"
                  min={baseMin}
                  source="start_timeout"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <NumberInput
                  fullWidth
                  label="Timeout after purchase (sec)"
                  min={baseMin}
                  source="next_buy_timeout"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Container>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Indicators">
          <Container maxWidth="xl" sx={{ ml: 0, maxWidth: "1598px" }}>
            <Grid container justifyContent={"space-between"} spacing={1}>
              <Grid item xs={12} lg={6} xl={5} sx={{ paddingBottom: 5 }}>
                <h3 style={{ marginTop: 0 }}>
                  <Tooltip
                    arrow
                    leaveDelay={200}
                    placement="right-start"
                    title="Some text for indicators group 1. Lorerm ipsum dolar sit amet."
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>Indicators group 1</span>
                </h3>
                <Grid
                  container
                  sx={{
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: color01,
                    marginBottom: 3,
                    paddingTop: 3,
                    paddingRight: 3,
                    paddingLeft: 3,
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <TimeFramesSelectInput
                      frameChoices={rsiTimeframeOptionsToFilter}
                      fullWidth
                      label="RSI timeframe"
                      required={true}
                      sourceName="rsi_timeframe"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PeriodsSelectInput
                      fullWidth
                      label="RSI period"
                      periodChoices={rsiPeriodOptionsToFilter}
                      required={true}
                      sourceName="rsi_period"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    marginBottom: 3,
                    paddingRight: 3,
                    paddingLeft: 3,
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
                      label="RSI min"
                      min={baseMin}
                      source="rsi_min"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
                      label="RSI max"
                      min={baseMin}
                      source="rsi_max"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TimeFramesSelectInput
                      frameChoices={entryShortRsiTfToFilter}
                      fullWidth
                      label="The RSI timeframe for entry (short)"
                      sourceName="rsi_short_tf"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6} xl={5} sx={{ paddingBottom: 5 }}>
                <h3 style={{ marginTop: 0 }}>
                  <Tooltip
                    arrow
                    leaveDelay={200}
                    placement="right-start"
                    title="Some text for indicators group 2. Lorerm ipsum dolar sit amet."
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>Indicators group 2</span>
                </h3>
                <BooleanInput
                  label="Use a long timeframe when buying"
                  source="use_ltf"
                />
                <Grid
                  container
                  sx={{
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: color01,
                    marginBottom: 3,
                    paddingTop: 3,
                    paddingRight: 3,
                    paddingLeft: 3,
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <TimeFramesSelectInput
                      frameChoices={entryLongRsiTfToFilter}
                      fullWidth
                      label="The RSI timeframe for entry (long)"
                      sourceName="rsi_long_tf"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PeriodsSelectInput
                      fullWidth
                      label="RSI period (long)"
                      periodChoices={rsiPeriodLongOptionsToFilter}
                      sourceName="rsi_period_1h"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    marginBottom: 3,
                    paddingRight: 3,
                    paddingLeft: 3,
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
                      label="RSI min (long)"
                      min={baseMin}
                      source="rsi_min_1h"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
                      label="RSI max (long)"
                      min={baseMin}
                      source="rsi_max_1h"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6} xl={5} sx={{ paddingBottom: 5 }}>
                <h3 style={{ marginTop: 0 }}>
                  <Tooltip
                    arrow
                    leaveDelay={200}
                    placement="right-start"
                    title="Some text for indicators group 3. Lorerm ipsum dolar sit amet."
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>Indicators group 3</span>
                </h3>
                {/* <BooleanInput label="Auto" source="is_auto" /> */}
                <BooleanInput
                  label="Sell on the RSI signal"
                  source="rsi_sell"
                />
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
                      label="Difference from the previous RSI, %"
                      min={baseMin}
                      source="rsi_diff"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
                      label="Difference from the previous RSI for sale, %"
                      min={baseMin}
                      source="rsi_sell_diff"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6} xl={5} sx={{ paddingBottom: 5 }}>
                <h3 style={{ marginTop: 0 }}>
                  <Tooltip
                    arrow
                    leaveDelay={200}
                    placement="right-start"
                    title="Some text for indicators group 4. Lorerm ipsum dolar sit amet."
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>Indicators group 4</span>
                </h3>
                <Grid
                  container
                  sx={{
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: color01,
                    marginBottom: 3,
                    paddingTop: 3,
                    paddingRight: 3,
                    paddingLeft: 3,
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <TimeFramesSelectInput
                      frameChoices={autoPairRsiTfToFilter}
                      fullWidth
                      label="The RSI timeframe for entering the pair"
                      sourceName="auto_pair_tf"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PeriodsSelectInput
                      fullWidth
                      label="The RSI period for sale"
                      periodChoices={autoRsiSellPeriodOptionsToFilter}
                      sourceName="auto_sell_period"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    marginBottom: 3,
                    paddingRight: 3,
                    paddingLeft: 3,
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
                      label="Min RSI to enter the pair"
                      min={baseMin}
                      source="auto_rsi_min_big"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
                      label="Max RSI to enter the pair"
                      min={baseMin}
                      source="auto_rsi_max_big"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TimeFramesSelectInput
                      frameChoices={aiutoSellRsiTfToFilter}
                      fullWidth
                      label="The RSI timeframe for sale"
                      sourceName="auto_sell_tf"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
                      label="Min RSI for sale"
                      min={baseMin}
                      source="auto_rsi_min_sell"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
                      label="Max RSI for sale"
                      min={baseMin}
                      source="auto_rsi_max_sell"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6} xl={5} sx={{ paddingBottom: 5 }}>
                <h3 style={{ marginTop: 0 }}>
                  <Tooltip
                    arrow
                    leaveDelay={200}
                    placement="right-start"
                    title="Some text for indicators group 5. Lorerm ipsum dolar sit amet."
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>Indicators group 5</span>
                </h3>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
                      label="Max growth per day, %"
                      min={baseMin}
                      source="pd_up"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
                      label="Min growth per day, %"
                      min={baseMin}
                      source="pd_down"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <DateTimeInput
                    fullWidth
                    label="Pause, until"
                    source="pause_until"
                    variant="standard"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6} xl={5} sx={{ paddingBottom: 5 }}>
                <h3 style={{ marginTop: 0 }}>
                  <Tooltip
                    arrow
                    leaveDelay={200}
                    placement="right-start"
                    title="Some text for indicators group 6. Lorerm ipsum dolar sit amet."
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>Indicators group 6</span>
                </h3>
                <NumberInput
                  fullWidth
                  label="A percentage increase in the price for blocking for a month"
                  min={baseMin}
                  source="long_pump"
                  variant="standard"
                />
                <NumberInput
                  fullWidth
                  label="A percentage drop in the price for blocking for a month"
                  min={baseMin}
                  source="long_dump"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Container>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Pauses">
          <Container maxWidth="xl" sx={{ ml: 0 }}>
            <h2>Pair pauses log</h2>
          </Container>
          <Container maxWidth="md" sx={{ ml: 0 }}>
            <ReferenceManyField
              reference="bot_pause"
              target="pair_id"
              label="Pair pauses"
            >
              <Datagrid bulkActionButtons={false}>
                <DateField
                  source="pause_start"
                  showTime
                  sortable={false}
                  label="Pause start"
                />
                <FunctionField
                  source="pause_end"
                  label="Pause end"
                  sortable={false}
                  render={(record: PairPause) => {
                    if (record.pause_end) {
                      return (
                        <DateField
                          source="pause_end"
                          showTime
                          sortable={false}
                        />
                      );
                    } else {
                      return (
                        <p style={{ color: "red" }}>Pause end not set</p>
                      )
                    }
                  }}
                />
              </Datagrid>
            </ReferenceManyField>
          </Container>
        </TabbedForm.Tab>
      </TabbedForm>
    </div>
  );
};

const PairTitle = () => {
  const record = useRecordContext();
  return <>Pair {record ? `"${record.symbol}" (id: ${record.id})` : ''}</>;
};

export const PairEdit = () => {
  return (
    <Edit redirect={false} title={<PairTitle />}>
      <Editform />
    </Edit>
  );
};
