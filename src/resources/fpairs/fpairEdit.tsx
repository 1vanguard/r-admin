import * as React from "react";
import { Link } from "react-router-dom";
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
  useCreatePath,
  useGetOne,
  useRecordContext,
  useTranslate,
} from "react-admin";

import { FPairPause } from "../../types";
// import { PeriodsSelectInput } from "../../layouts/periodsSelectInput";
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
// import { TimeFramesSelectInput } from "../../layouts/timeFramesSelectInput";
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
  baseMin = 0;
/* entryShortRsiTfToFilter = [5, 15, 30, 60, 240],
  entryLongRsiTfToFilter = [5, 30, 60, 240],
  autoPairRsiTfToFilter = [30, 60, 240, 1440],
  rsiPeriodOptionsToFilter = [6, 8, 10, 12, 14],
  rsiPeriodLongOptionsToFilter = [6, 8, 10, 12, 14],
  rsiTimeframeOptionsToFilter = [1, 5, 15, 30, 60, 240, 1440, 10080, 43200],
  aiutoSellRsiTfToFilter = [5, 15, 30, 60, 240, 1440],
  autoRsiSellPeriodOptionsToFilter = [6, 8, 10, 12, 14], */

const Editform = () => {
  const record = useRecordContext(),
    createPath = useCreatePath(),
    translate = useTranslate();
  if (!record) return null;

  const botId = record?.bot_id;
  const {
    data: botData,
    isLoading: isLoadingBoatData,
    error: errorBotData,
  } = useGetOne("fbots", {
    id: botId,
  });

  if (isLoadingBoatData) return <Loading />;
  if (errorBotData)
    return (
      <div className="error loadData">{translate("errors.loadDataError")}</div>
    );

  return (
    <div>
      <Box sx={{ padding: 2 }}>
        <h2 style={{ margin: 0 }}>
          {record.symbol}{" "}
          <small>
            ({translate("common.bot")}:{" "}
            <Link
              to={createPath({ resource: "fbots", type: "edit", id: botId })}
            >
              {botData?.title}
            </Link>
            )
          </small>
        </h2>
      </Box>
      <TabbedForm toolbar={<PrymaryEditToolbar />} id="editPairForm">
        <TabbedForm.Tab label="common.pair_edit_tab_01">
          <Container maxWidth="xl" sx={{ ml: 0 }}>
            <h2>{translate("common.pair_edit_tab_01_main_heading")}</h2>
            <Grid container spacing={1}>
              <Grid item xs={12} xl={4}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md="auto" sx={{ textAlign: "center" }}>
                    <IdMark id={record.id} />
                  </Grid>
                  <Grid item xs={12} md>
                    <TextInput
                      defaultValue={record.title}
                      margin="none"
                      source="symbol"
                      validate={required()}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} xl={8}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
                    <ReferenceInput
                      filter={{ state: [1, 2] }}
                      reference="fbots"
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
                  <Grid item xs={12} md={4}>
                    <TextInput source="base_cur" variant="standard" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextInput source="alt_cur" variant="standard" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <NumberInput
                  min={baseMin}
                  source="pair_limit"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <NumberInput
                  min={baseMin}
                  source="start_orders"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <NumberInput
                  min={baseMin}
                  source="start_sum"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4} xl={3}>
                <NumberInput
                  min={baseMin}
                  source="step"
                  validate={required()}
                  variant="standard"
                />
              </Grid>

              {/* Скорее всего актуально */}
              <Grid item xs={12} md={4} xl={3}>
                <NumberInput
                  label="Martingale"
                  min={baseMin}
                  source="martin"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <NumberInput
                  label="Start offset"
                  min={baseMin}
                  source="start_offset"
                  variant="standard"
                />
              </Grid>
              {/* --- */}

              <Grid item xs={12} md={4} xl={3}>
                <NumberInput
                  min={baseMin}
                  source="profit"
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <NumberInput min={baseMin} source="squiz" variant="standard" />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <NumberInput
                  min={baseMin}
                  source="start_timeout"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <NumberInput
                  min={baseMin}
                  source="next_buy_timeout"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <NumberInput
                  min={baseMin}
                  source="auto_add_step"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <NumberInput
                  min={baseMin}
                  source="stoploss"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
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
              <Grid item xs={12}>
                <hr />
              </Grid>
              <Grid item xs={12} lg={4}>
                <h3 style={{ marginTop: 0 }}>
                  <Tooltip
                    arrow
                    leaveDelay={200}
                    placement="right-start"
                    title={translate(
                      "common.pair_indicators_group_05_tooltip_title"
                    )}
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>
                    {translate("common.pair_indicators_group_05_heading")}
                  </span>
                </h3>
                <NumberInput min={baseMin} source="pd_up" variant="standard" />
                <NumberInput
                  min={baseMin}
                  source="pd_down"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} lg={8}>
                <h3 style={{ marginTop: 0 }}>
                  <Tooltip
                    arrow
                    leaveDelay={200}
                    placement="right-start"
                    title={translate(
                      "common.pair_indicators_group_06_tooltip_title"
                    )}
                  >
                    <InfoOutlinedIcon
                      sx={{ mr: "0.3em", verticalAlign: "top" }}
                    />
                  </Tooltip>
                  <span>
                    {translate("common.pair_indicators_group_06_heading")}
                  </span>
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
              <Grid item xs={12}>
                <hr />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <DateTimeInput
                  readOnly={true}
                  source="pause_until"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <DateTimeInput
                  readOnly={true}
                  source="last_buy"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <NumberInput
                  readOnly={true}
                  source="price"
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
            <ReferenceManyField reference="bot_fpause" target="pair_id">
              <Datagrid bulkActionButtons={false}>
                <DateField source="pause_start" showTime sortable={false} />
                <FunctionField
                  source="pause_end"
                  sortable={false}
                  render={(record: FPairPause) => {
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
                        <p style={{ color: "red" }}>
                          {translate("common.pause_end_not_set")}
                        </p>
                      );
                    }
                  }}
                />
              </Datagrid>
            </ReferenceManyField>
          </Container>
        </TabbedForm.Tab>
        <TabbedForm.Tab
          label="common.pair_edit_tab_04"
          path={`/fpairs/${record.id}/forders`}
        ></TabbedForm.Tab>
      </TabbedForm>
    </div>
  );
};

const PairTitle = () => {
  const record = useRecordContext(),
    translate = useTranslate();
  if (!record) return null;
  return (
    <>
      {translate("common.pair")}{" "}
      {record ? `"${record.symbol}" (id: ${record.id})` : ""}
    </>
  );
};

export const FPairEdit = () => {
  const userId = localStorage.getItem("uid"),
    parsedUserId = userId ? parseInt(userId) : null,
    transform = (data: any) => ({
      ...data,
      modified_by: parsedUserId,
    });
  return (
    <Edit redirect={false} title={<PairTitle />} transform={transform}>
      <Editform />
    </Edit>
  );
};
