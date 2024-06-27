import * as React from "react";
import {
  AutocompleteArrayInput,
  AutocompleteInput,
  BooleanInput,
  Datagrid,
  DateField,
  Edit,
  FunctionField,
  Loading,
  NumberInput,
  ReferenceInput,
  ReferenceManyField,
  required,
  TabbedForm,
  TextInput,
  useGetList,
  useGetManyReference,
  useRecordContext,
} from "react-admin";

import { BotPause } from "../../types";
import { PeriodsSelectInput } from "../../layouts/periodsSelectInput";
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import { TimeFramesSelectInput } from "../../layouts/timeFramesSelectInput";
import BotPairsCounter from "../../layouts/botPairsCounter";
import GridData from "../../helpers/GridData";
import IdMark from "../../layouts/idMark";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const autoPairTfToFilter = [0, 5, 15, 30, 60, 240, 1440, 10080, 43200],
  autoShortTfToFilter = [5, 15, 30, 60, 240],
  autoLongTfToFilter = [30, 60, 240],
  autoSellTfToFilter = [0, 5, 15, 30, 60, 240, 1440];

const autoRsiPeriodOptionsToFilter = [6, 8, 10, 14],
  autoRsiPeriod1hOptionsToFilter = [6, 8, 12, 14],
  autoSellPeriodOptionsToFilter = [6, 8, 10, 12, 14];

const timeframeToFilter = [1, 5, 15, 30, 60, 240, 1440, 10080, 43200];
const periodToFilter = [6, 8, 10, 12, 14];

const baseMin = 0,
  color01 = "#2196f3",
  color02 = "rgba(33, 150, 243, 0.2)",
  exchangeFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  }),
  usernameFilterToQuery = (searchText: any) => ({
    username_like: `${searchText}`,
  });

const Editform = () => {
  const record = useRecordContext();
  if (!record) return null;

  const botId = Number(record?.id);
  const {
    data: botPairs,
    isLoading: isLoadingPairs,
    error: errorPairs,
  } = useGetManyReference("pairs", {
    target: "bot_id",
    id: record?.id,
    pagination: { page: 1, perPage: 1000000 },
  });

  const {
    data: whitelistData,
    isLoading: isLoadingWhitelist,
    error: errorWhitelist,
  } = useGetList("whitelist");

  if (isLoadingPairs || isLoadingWhitelist) return <Loading />;
  if (errorPairs || errorWhitelist) return <div>ERROR</div>;

  const botLimit = record?.botlimit;
  const botProfit = record?.auto_profit;
  const botStartSum = record?.auto_start_sum;
  const botStep = record?.auto_step;
  const botTotalCustomerBalance = "??";
  const tablePrimaryDataHeadCellSx = {
    color: "white",
    fontSize: "1.1em",
    fontWeight: "bold",
    textAlign: "center",
  };
  const tablePrimaryDataCellSx = {
    fontSize: "1.1em",
    textAlign: "center",
  };

  return (
    <div className="editBot">
      <Table size="small">
        <TableHead sx={{ bgcolor: color01 }}>
          <TableRow>
            <TableCell sx={tablePrimaryDataHeadCellSx}>Limit</TableCell>
            <TableCell sx={tablePrimaryDataHeadCellSx}>Profit (%)</TableCell>
            <TableCell sx={tablePrimaryDataHeadCellSx}>Start sum</TableCell>
            <TableCell sx={tablePrimaryDataHeadCellSx}>Step</TableCell>
            <TableCell sx={tablePrimaryDataHeadCellSx}>
              Total customer balance, (USDT)
            </TableCell>
            <TableCell sx={tablePrimaryDataHeadCellSx}>
              Total amount in the trades of all pairs, (USDT)
            </TableCell>
            <TableCell sx={tablePrimaryDataHeadCellSx}>
              Number of pairs
              <br />
              (settings / actual)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ bgcolor: color02 }}>
          <TableRow>
            <TableCell sx={tablePrimaryDataCellSx}>{botLimit}</TableCell>
            <TableCell sx={tablePrimaryDataCellSx}>{botProfit}</TableCell>
            <TableCell sx={tablePrimaryDataCellSx}>{botStartSum}</TableCell>
            <TableCell sx={tablePrimaryDataCellSx}>{botStep}</TableCell>
            <TableCell sx={tablePrimaryDataCellSx}>
              {botTotalCustomerBalance}
            </TableCell>
            <TableCell sx={tablePrimaryDataCellSx}>
              <GridData type="bot" id={botId} parameter="in_trades" />
            </TableCell>
            <TableCell sx={tablePrimaryDataCellSx}>
              <BotPairsCounter bot={record} pairs={botPairs} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TabbedForm
        toolbar={<PrymaryEditToolbar />}
        id="editBotForm"
        syncWithLocation={true}
      >
        <TabbedForm.Tab label="Main settings">
          <Container maxWidth="md" sx={{ ml: 0 }}>
            <h2>Bot main settings</h2>
          </Container>
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
                <IdMark id={botId} />
              </Grid>
              <Grid item xs={12} sm={8} md={10} lg={11}>
                <TextInput
                  defaultValue={record.title}
                  margin="none"
                  source="title"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} md={4}>
                <SelectInput
                  choices={states}
                  defaultValue={record.state}
                  margin="none"
                  source="state"
                  validate={required()}
                  variant="standard"
                />
              </Grid> */}
              <Grid item xs={12} md={6}>
                <ReferenceInput
                  label="Client"
                  reference="users"
                  source="user_id"
                >
                  <AutocompleteInput
                    filterToQuery={usernameFilterToQuery}
                    margin="none"
                    optionText="username"
                    validate={required()}
                    variant="standard"
                  />
                </ReferenceInput>
              </Grid>
              <Grid item xs={12} md={6}>
                <ReferenceInput
                  label="Exchange"
                  source="exchange_id"
                  reference="exchanges"
                >
                  <AutocompleteInput
                    optionText="title"
                    margin="none"
                    validate={required()}
                    variant="standard"
                    filterToQuery={exchangeFilterToQuery}
                  />
                </ReferenceInput>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  label="Replenishment currency"
                  margin="none"
                  source="baseAsset"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <NumberInput
                  label="Trading limit"
                  margin="none"
                  min={baseMin}
                  source="botlimit"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TimeFramesSelectInput
                  frameChoices={timeframeToFilter}
                  label="Timeframe"
                  sourceName="timeframe"
                  required={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PeriodsSelectInput
                  periodChoices={periodToFilter}
                  label="Period"
                  sourceName="period"
                  required={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BooleanInput
                  label="Use a limit order when selling"
                  source="auto_sell_limit"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BooleanInput
                  label="Use a limit order when buying"
                  source="auto_buy_limit"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BooleanInput
                  label="Use exchange token to pay commissions"
                  source="useBNB"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BooleanInput label="Enable autotrading" source="auto_on" />
              </Grid>
              <Grid item xs={12}>
                <TextInput label="API Key" margin="none" source="apikey" />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  label="API Secret"
                  margin="none"
                  source="apisecret"
                />
              </Grid>
              {record.exchange_id === 3 && (
                <Grid item xs={12}>
                  <TextInput
                    label="API Password"
                    margin="none"
                    source="apipassword"
                  />
                </Grid>
              )}
            </Grid>
          </Container>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Auto">
          <Container maxWidth="xl" sx={{ ml: 0 }}>
            <h2>Auto bot settings</h2>
          </Container>
          <Container sx={{ ml: 0, maxWidth: "1598px" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Pairs quantity"
                  margin="none"
                  min={baseMin}
                  source="auto_pair_count"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Limit for a pair"
                  margin="none"
                  min={baseMin}
                  source="auto_limit_pair"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Number of orders in a pair"
                  margin="none"
                  min={baseMin}
                  source="auto_order_count"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Indent in %"
                  margin="none"
                  min={baseMin}
                  source="auto_offset"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Initial order amount"
                  margin="none"
                  min={baseMin}
                  source="auto_start_sum"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Order step, in %"
                  margin="none"
                  min={baseMin}
                  source="auto_step"
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  label="Martingale, in %"
                  margin="none"
                  min={baseMin}
                  source="auto_martin"
                  validate={required()}
                  variant="standard"
                />
              </Grid> */}
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Profit, in %"
                  margin="none"
                  min={baseMin}
                  source="auto_profit"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Slippage, in %"
                  margin="none"
                  min={baseMin}
                  source="auto_squiz"
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  label="Min. daily trading volume"
                  margin="none"
                  min={baseMin}
                  source="auto_min_vol"
                  validate={required()}
                  variant="standard"
                />
              </Grid> */}
              {/* <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  label="Max. daily trading volume"
                  margin="none"
                  min={baseMin}
                  source="auto_max_vol"
                  validate={required()}
                  variant="standard"
                />
              </Grid> */}
              {/* <Grid item xs={12} md={6} lg={4} xl={3}>
                <SelectInput
                  choices={autoSortOptions}
                  defaultValue={record.auto_sort}
                  margin="none"
                  source="auto_sort"
                  validate={required()}
                  variant="standard"
                />
              </Grid> */}
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Timeout in seconds for entering the pair"
                  margin="none"
                  min={baseMin}
                  source="timeout"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Timeout until the next purchase (in seconds)"
                  margin="none"
                  min={baseMin}
                  source="next_buy_timeout"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <TimeFramesSelectInput
                  frameChoices={autoPairTfToFilter}
                  label="The RSI timeframe for choosing a pair"
                  required={true}
                  sourceName="auto_pair_tf"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Min. RSI to enter the pair"
                  margin="none"
                  min={baseMin}
                  source="auto_rsi_min_big"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Max. RSI to enter the pair"
                  margin="none"
                  min={baseMin}
                  source="auto_rsi_max_big"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Max growth per day, %"
                  margin="none"
                  min={baseMin}
                  source="auto_pd_up"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Max drop per day, %"
                  margin="none"
                  min={baseMin}
                  source="auto_pd_down"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Pause for a pair, hours"
                  margin="none"
                  min={baseMin}
                  source="auto_pd_pause"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Max BTC growth per hour, %"
                  margin="none"
                  min={baseMin}
                  source="pd_up"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Max BTC drop per hour, %"
                  margin="none"
                  min={baseMin}
                  source="pd_down"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="Pause for the bot, hours"
                  margin="none"
                  min={baseMin}
                  source="pd_pause"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <AutocompleteArrayInput
                  choices={whitelistData}
                  optionText="symbol"
                  optionValue="symbol"
                  format={(value) =>
                    typeof value === "string"
                      ? value.split(";").map((pair) => pair.trim())
                      : value
                  }
                  parse={(value) => {
                    if (Array.isArray(value)) {
                      value = value.join(";");
                    }
                    return value;
                  }}
                  source="whitelist"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Container>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="RSI">
          <Container maxWidth="xl" sx={{ ml: 0 }}>
            <h2>RSI settings</h2>
          </Container>
          <Container sx={{ ml: 0, maxWidth: "1598px" }}>
            <Grid container justifyContent={"space-between"} spacing={1}>
              {/* <Grid item xs={12}>
                <BooleanInput label="Sell by RSI" source="rsi_sell" />
              </Grid> */}
              <Grid item xs={12} lg={6} xl={5}>
                <h3>Short RSI</h3>
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
                      frameChoices={autoShortTfToFilter}
                      label="RSI timeframe for entry"
                      sourceName="auto_short_tf"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PeriodsSelectInput
                      label="The RSI period for entry"
                      sourceName="auto_rsi_period"
                      periodChoices={autoRsiPeriodOptionsToFilter}
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
                      label="Min. RSI for entry"
                      margin="none"
                      min={baseMin}
                      source="auto_rsi_min"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      label="Max. RSI for entry"
                      margin="none"
                      min={baseMin}
                      source="auto_rsi_max"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6} xl={5}>
                <BooleanInput
                  label="Use a long timeframe when buying"
                  source="auto_use_ltf"
                />
                <Grid item xs={12}>
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
                        frameChoices={autoLongTfToFilter}
                        label="RSI timeframe for entry"
                        sourceName="auto_long_tf"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <PeriodsSelectInput
                        sourceName="auto_rsi_period_1h"
                        label="The RSI period for entry"
                        periodChoices={autoRsiPeriod1hOptionsToFilter}
                      />
                    </Grid>
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
                      label="Min. RSI for entry"
                      margin="none"
                      min={baseMin}
                      source="auto_rsi_min_1h"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      label="Max. RSI for entry"
                      margin="none"
                      min={baseMin}
                      source="auto_rsi_max_1h"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justifyContent={"space-between"} spacing={1}>
              <Grid item xs={12}>
                <h2>RSI for sale</h2>
              </Grid>
              <Grid item xs={12} lg={6} xl={5}>
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
                      frameChoices={autoSellTfToFilter}
                      label="The RSI timeframe for sale"
                      sourceName="auto_sell_tf"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PeriodsSelectInput
                      label="RSI period for Sale"
                      periodChoices={autoSellPeriodOptionsToFilter}
                      sourceName="auto_sell_period"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    paddingRight: 3,
                    paddingLeft: 3,
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      label="Min. RSI for sale"
                      margin="none"
                      min={baseMin}
                      source="auto_rsi_min_sell"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      label="Max. RSI for sale"
                      margin="none"
                      min={baseMin}
                      source="auto_rsi_max_sell"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} xl={5}>
                <NumberInput
                  label="Difference from the previous RSI value for purchase, %"
                  margin="none"
                  min={baseMin}
                  source="auto_rsi_diff"
                  variant="standard"
                />
                <NumberInput
                  label="Difference from the previous RSI value for sale, %"
                  margin="none"
                  min={baseMin}
                  source="rsi_sell_diff"
                  variant="standard"
                />
                <NumberInput
                  label="Percentage price drop for blocking for a month"
                  margin="none"
                  min={baseMin}
                  source="long_dump"
                  variant="standard"
                />
                <NumberInput
                  label="Percentage price increase for blocking for a month"
                  margin="none"
                  min={baseMin}
                  source="long_pump"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Container>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Pauses">
          <Container maxWidth="xl" sx={{ ml: 0 }}>
            <h2>Bot pauses log</h2>
          </Container>
          <Container maxWidth="md" sx={{ ml: 0 }}>
            <ReferenceManyField
              reference="bot_pause"
              target="bot_id"
              label="Bot pauses"
            >
              <Datagrid bulkActionButtons={false} rowClick={false}>
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
                  render={(record: BotPause) => {
                    if (record.pause_end) {
                      return (
                        <DateField
                          source="pause_end"
                          showTime
                          sortable={false}
                        />
                      );
                      1;
                    } else {
                      return <p style={{ color: "red" }}>Pause end not set</p>;
                    }
                  }}
                />
              </Datagrid>
            </ReferenceManyField>
          </Container>
        </TabbedForm.Tab>
        <TabbedForm.Tab
          label="Pairs"
          path={`/bots/${botId}/pairs`}
        ></TabbedForm.Tab>
      </TabbedForm>
    </div>
  );
};

const BotTitle = () => {
  const record = useRecordContext();
  if (!record) return null;
  return <>Bot {record ? `"${record.title}" (id: ${record.id})` : ""}</>;
};

export const BotEdit = () => {
  return (
    <Edit redirect={false} title={<BotTitle />}>
      <Editform />
    </Edit>
  );
};
