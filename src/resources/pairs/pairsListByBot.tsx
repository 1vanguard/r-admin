import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Datagrid,
  EditButton,
  FunctionField,
  List,
  Loading,
  ReferenceField,
  TextField,
  TextInput,
  useGetOne,
  WithListContext,
} from "react-admin";
import { Bot, BotPair } from "../../types";
import GridData from "../../helpers/GridData";

import BtnsStateControl from "../../layouts/btnsStateControl";
import IdxMaster from "../../layouts/idxMaster";
import StateIcon from "../../layouts/stateIcon";

import { PairPanel } from "./pairPanel";

import { Box, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";

const NoPairs = (props) => {
  const pairState = props.state;
  let noText = "No Pairs";

  if (pairState === 0) {
    noText = "Bot has no inactive pairs";
  }
  return (
    <Box>
      <Typography>{noText}</Typography>
    </Box>
  );
};

const pairsFilters = [
  <TextInput label="Symbol" source="symbol_like" alwaysOn />,
  <TextInput label="Id" source="id_like" alwaysOn />,
];

const inactivePairsFilters = [
  <TextInput label="Symbol" source="symbol_like" alwaysOn />,
  <TextInput label="Id" source="id_like" alwaysOn />,
];

const PairsListByBot = () => {
  const { id: botId } = useParams();
  const { data: botData, isLoading: isLoadingBotData, error: errorBotData } = useGetOne<Bot>(
    "bots",
    { id: botId }
  );

  isLoadingBotData && <Loading />
  errorBotData && <div>Error bot data</div>

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box className="pairsListByBot">
      <h2>Bot <small>(id:{botId})</small> {botData?.title} pairs</h2>
      <List
        resource="pairs"
        filter={{ bot_id: botId, state: [1, 2] }}
        filters={pairsFilters}
        perPage={1000000}
        pagination={false}
        sx={{ marginBottom: 3 }}
        disableSyncWithLocation
      >
        <Datagrid
          expand={<PairPanel />}
          bulkActionButtons={false}
          sx={{
            "& .RaDatagrid-row": {
              backgroundColor: "rgb(46 125 50 / 5%)",
            },
          }}
        >
          <TextField source="id" />
          <FunctionField
            source="state"
            label="State"
            sortable={true}
            sortBy="state"
            render={(record: Bot) => <StateIcon record={record} />}
          />
          <FunctionField
            source="symbol"
            label="Pair"
            sortable={true}
            sortBy="symbol"
            render={(record: BotPair) => {
              let pairPauseUntil;

              if (record.pause_until) {
                pairPauseUntil = (
                  <span style={{ fontSize: "0.8em" }}>
                    <span style={{ fontWeight: "700", marginRight: "5px" }}>
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
                        icon={<SettingsIcon style={{ fontSize: "1em" }} />}
                      />
                    </span>
                  </span>
                  {pairPauseUntil}
                </div>
              );
            }}
          />
          <ReferenceField
            label="Exchange"
            link={(record: any, reference: any) => `/exchanges/${record.id}`}
            reference="exchange"
            source="exchangeId"
          >
            <FunctionField render={(record: Exchange) => record.title} />
          </ReferenceField>
          <FunctionField
            label="RSI_S"
            render={(record: BotPair) => {
              return <IdxMaster idxName="RSI_S" pairId={record.id}></IdxMaster>;
            }}
          />
          <FunctionField
            label="RSI_L"
            render={(record: BotPair) => {
              return <IdxMaster idxName="RSI_L" pairId={record.id}></IdxMaster>;
            }}
          />
          <FunctionField
            label="RSI_SELL"
            render={(record: BotPair) => {
              return (
                <IdxMaster idxName="RSI_SELL" pairId={record.id}></IdxMaster>
              );
            }}
          />
          <FunctionField
            label="Price"
            style={{ textAlign: "center" }}
            render={(record: BotPair) => {
              return <IdxMaster idxName="Price" pairId={record.id}></IdxMaster>;
            }}
          />
          <FunctionField
            label="In orders (USDT)"
            render={(record: BotPair) => {
              return (
                <GridData type="pair" id={record.id} parameter="in_orders" />
              );
            }}
          />
          <FunctionField
            label="Purchases"
            render={(record: BotPair) => {
              return (
                <GridData type="pair" id={record.id} parameter="purchases" />
              );
            }}
          />
          <FunctionField
            label="Sales"
            render={(record: BotPair) => {
              return <GridData type="pair" id={record.id} parameter="sales" />;
            }}
          />
        </Datagrid>
      </List>
      <h2>Inactive pairs</h2>
      <List
        resource="pairs"
        filter={{ bot_id: botId, state: 0 }}
        filters={inactivePairsFilters}
        perPage={1000000}
        pagination={false}
        disableSyncWithLocation
        empty={<NoPairs state={0} />}
      >
        <WithListContext
          render={({
            isLoading: isLoadingInactivePairs,
            data: inactivePairsData,
          }) => {
            if (isLoadingInactivePairs) {
              return <Loading />;
            }
            if (inactivePairsData && inactivePairsData.length > 0) {
              return (
                <Box>
                  <Box sx={{ margin: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch checked={checked} onChange={handleChange} />
                      }
                      label="Show inactive bot's pairs"
                    />
                  </Box>
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
                </Box>
              );
            }
            return null;
          }}
        />
      </List>
    </Box>
  );
};

export default PairsListByBot;
