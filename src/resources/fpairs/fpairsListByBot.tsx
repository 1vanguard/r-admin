import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Datagrid,
  FunctionField,
  List,
  Loading,
  ReferenceField,
  TextField,
  TextInput,
  useCreatePath,
  useGetOne,
  useTranslate,
  WithListContext,
} from "react-admin";

import { FBot, FBotPair, Exchange } from "../../types";
import { FPairPanel } from "./fpairPanel";
import GridData from "../../helpers/GridData";
import IdxMaster from "../../layouts/idxMaster";
import ItemStateControlBar from "../../layouts/itemStateControlBar";
import StateIcon from "../../layouts/stateIcon";

import { Box, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const NoPairs = (props: any) => {
  const pairState = props.state,
    translate = useTranslate();
  let noText = translate("common.no_pairs");

  if (pairState === 0) {
    noText = translate("common.bot_has_no_inactive_pairs");
  }
  return (
    <Box>
      <Typography>{noText}</Typography>
    </Box>
  );
};

const pairsFilters = [
  <TextInput
    label="resources.fpairs.fields.symbol"
    source="symbol_like"
    alwaysOn
  />,
  <TextInput label="resources.fpairs.fields.id" source="id_like" alwaysOn />,
];

const inactivePairsFilters = [
  <TextInput
    label="resources.fpairs.fields.symbol"
    source="symbol_like"
    alwaysOn
  />,
  <TextInput label="resources.fpairs.fields.id" source="id_like" alwaysOn />,
];

const FPairsListByBot = () => {
  const { id: botId } = useParams(),
    createPath = useCreatePath(),
    translate = useTranslate(),
    [checked, setChecked] = useState(false),
    {
      data: botData,
      isLoading: isLoadingBotData,
      error: errorBotData,
    } = useGetOne<FBot>("fbots", { id: botId });

  if (isLoadingBotData) return <Loading />;
  if (errorBotData)
    return (
      <div className="error loadData">{translate("errors.loadDataError")}</div>
    );

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box className="pairsListByBot">
      <h2>
        {translate("common.pairs")}{" "}
        <small>
          ({translate("common.bot")} {translate("common.id")}:{botId}{" "}
          <Link to={createPath({ resource: 'fbots', type: 'edit', id: botId })}>{botData?.title})</Link>
        </small>
      </h2>
      <List
        disableSyncWithLocation
        filter={{ bot_id: botId, state: [1, 2] }}
        filters={pairsFilters}
        pagination={false}
        perPage={1000000}
        resource="fpairs"
        sx={{ marginBottom: 3 }}
        title={
          <>
            {translate("common.pairs")}{" "}
            <small>
              ({translate("common.bot")} {translate("common.id")}:{botId}{" "}
              {botData?.title})
            </small>
          </>
        }
      >
        <Datagrid
          bulkActionButtons={false}
          expand={<FPairPanel />}
          rowClick={false}
          sx={{
            "& .RaDatagrid-row": {
              backgroundColor: "rgb(46 125 50 / 5%)",
            },
          }}
        >
          <TextField source="id" />
          <FunctionField
            render={(record: FBot) => <StateIcon record={record} />}
            sortable={true}
            sortBy="state"
            source="state"
          />
          <FunctionField
            label="common.pair"
            render={(record: FBotPair) => (
              <ItemStateControlBar record={record} />
            )}
            sortable={true}
            sortBy="symbol"
            source="symbol"
          />
          <ReferenceField
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
            label="common.rsi_s"
            render={(record: FBotPair) => {
              return <IdxMaster idxName="RSI_S" pairId={record.id}></IdxMaster>;
            }}
          />
          <FunctionField
            label="common.rsi_l"
            render={(record: FBotPair) => {
              return <IdxMaster idxName="RSI_L" pairId={record.id}></IdxMaster>;
            }}
          />
          <FunctionField
            label="common.rsi_sell"
            render={(record: FBotPair) => {
              return (
                <IdxMaster idxName="RSI_SELL" pairId={record.id}></IdxMaster>
              );
            }}
          />
          <FunctionField
            label="common.price"
            style={{ textAlign: "center" }}
            render={(record: FBotPair) => {
              return <IdxMaster idxName="Price" pairId={record.id}></IdxMaster>;
            }}
          />
          <FunctionField
            label={
              translate("common.in_orders") +
              " (" +
              translate("common.usdt") +
              ")"
            }
            render={(record: FBotPair) => {
              return (
                <GridData type="pair" id={record.id} parameter="in_orders" />
              );
            }}
          />
          <FunctionField
            label="common.purchases"
            render={(record: FBotPair) => {
              return (
                <GridData type="pair" id={record.id} parameter="purchases" />
              );
            }}
          />
          <FunctionField
            label="common.sales"
            render={(record: FBotPair) => {
              return <GridData type="pair" id={record.id} parameter="sales" />;
            }}
          />
        </Datagrid>
      </List>
      <h2 style={{ marginBottom: 0 }}>{translate("common.inactive_pairs")}</h2>
      <List
        disableSyncWithLocation
        empty={<NoPairs state={0} />}
        filter={{ bot_id: botId, state: 0 }}
        filters={inactivePairsFilters}
        pagination={false}
        perPage={1000000}
        resource="fpairs"
        title={<></>}
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
                      label={translate("common.show_inactive_bots_pairs")}
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
                        render={(record: FBot) => <StateIcon record={record} />}
                        sortable={false}
                        source="state"
                      />
                      <FunctionField
                        label="common.pair"
                        render={(record: FBotPair) => (
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

export default FPairsListByBot;
