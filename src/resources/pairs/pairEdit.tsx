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
  useTranslate,
} from "react-admin";

import { PairPause } from "../../types";
import { PeriodsSelectInput } from "../../layouts/periodsSelectInput";
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import { TimeFramesSelectInput } from "../../layouts/timeFramesSelectInput";
import IdMark from "../../layouts/idMark";

import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

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
    translate = useTranslate();
  if (!record) return null

  const botId = record?.bot_id;
  const {
    data: botData,
    isLoading: isLoadingBoatData,
    error: errorBotData,
  } = useGetOne("bots", {
    id: botId,
  });

  if (isLoadingBoatData) return <Loading />;
  if (errorBotData) return <div className="error loadData">{translate("errors.loadDataError")}</div>;

  return (
    <div>
      <Box sx={{ padding: 2 }}>
        <h2 style={{ margin: 0 }}>
          {record.symbol} <small>({translate("common.bot")}: {botData?.title})</small>
        </h2>
      </Box>
      <TabbedForm toolbar={<PrymaryEditToolbar />} id="editPairForm">
        <TabbedForm.Tab label="common.pair_edit_tab_01">
          <Container maxWidth="md" sx={{ ml: 0 }}>
            <h2>{translate("common.pair_edit_tab_01_main_heading")}</h2>
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
                <IdMark id={record.id} />
              </Grid>
              <Grid item xs={12} sm={8} md={10} lg={11}>
                <TextInput
                  defaultValue={record.title}
                  margin="none"
                  source="symbol"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <ReferenceInput
                  filter={{ state: [1, 2] }}
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
              {/* <Grid item xs={12} sm={4}>
                <SelectInput
                  source="strategy"
                  choices={strategies}
                  validate={required()}
                  defaultValue={record.state}
                />
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <TextInput
                  source="base_cur"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextInput
                  source="alt_cur"
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <NumberInput
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
                  min={baseMin}
                  source="start_orders"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <NumberInput
                  min={baseMin}
                  source="start_sum"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <NumberInput
                  label="Start offset"
                  source="start_offset"
                  min={baseMin}
                />
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <NumberInput
                  min={baseMin}
                  source="pair_limit"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <NumberInput
                  label="Martingale"
                  source="martin"
                  min={baseMin}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <NumberInput
                  label="Additional Martingale"
                  source="add_martin"
                  min={baseMin}
                />
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <NumberInput
                  min={baseMin}
                  source="step"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <NumberInput
                  label="Additional Step"
                  source="add_step"
                  min={baseMin}
                />
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <NumberInput
                  min={baseMin}
                  source="profit"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <NumberInput
                  min={baseMin}
                  source="squiz"
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
              <Grid item xs={12} sm={4}>
                <NumberInput
                  format={(value) => {
                    if (value) {
                      return value.toString().replace(/0+$/, "");
                    }
                    return value;
                  }}
                  min={baseMin}
                  source="growth"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <NumberInput
                  min={baseMin}
                  source="start_timeout"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <NumberInput
                  min={baseMin}
                  source="next_buy_timeout"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Container>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="common.pair_edit_tab_02">
          <Container maxWidth="md" sx={{ ml: 0 }}>
            <h2>{translate("common.pair_edit_tab_02_main_heading")}</h2>
          </Container>
          <Container maxWidth="xl" sx={{ ml: 0, maxWidth: "1598px" }}>
            <Grid container justifyContent={"space-between"} spacing={1}>
              <Grid item xs={12} lg={6} xl={5} sx={{ paddingBottom: 5 }}>
                <h3 style={{ marginTop: 0 }}>
                  <Tooltip
                    arrow
                    leaveDelay={200}
                    placement="right-start"
                    title={translate("common.pair_indicators_group_01_tooltip_title")}
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>{translate("common.pair_indicators_group_01_heading")}</span>
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
                      label="common.rsi_timeframe_label"
                      required={true}
                      sourceName="rsi_timeframe"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PeriodsSelectInput
                      label="common.rsi_period_label"
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
                      min={baseMin}
                      source="rsi_min"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      min={baseMin}
                      source="rsi_max"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TimeFramesSelectInput
                      frameChoices={entryShortRsiTfToFilter}
                      label="common.rsi_short_tf_label"
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
                    title={translate("common.pair_indicators_group_02_tooltip_title")}
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>{translate("common.pair_indicators_group_02_heading")}</span>
                </h3>
                <BooleanInput
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
                      label="common.rsi_long_tf_label"
                      sourceName="rsi_long_tf"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PeriodsSelectInput
                      label="common.rsi_period_1h_label"
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
                      min={baseMin}
                      source="rsi_min_1h"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
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
                    title={translate("common.pair_indicators_group_03_tooltip_title")}
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>{translate("common.pair_indicators_group_03_heading")}</span>
                </h3>
                {/* <BooleanInput label="Auto" source="is_auto" /> */}
                <BooleanInput
                  source="rsi_sell"
                />
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      min={baseMin}
                      source="rsi_diff"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
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
                    title={translate("common.pair_indicators_group_04_tooltip_title")}
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>{translate("common.pair_indicators_group_04_heading")}</span>
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
                      label="common.auto_pair_tf_label"
                      sourceName="auto_pair_tf"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PeriodsSelectInput
                      label="common.auto_sell_period_label"
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
                      min={baseMin}
                      source="auto_rsi_min_big"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      min={baseMin}
                      source="auto_rsi_max_big"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TimeFramesSelectInput
                      frameChoices={aiutoSellRsiTfToFilter}
                      label="common.auto_sell_tf_label"
                      sourceName="auto_sell_tf"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      min={baseMin}
                      source="auto_rsi_min_sell"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
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
                    title={translate("common.pair_indicators_group_05_tooltip_title")}
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>{translate("common.pair_indicators_group_05_heading")}</span>
                </h3>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      min={baseMin}
                      source="pd_up"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberInput
                      min={baseMin}
                      source="pd_down"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <DateTimeInput
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
                    title={translate("common.pair_indicators_group_06_tooltip_title")}
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>{translate("common.pair_indicators_group_06_heading")}</span>
                </h3>
                <NumberInput
                  min={baseMin}
                  source="long_pump"
                  variant="standard"
                />
                <NumberInput
                  min={baseMin}
                  source="long_dump"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Container>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="common.pair_edit_tab_03">
          <Container maxWidth="xl" sx={{ ml: 0 }}>
            <h2>{translate("common.pair_edit_tab_03_main_heading")}</h2>
          </Container>
          <Container maxWidth="md" sx={{ ml: 0 }}>
            <ReferenceManyField
              reference="bot_pause"
              target="pair_id"
            >
              <Datagrid bulkActionButtons={false}>
                <DateField
                  source="pause_start"
                  showTime
                  sortable={false}
                />
                <FunctionField
                  source="pause_end"
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
                      return <p style={{ color: "red" }}>{translate("common.pause_end_not_set")}</p>;
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
  const record = useRecordContext(),
    translate = useTranslate();
  if (!record) return null;
  return <>{translate("common.pair")} {record ? `"${record.symbol}" (id: ${record.id})` : ""}</>;
};

export const PairEdit = () => {
  return (
    <Edit redirect={false} title={<PairTitle />}>
      <Editform />
    </Edit>
  );
};
