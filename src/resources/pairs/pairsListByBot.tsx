import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Datagrid,
  FunctionField,
  List,
  Loading,
  ReferenceField,
  TextField,
  TextInput,
  useGetOne,
  WithListContext,
} from "react-admin";

import { Bot, BotPair, Exchange } from "../../types";
import { PairPanel } from "./pairPanel";
import GridData from "../../helpers/GridData";
import IdxMaster from "../../layouts/idxMaster";
import ItemStateControlBar from "../../layouts/itemStateControlBar";
import StateIcon from "../../layouts/stateIcon";

import { Box, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const NoPairs = (props: any) => {
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
  const {
    data: botData,
    isLoading: isLoadingBotData,
    error: errorBotData,
  } = useGetOne<Bot>("bots", { id: botId });

  isLoadingBotData && <Loading />;
  errorBotData && <div>Error bot data</div>;

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box className="pairsListByBot">
      <h2>
        Bot <small>(id:{botId})</small> {botData?.title} pairs
      </h2>
      <List
        disableSyncWithLocation
        filter={{ bot_id: botId, state: [1, 2] }}
        filters={pairsFilters}
        pagination={false}
        perPage={1000000}
        resource="pairs"
        sx={{ marginBottom: 3 }}
      >
        <Datagrid
          bulkActionButtons={false}
          expand={<PairPanel />}
          rowClick={false}
          sx={{
            "& .RaDatagrid-row": {
              backgroundColor: "rgb(46 125 50 / 5%)",
            },
          }}
        >
          <TextField source="id" />
          <FunctionField
            label="State"
            render={(record: Bot) => <StateIcon record={record} />}
            sortable={true}
            sortBy="state"
            source="state"
          />
          <FunctionField
            label="Pair"
            render={(record: BotPair) => (
              <ItemStateControlBar record={record} />
            )}
            sortable={true}
            sortBy="symbol"
            source="symbol"
          />
          <ReferenceField
            label="Exchange"
            link={(record: any, reference: any) =>
              `/${reference}s/${record.id}`
            }
            reference="exchange"
            sortable={false}
            source="exchange_id"
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
      <h2 style={{ marginBottom: 0 }}>Inactive pairs</h2>
      <List
        disableSyncWithLocation
        empty={<NoPairs state={0} />}
        filter={{ bot_id: botId, state: 0 }}
        filters={inactivePairsFilters}
        pagination={false}
        perPage={1000000}
        resource="pairs"
      >
        <WithListContext
          render={({
            isLoading: isLoadingInactivePairs,
            data: inactivePairsData,
          }) => {
            isLoadingInactivePairs && <Loading />;
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
                    <Datagrid
                      bulkActionButtons={false}
                      rowClick={false}
                      sx={{
                        "& .RaDatagrid-row": {
                          backgroundColor: "rgb(211 47 47 / 5%)",
                        },
                        "& .RaDatagrid-table": {
                          width: "auto",
                        },
                      }}
                    >
                      <TextField source="id" />
                      <FunctionField
                        label="State"
                        render={(record: Bot) => <StateIcon record={record} />}
                        sortable={false}
                        source="state"
                      />
                      <FunctionField
                        label="Pair"
                        render={(record: BotPair) => (
                          <ItemStateControlBar record={record} />
                        )}
                        sortable={true}
                        sortBy="symbol"
                        source="symbol"
                      />
                    </Datagrid>
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
