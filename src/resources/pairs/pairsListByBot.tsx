import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Datagrid,
  EditButton,
  FunctionField,
  List,
  Loading,
  TextField,
  TextInput,
  WithListContext,
  useGetOne,
} from "react-admin";
import { BotPair } from "../../types";
import GridData from "../../helpers/GridData";
import { PairPanel } from "./pairPanel";
import IdxMaster from "../../layouts/idxMaster";
import BtnsStateControl from "../../layouts/btnsStateControl";
import { Box, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SettingsIcon from "@mui/icons-material/Settings";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
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
  const { data: botData, isLoading: isLoadingBotData } = useGetOne<Bot>(
    "bots",
    { id: botId }
  );
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
            render={(record: BotPair) => {
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
                  <CircleIcon color={stateColor} sx={{ fontSize: "0.9em" }} />
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
