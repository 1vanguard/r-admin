import * as React from "react";
import { useState } from "react";
import {
  AutocompleteInput,
  BooleanInput,
  // Datagrid,
  Edit,
  /* EditButton,
  Filter,
  FunctionField,
  List,
  ListActions,
  ListBase,
  ListToolbar, */
  Loading,
  NumberInput,
  ReferenceInput,
  // ReferenceManyField,
  required,
  SelectInput,
  TabbedForm,
  // TextField,
  TextInput,
  useGetList,
  useGetManyReference,
  useRecordContext,
  // WithListContext,
} from "react-admin";

import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import { PeriodsSelectInput } from "../../layouts/periodsSelectInput";
import { TimeFramesSelectInput } from "../../layouts/timeFramesSelectInput";
import GridData from "../../helpers/GridData";
/* import { PairPanel } from "../pairs/pairPanel";
import BtnsStateControl from "../../layouts/btnsStateControl";
import IdxMaster from "../../layouts/idxMaster"; */
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import BotPairsCounter from "../../layouts/botPairsCounter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
/* import CircleIcon from "@mui/icons-material/Circle";
import SettingsIcon from "@mui/icons-material/Settings";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";
import { BotPair } from "../../types"; */

const autoPairTfToFilter = [/* 0, */ 30, 60, 240, 1440],
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
  color01 = "#2196f3",
  color02 = "rgba(33, 150, 243, 0.2)",
  exchangeFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  }),
  usernameFilterToQuery = (searchText: any) => ({
    username_like: `${searchText}`,
  });

const Editform = () => {
  /* const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  }; */

  const record = useRecordContext();
  const botId = Number(record?.id);

  const {
    data: states,
    isLoading: isLoadingStates,
    error,
  } = useGetList("states");

  const {
    data: botPairs,
    isLoading: isLoadingPairs,
    error: errorPairs,
  } = useGetManyReference("pairs", {
    target: "bot_id",
    id: record?.id,
    pagination: { page: 1, perPage: 1000000 },
  });

  if (!record || isLoadingStates || isLoadingPairs) {
    return <Loading />;
  }
  if (error || errorPairs) {
    return <div>ERROR</div>;
  }

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

  /* const tableBotPairsHeadCellSx = {
    color: "white",
    fontSize: "0.8em",
    textAlign: "center",
  };
  const tableBotPairsDataCellSx = {
    textAlign: "center",
  }; */

  return (
    <div>
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
      <TabbedForm toolbar={<PrymaryEditToolbar />} id="editBotForm" syncWithLocation={true}>
        <TabbedForm.Tab label="Main settings">
          <Container maxWidth="md" sx={{ ml: 0 }}>
            <h2>Main bot settings</h2>
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
                <div
                  style={{
                    fontSize: "0.8em",
                    lineHeight: "0.8em",
                    verticalAlign: "top",
                  }}
                >
                  Bot ID
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
                  fullWidth
                  source="title"
                  defaultValue={record.title}
                  margin="none"
                  variant="standard"
                  validate={required()}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectInput
                  fullWidth
                  source="state"
                  choices={states}
                  margin="none"
                  validate={required()}
                  variant="standard"
                  defaultValue={record.state}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <ReferenceInput
                  label="Client"
                  source="user_id"
                  reference="users"
                >
                  <AutocompleteInput
                    fullWidth
                    optionText="username"
                    margin="none"
                    validate={required()}
                    variant="standard"
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
                    margin="none"
                    validate={required()}
                    variant="standard"
                    filterToQuery={exchangeFilterToQuery}
                  />
                </ReferenceInput>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  fullWidth
                  label="Replenishment currency"
                  margin="none"
                  source="baseAsset"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <NumberInput
                  fullWidth
                  label="Trading limit"
                  margin="none"
                  min={baseMin}
                  source="botlimit"
                  validate={required()}
                  variant="standard"
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
                <TextInput
                  fullWidth
                  label="API Key"
                  margin="none"
                  source="apikey"
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  fullWidth
                  label="API Secret"
                  margin="none"
                  source="apisecret"
                />
              </Grid>
              {record.exchange_id === 3 && (
                <Grid item xs={12}>
                  <TextInput
                    fullWidth
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
                  label="Order step, in %"
                  margin="none"
                  min={baseMin}
                  source="auto_step"
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  fullWidth
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
                  fullWidth
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
                  fullWidth
                  label="Slippage, in %"
                  margin="none"
                  min={baseMin}
                  source="auto_squiz"
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  fullWidth
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
                  fullWidth
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
                  fullWidth
                  margin="none"
                  source="auto_sort"
                  validate={required()}
                  variant="standard"
                />
              </Grid> */}
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  fullWidth
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
                  fullWidth
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
                  fullWidth
                  label="The RSI timeframe for choosing a pair"
                  recordValue={record.auto_pair_tf_id}
                  required={true}
                  sourceName="auto_pair_tf_id"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  fullWidth
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
                  label="Pause for the bot, hours"
                  margin="none"
                  min={baseMin}
                  source="pd_pause"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  defaultValue={record.whitelist}
                  fullWidth
                  margin="none"
                  multiline
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
                      fullWidth
                      sourceName="auto_short_tf"
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
                      label="Min. RSI for entry"
                      margin="none"
                      min={baseMin}
                      source="auto_rsi_min"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
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
                        fullWidth
                        sourceName="auto_long_tf"
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
                      label="Min. RSI for entry"
                      margin="none"
                      min={baseMin}
                      source="auto_rsi_min_1h"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
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
                      fullWidth
                      sourceName="auto_sell_tf"
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
                      fullWidth
                      label="Min. RSI for sale"
                      margin="none"
                      min={baseMin}
                      source="auto_rsi_min_sell"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      fullWidth
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
                  fullWidth
                  label="Difference from the previous RSI value for purchase, %"
                  margin="none"
                  min={baseMin}
                  source="auto_rsi_diff"
                  variant="standard"
                />
                <NumberInput
                  fullWidth
                  label="Difference from the previous RSI value for sale, %"
                  margin="none"
                  min={baseMin}
                  source="rsi_sell_diff"
                  variant="standard"
                />
                <NumberInput
                  fullWidth
                  label="Percentage price drop for blocking for a month"
                  margin="none"
                  min={baseMin}
                  source="long_dump"
                  variant="standard"
                />
                <NumberInput
                  fullWidth
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
        <TabbedForm.Tab label="Pairs" path={`/bots/${botId}/pairs`}></TabbedForm.Tab>
        {/* <TabbedForm.Tab label="Pairs">
          <Container maxWidth="xl" sx={{ ml: 0 }}>
            <h2>Bot pairs</h2>
            <ReferenceManyField
              label="Pairs"
              reference="pairs"
              target="bot_id"
              filter={{ bot_id: record.id, state: [1, 2] }}
              perPage={1000000}
            >
                <Datagrid
                  expand={<PairPanel />}
                  bulkActionButtons={false}
                  sx={{
                    "& .RaDatagrid-row": {
                      backgroundColor: "rgb(46 125 50 / 5%)",
                    },
                    marginBottom: 3,
                  }}
                >
                  <TextField source="id" />
                  <FunctionField
                    source="state"
                    label="State"
                    sortable={true}
                    sortBy="state"
                    render={(record) => {
                      let stateColor;

                      switch (record.state) {
                        case -1:
                          stateColor = "disabled";
                          break;
                        case 0:
                          stateColor = "error";
                          break;
                        case 1:
                          stateColor = "success";
                          break;
                        case 2:
                          stateColor = "warning";
                          break;
                        default:
                          stateColor = "disabled";
                      }

                      return (
                        <div style={{ textAlign: "center" }}>
                          <CircleIcon
                            color={stateColor}
                            sx={{ fontSize: "0.9em" }}
                          />
                        </div>
                      );
                    }}
                  />
                  <FunctionField
                    source="symbol"
                    label="Pair"
                    sortable={true}
                    sortBy="symbol"
                    render={(record) => {
                      let pairPauseUntil;

                      if (record.pause_until) {
                        pairPauseUntil = (
                          <span style={{ fontSize: "0.8em" }}>
                            <span
                              style={{ fontWeight: "700", marginRight: "5px" }}
                            >
                              Pause until:
                            </span>
                            {new Date(record.pause_until).toLocaleString()}
                          </span>
                        );
                      }

                      return (
                        <div>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span style={{ marginRight: "0.7em" }}>
                              {record.symbol}
                            </span>
                            <span
                              style={{
                                display: "flex",
                                marginLeft: "auto",
                              }}
                            >
                              <BtnsStateControl />
                              <EditButton
                                label=""
                                color="inherit"
                                variant="contained"
                                className="btn_iconOnly"
                                style={{
                                  marginLeft: "0.3em",
                                  minWidth: "0",
                                }}
                                icon={
                                  <SettingsIcon style={{ fontSize: "1em" }} />
                                }
                              />
                            </span>
                          </span>
                          {pairPauseUntil}
                        </div>
                      );
                    }}
                  />
                  <FunctionField
                    // source="id"
                    label="RSI_S"
                    render={(record) => {
                      return (
                        <IdxMaster
                          idxName="RSI_S"
                          pairId={record.id}
                        ></IdxMaster>
                      );
                    }}
                  />
                  <FunctionField
                    label="RSI_L"
                    render={(record) => {
                      return (
                        <IdxMaster
                          idxName="RSI_L"
                          pairId={record.id}
                        ></IdxMaster>
                      );
                    }}
                  />
                  <FunctionField
                    label="RSI_SELL"
                    render={(record) => {
                      return (
                        <IdxMaster
                          idxName="RSI_SELL"
                          pairId={record.id}
                        ></IdxMaster>
                      );
                    }}
                  />
                  <FunctionField
                    label="Price"
                    style={{ textAlign: "center" }}
                    render={(record) => {
                      return (
                        <IdxMaster
                          idxName="Price"
                          pairId={record.id}
                        ></IdxMaster>
                      );
                    }}
                  />
                  <FunctionField
                    label="In orders (USDT)"
                    render={(record) => {
                      return (
                        <GridData
                          type="pair"
                          id={record.id}
                          parameter="in_orders"
                        />
                      );
                    }}
                  />
                  <FunctionField
                    label="Purchases"
                    render={(record) => {
                      return (
                        <GridData
                          type="pair"
                          id={record.id}
                          parameter="purchases"
                        />
                      );
                    }}
                  />
                  <FunctionField
                    label="Sales"
                    render={(record) => {
                      return (
                        <GridData
                          type="pair"
                          id={record.id}
                          parameter="sales"
                        />
                      );
                    }}
                  />
                </Datagrid>
            </ReferenceManyField>
            <ReferenceManyField
              label="Pairs"
              reference="pairs"
              target="bot_id"
              filter={{ state: 0 }}
            >
              <WithListContext
                render={({ data }) => {
                  if (data && data.length > 0) {
                    return (
                      <div>
                        <FormControlLabel
                          control={
                            <Switch checked={checked} onChange={handleChange} />
                          }
                          label="Show inactive bot's pairs"
                        />
                        <Collapse in={checked}>
                          {
                            <Datagrid
                              bulkActionButtons={false}
                              sx={{
                                "& .RaDatagrid-table": {
                                  width: "auto",
                                },
                              }}
                            >
                              <TextField source="id" />
                              <FunctionField
                                source="state"
                                label="State"
                                sortable={true}
                                sortBy="state"
                                render={() => {
                                  return (
                                    <div style={{ textAlign: "center" }}>
                                      <CircleIcon
                                        color={"error"}
                                        sx={{ fontSize: "0.9em" }}
                                      />
                                    </div>
                                  );
                                }}
                              />
                              <FunctionField
                                source="symbol"
                                label="Pair"
                                sortable={true}
                                sortBy="symbol"
                                render={(record: BotPair) => {
                                  return (
                                    <div>
                                      <span
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <span style={{ marginRight: "0.7em" }}>
                                          {record.symbol}
                                        </span>
                                        <span
                                          style={{
                                            display: "flex",
                                            marginLeft: "auto",
                                          }}
                                        >
                                          <BtnsStateControl />
                                          <EditButton
                                            label=""
                                            color="inherit"
                                            variant="contained"
                                            className="btn_iconOnly"
                                            style={{
                                              marginLeft: "0.3em",
                                              minWidth: "0",
                                            }}
                                            icon={
                                              <SettingsIcon
                                                style={{ fontSize: "1em" }}
                                              />
                                            }
                                          />
                                        </span>
                                      </span>
                                    </div>
                                  );
                                }}
                              />
                            </Datagrid>
                          }
                        </Collapse>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </ReferenceManyField>
          </Container>
        </TabbedForm.Tab> */}
      </TabbedForm>
    </div>
  );
};

export const BotEdit = () => {
  return (
    <Edit redirect={false}>
      <Editform />
    </Edit>
  );
};
