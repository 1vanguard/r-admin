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
  useTranslate,
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
  const record = useRecordContext(),
    translate = useTranslate();
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
    verticalAlign: "top",
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
            <TableCell sx={tablePrimaryDataHeadCellSx}>
              {translate("common.limit")}
            </TableCell>
            <TableCell sx={tablePrimaryDataHeadCellSx}>
              {translate("common.profit")}{" "}
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.8em",
                  lineHeight: "0.9em",
                }}
              >
                (%)
              </span>
            </TableCell>
            <TableCell sx={tablePrimaryDataHeadCellSx}>
              {translate("common.start_sum")}
            </TableCell>
            <TableCell sx={tablePrimaryDataHeadCellSx}>
              {translate("common.step")}
            </TableCell>
            <TableCell sx={tablePrimaryDataHeadCellSx}>
              {translate("common.total_customer_balance")},{" "}
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.8em",
                  lineHeight: "0.9em",
                }}
              >
                ({translate("common.usdt")})
              </span>
            </TableCell>
            <TableCell sx={tablePrimaryDataHeadCellSx}>
              {translate("common.total_amount_in_trades_of_all_pairs")},{" "}
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.8em",
                  lineHeight: "0.9em",
                }}
              >
                ({translate("common.usdt")})
              </span>
            </TableCell>
            <TableCell sx={tablePrimaryDataHeadCellSx}>
              {translate("common.number_of_pairs")}
              <br />
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.8em",
                  lineHeight: "0.9em",
                  textTransform: "lowercase",
                }}
              >
                ({translate("common.settings")} / {translate("common.actual")})
              </span>
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
        <TabbedForm.Tab label="common.bot_edit_tab_01">
          <Container maxWidth="md" sx={{ ml: 0 }}>
            <h2>{translate("common.bot_edit_tab_01_main_heading")}</h2>
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
                <ReferenceInput reference="users" source="user_id">
                  <AutocompleteInput
                    filterToQuery={usernameFilterToQuery}
                    label="common.client"
                    margin="none"
                    optionText="username"
                    validate={required()}
                    variant="standard"
                  />
                </ReferenceInput>
              </Grid>
              <Grid item xs={12} md={6}>
                <ReferenceInput source="exchange_id" reference="exchanges">
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
                  margin="none"
                  source="baseAsset"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <NumberInput
                  label="common.botlimit_label"
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
                  label="common.timeframe"
                  sourceName="timeframe"
                  required={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <PeriodsSelectInput
                  periodChoices={periodToFilter}
                  label="common.period"
                  sourceName="period"
                  required={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BooleanInput
                  label="common.auto_sell_limit_label"
                  source="auto_sell_limit"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BooleanInput
                  label="common.auto_buy_limit_label"
                  source="auto_buy_limit"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BooleanInput label="common.useBNB_label" source="useBNB" />
              </Grid>
              <Grid item xs={12} md={6}>
                <BooleanInput label="common.auto_on_label" source="auto_on" />
              </Grid>
              <Grid item xs={12}>
                <TextInput margin="none" source="apikey" />
              </Grid>
              <Grid item xs={12}>
                <TextInput margin="none" source="apisecret" />
              </Grid>
              {record.exchange_id === 3 && (
                <Grid item xs={12}>
                  <TextInput margin="none" source="apipassword" />
                </Grid>
              )}
            </Grid>
          </Container>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="common.bot_edit_tab_02">
          <Container maxWidth="xl" sx={{ ml: 0 }}>
            <h2>{translate("common.bot_edit_tab_02_main_heading")}</h2>
          </Container>
          <Container sx={{ ml: 0, maxWidth: "1598px" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.auto_pair_count_label"
                  margin="none"
                  min={baseMin}
                  source="auto_pair_count"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.auto_limit_pair_label"
                  margin="none"
                  min={baseMin}
                  source="auto_limit_pair"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.auto_order_count_label"
                  margin="none"
                  min={baseMin}
                  source="auto_order_count"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.auto_offset_label"
                  margin="none"
                  min={baseMin}
                  source="auto_offset"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.auto_start_sum_label"
                  margin="none"
                  min={baseMin}
                  source="auto_start_sum"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.auto_step_label"
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
                  label="common.auto_profit_label"
                  margin="none"
                  min={baseMin}
                  source="auto_profit"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.auto_squiz_label"
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
                  label="common.timeout_label"
                  margin="none"
                  min={baseMin}
                  source="timeout"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.next_buy_timeout_label"
                  margin="none"
                  min={baseMin}
                  source="next_buy_timeout"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <TimeFramesSelectInput
                  frameChoices={autoPairTfToFilter}
                  label="common.auto_pair_tf_label"
                  required={true}
                  sourceName="auto_pair_tf"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.auto_rsi_min_big_label"
                  margin="none"
                  min={baseMin}
                  source="auto_rsi_min_big"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.auto_rsi_max_big_label"
                  margin="none"
                  min={baseMin}
                  source="auto_rsi_max_big"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.auto_pd_up_label"
                  margin="none"
                  min={baseMin}
                  source="auto_pd_up"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.auto_pd_down_label"
                  margin="none"
                  min={baseMin}
                  source="auto_pd_down"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.auto_pd_pause_label"
                  margin="none"
                  min={baseMin}
                  source="auto_pd_pause"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.pd_up_label"
                  margin="none"
                  min={baseMin}
                  source="pd_up"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.pd_down_label"
                  margin="none"
                  min={baseMin}
                  source="pd_down"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <NumberInput
                  defaultValue={baseMin}
                  label="common.pd_pause_label"
                  margin="none"
                  min={baseMin}
                  source="pd_pause"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <AutocompleteArrayInput
                  choices={whitelistData}
                  label={"common.whitelist_label"}
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
        <TabbedForm.Tab label="common.bot_edit_tab_03">
          <Container maxWidth="xl" sx={{ ml: 0 }}>
            <h2>{translate("common.bot_edit_tab_03_main_heading")}</h2>
          </Container>
          <Container sx={{ ml: 0, maxWidth: "1598px" }}>
            <Grid container justifyContent={"space-between"} spacing={1}>
              {/* <Grid item xs={12}>
                <BooleanInput label="Sell by RSI" source="rsi_sell" />
              </Grid> */}
              <Grid item xs={12} lg={6} xl={5}>
                <h3>{translate("common.rsi_heading_01")}</h3>
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
                      label="common.auto_short_tf_label"
                      sourceName="auto_short_tf"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PeriodsSelectInput
                      label="common.auto_rsi_period_label"
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
                      label="common.auto_rsi_min_label"
                      margin="none"
                      min={baseMin}
                      source="auto_rsi_min"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      label="common.auto_rsi_max_label"
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
                  label="common.auto_use_ltf_label"
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
                        label="common.auto_long_tf_label"
                        sourceName="auto_long_tf"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <PeriodsSelectInput
                        label="common.auto_rsi_period_1h_label"
                        periodChoices={autoRsiPeriod1hOptionsToFilter}
                        sourceName="auto_rsi_period_1h"
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
                      label="common.auto_rsi_min_1h_label"
                      margin="none"
                      min={baseMin}
                      source="auto_rsi_min_1h"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      label="common.auto_rsi_max_1h_label"
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
                <h2>{translate("common.rsi_heading_02")}</h2>
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
                      label="common.auto_sell_tf_label"
                      sourceName="auto_sell_tf"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PeriodsSelectInput
                      label="common.auto_sell_period_label"
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
                      label="common.auto_rsi_min_sell_label"
                      margin="none"
                      min={baseMin}
                      source="auto_rsi_min_sell"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      label="common.auto_rsi_max_sell_label"
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
                  label="common.auto_rsi_diff_label"
                  margin="none"
                  min={baseMin}
                  source="auto_rsi_diff"
                  variant="standard"
                />
                <NumberInput
                  label="common.rsi_sell_diff_label"
                  margin="none"
                  min={baseMin}
                  source="rsi_sell_diff"
                  variant="standard"
                />
                <NumberInput
                  label="common.long_dump_label"
                  margin="none"
                  min={baseMin}
                  source="long_dump"
                  variant="standard"
                />
                <NumberInput
                  label="common.long_pump_label"
                  margin="none"
                  min={baseMin}
                  source="long_pump"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Container>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="common.bot_edit_tab_04">
          <Container maxWidth="xl" sx={{ ml: 0 }}>
            <h2>{translate("common.bot_edit_tab_04_main_heading")}</h2>
          </Container>
          <Container maxWidth="md" sx={{ ml: 0 }}>
            <ReferenceManyField
              reference="bot_pause"
              target="bot_id"
              label="Bot pauses"
            >
              <Datagrid bulkActionButtons={false} rowClick={false}>
                <DateField
                  showTime
                  sortable={false}
                  source="pause_start"
                />
                <FunctionField
                  sortable={false}
                  source="pause_end"
                  render={(record: BotPause) => {
                    if (record.pause_end) {
                      return (
                        <DateField
                          source="pause_end"
                          showTime
                          sortable={false}
                        />
                      );
                    } else {
                      return <p style={{ color: "red" }}>{translate("common.pause_end_not_set")}</p>;
                    }
                  }}
                />
              </Datagrid>
            </ReferenceManyField>
          </Container>
        </TabbedForm.Tab>
        <TabbedForm.Tab
          label="common.bot_edit_tab_05"
          path={`/bots/${botId}/pairs`}
        ></TabbedForm.Tab>
      </TabbedForm>
    </div>
  );
};

const BotTitle = () => {
  const record = useRecordContext(),
    translate = useTranslate();
  if (!record) return null;
  return <>{translate("common.bot")} {record ? `"${record.title}" (id: ${record.id})` : ""}</>;
};

export const BotEdit = () => {
  return (
    <Edit redirect={false} title={<BotTitle />}>
      <Editform />
    </Edit>
  );
};
