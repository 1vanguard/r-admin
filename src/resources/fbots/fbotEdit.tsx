import * as React from "react";
import {
  AutocompleteArrayInput,
  AutocompleteInput,
  BooleanInput,
  Datagrid,
  DateField,
  DateTimeInput,
  Edit,
  FormDataConsumer,
  FunctionField,
  Loading,
  NumberInput,
  ReferenceInput,
  ReferenceManyField,
  required,
  SelectInput,
  TabbedForm,
  TextInput,
  useGetList,
  useGetManyReference,
  useNotify,
  useRecordContext,
  useRefresh,
  useTranslate,
} from "react-admin";

import { FBotPause } from "../../types";
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";
import BotIndicators from "../../layouts/botIndicators";
import BotPairsCounter from "../../layouts/botPairsCounter";
import GridData from "../../helpers/GridData";
import IdMark from "../../layouts/idMark";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

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
  } = useGetManyReference("fpairs", {
    target: "bot_id",
    id: record?.id,
    pagination: { page: 1, perPage: 1000000 },
  });

  const {
    data: whitelistData,
    isLoading: isLoadingWhitelist,
    error: errorWhitelist,
  } = useGetList("whitelist");

  const {
    data: strategiesData,
    isLoading: isLoadingStrategies,
    error: errorStrategies,
  } = useGetList("fbots", {
    pagination: { page: 1, perPage: 1000000 },
    sort: { field: "id", order: "ASC" },
    filter: { is_strategy: 1 },
  });

  if (isLoadingPairs || isLoadingWhitelist || isLoadingStrategies)
    return <Loading />;
  if (errorPairs || errorWhitelist || errorStrategies) {
    return (
      <div className="error loadData">{translate("errors.loadDataError")}</div>
    );
  }

  const botIndicators = record?.indicators;
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
              <GridData type="fbot" id={botId} parameter="in_trades" />
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
        shouldUnregister={true}
      >
        <TabbedForm.Tab label="common.bot_edit_tab_01" value={record}>
          <Container maxWidth="md" sx={{ ml: 0 }}>
            <h2>{translate("common.bot_edit_tab_01_main_heading")}</h2>
          </Container>
          <FormDataConsumer>
            {({ formData, ...rest }) => (
              <Container maxWidth="md" sx={{ ml: 0 }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md="auto" sx={{ textAlign: "center" }}>
                        <IdMark id={botId} />
                      </Grid>
                      <Grid item xs={12} md>
                        <TextInput
                          defaultValue={record.title}
                          margin="none"
                          source="title"
                          validate={required()}
                          variant="standard"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <BooleanInput source="is_strategy" />
                  </Grid>
                  {formData.is_strategy == false ? (
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
                          <BooleanInput
                            className={
                              formData.use_strategy
                                ? "active useStrategy"
                                : "useStrategy"
                            }
                            helperText={translate("common.use_strategy_desc")}
                            source="use_strategy"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <SelectInput
                            className={
                              formData.use_strategy
                                ? "active useStrategy"
                                : "useStrategy"
                            }
                            choices={strategiesData}
                            margin="none"
                            optionText="title"
                            optionValue="id"
                            source="strategy"
                            variant="standard"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}
                  <Grid item xs={12} md={6}>
                    <ReferenceInput reference="users" source="user_id">
                      <AutocompleteInput
                        filterToQuery={usernameFilterToQuery}
                        label="common.client"
                        margin="none"
                        optionText="username"
                        // validate={required()}
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
                    <NumberInput
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="auto_pair_count"
                      variant="standard"
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
                    <BooleanInput
                      className={
                        formData.useStrategy
                          ? "active useStrategy"
                          : "useStrategy"
                      }
                      label="common.auto_on_label"
                      source="auto_on"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <h3 style={{ marginTop: 0 }}>
                      <Tooltip
                        arrow
                        leaveDelay={200}
                        placement="right-start"
                        title={translate(
                          "common.bot_indicators_group_05_tooltip_title"
                        )}
                      >
                        <InfoOutlinedIcon
                          sx={{ mr: "0.3em", verticalAlign: "top" }}
                        />
                      </Tooltip>
                      <span>
                        {translate("common.bot_indicators_group_05_heading")}
                      </span>
                    </h3>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <NumberInput
                          className={
                            formData.use_strategy
                              ? "active useStrategy"
                              : "useStrategy"
                          }
                          defaultValue={baseMin}
                          label="common.auto_pd_up_label"
                          min={baseMin}
                          source="auto_pd_up"
                          variant="standard"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <NumberInput
                          className={
                            formData.use_strategy
                              ? "active useStrategy"
                              : "useStrategy"
                          }
                          defaultValue={baseMin}
                          label="common.auto_pd_down_label"
                          min={baseMin}
                          source="auto_pd_down"
                          variant="standard"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DateTimeInput
                          readOnly={true}
                          source="pause_until"
                          variant="standard"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <h3 style={{ marginTop: 0 }}>
                      <Tooltip
                        arrow
                        leaveDelay={200}
                        placement="right-start"
                        title={translate(
                          "common.bot_indicators_group_06_tooltip_title"
                        )}
                      >
                        <InfoOutlinedIcon
                          sx={{ mr: "0.3em", verticalAlign: "top" }}
                        />
                      </Tooltip>
                      <span>
                        {translate("common.bot_indicators_group_06_heading")}
                      </span>
                    </h3>
                    <NumberInput
                      className={formData.use_strategy ? "active" : ""}
                      min={baseMin}
                      source="long_pump"
                      variant="standard"
                    />
                    <NumberInput
                      className={formData.use_strategy ? "active" : ""}
                      min={baseMin}
                      source="long_dump"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <hr />
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
                  <Grid item xs={12}>
                    <DateTimeInput
                      readOnly={true}
                      source="created"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </Container>
            )}
          </FormDataConsumer>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="common.bot_edit_tab_02" value={record}>
          <Container maxWidth="xl" sx={{ ml: 0 }}>
            <h2>{translate("common.bot_edit_tab_02_main_heading")}</h2>
          </Container>
          <FormDataConsumer>
            {({ formData, ...rest }) => (
              <Container sx={{ ml: 0, maxWidth: "1598px" }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      defaultValue={baseMin}
                      className={
                        formData.use_strategy
                          ? "active useStrategy"
                          : "useStrategy"
                      }
                      margin="none"
                      min={baseMin}
                      source="auto_limit_pair"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      className={
                        formData.useStrategy
                          ? "active useStrategy"
                          : "useStrategy"
                      }
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="auto_order_count"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      className={
                        formData.useStrategy
                          ? "active useStrategy"
                          : "useStrategy"
                      }
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="auto_start_sum"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      className={
                        formData.useStrategy
                          ? "active useStrategy"
                          : "useStrategy"
                      }
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="auto_step"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      className={
                        formData.useStrategy
                          ? "active useStrategy"
                          : "useStrategy"
                      }
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="auto_profit"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      className={
                        formData.useStrategy
                          ? "active useStrategy"
                          : "useStrategy"
                      }
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="auto_squiz"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      className={
                        formData.use_strategy
                          ? "active useStrategy"
                          : "useStrategy"
                      }
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="timeout"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      className={
                        formData.use_strategy
                          ? "active useStrategy"
                          : "useStrategy"
                      }
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="next_buy_timeout"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AutocompleteArrayInput
                      choices={whitelistData}
                      format={(value) => {
                        if (value === null) {
                          return "";
                        } else {
                          if (typeof value === "string") {
                            return value.split(";").map((pair) => pair.trim());
                          } else {
                            return value;
                          }
                        }
                      }}
                      optionText="symbol"
                      optionValue="symbol"
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
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      className={
                        formData.use_strategy
                          ? "active useStrategy"
                          : "useStrategy"
                      }
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="auto_offset"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="pd_up"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="pd_down"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="auto_pd_pause"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="pd_pause"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <hr />
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="leverage"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <NumberInput
                      defaultValue={baseMin}
                      margin="none"
                      min={baseMin}
                      source="futures"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <BotIndicators
                      botId={botId}
                      botType="fbot"
                      indicatorsData={botIndicators}
                      useStrategy={formData.use_strategy}
                    />
                  </Grid>
                </Grid>
              </Container>
            )}
          </FormDataConsumer>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="common.bot_edit_tab_04" value={record}>
          <Container maxWidth="xl" sx={{ ml: 0 }}>
            <h2>{translate("common.bot_edit_tab_04_main_heading")}</h2>
          </Container>
          <Container maxWidth="md" sx={{ ml: 0 }}>
            <ReferenceManyField
              reference="bot_fpause"
              target="bot_id"
              label="Bot pauses"
            >
              <Datagrid bulkActionButtons={false} rowClick={false}>
                <DateField showTime sortable={false} source="pause_start" />
                <FunctionField
                  sortable={false}
                  source="pause_end"
                  render={(record: FBotPause) => {
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
          label="common.bot_edit_tab_05"
          path={`/fbots/${botId}/fpairs`}
          value={record}
        ></TabbedForm.Tab>
      </TabbedForm>
    </div>
  );
};

const BotTitle = () => {
  const record = useRecordContext(),
    translate = useTranslate();
  if (!record) return null;
  return (
    <>
      {translate("common.bot")}{" "}
      {record ? `"${record.title}" (id: ${record.id})` : ""}
    </>
  );
};

export const FBotEdit = () => {
  const translate = useTranslate(),
    userId = localStorage.getItem("uid"),
    parsedUserId = userId ? parseInt(userId) : null,
    transform = (data) => ({
      ...data,
      modified_by: parsedUserId,
    }),
    notify = useNotify(),
    refresh = useRefresh(),
    onSuccess = () => {
      refresh();
      notify(translate("ra.notification.updated", { smart_count: 1 }));
    };

  return (
    <Edit
      redirect={false}
      title={<BotTitle />}
      transform={transform}
      mutationOptions={{ onSuccess }}
      mutationMode="pessimistic"
    >
      <Editform />
    </Edit>
  );
};
