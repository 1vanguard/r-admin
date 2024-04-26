import React, { useEffect, useState } from "react";
import {
  List,
  SimpleList,
  Datagrid,
  FunctionField,
  TextField,
  ReferenceField,
  ReferenceManyField,
  EditButton,
  usePermissions,
  WithListContext,
  useListController,
  Loading,
} from "react-admin";
import { Bot, BotIdx, LogEntry } from "../../types";
import processWebSocketMessage from "../../helpers/webSocketDataProcessor";
import { useWebSocket } from "../../webSocketProvider";
import { BotPanel } from "./botPanel";
import BotPairsCounter from "../../layouts/botPairsCounter";
import BtnsStateControl from "../../layouts/btnsStateControl";
import GridData from "../../helpers/GridData";

import { useMediaQuery, Theme } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import SettingsIcon from '@mui/icons-material/Settings';

export const BotsList = () => {
  const { sockets } = useWebSocket();
  const [bots, setBots] = useState<Bot[]>([]);
  const {
    isLoading: isLoadingBoats,
    data: botsData,
    total: totalBots,
  } = useListController();
  const [botsLogs, setBotsLogs] = useState<LogEntry[]>([]);
  const [botsIdxs, setBotsIdxs] = useState<BotIdx[]>([]);
  const { isLoading: isLoadingPermissions, permissions } = usePermissions();
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  // ЗАДАЛБЛИВАЕТ ОБНОВЛЕНИЕ КОМПОНЕНТА И ВЫВОД В КОНСОЛИ ПРИ ПРОСЛУШИВАНИИ СООБЩЕНИЙ! ПОЧИНИТЬ ПЕРЕРИСОВКУ КОМПОНЕНТА ПРИ ПРОСЛУШИВАНИИ СООБЩЕНИЙ! НУЖНО ЧТОБЫ ОН НЕ ОБНОВЛЯЛСЯ КАЖДЫЙ РАЗ ПРИ ПРОСЛУШИВАНИИ КАЖДОГО СООБЩЕНИЯ!
  /* useEffect(() => {
    // Прослушивание сообщений от веб-сокета
    if (sockets.length > 0 && sockets[0]) {
      sockets[0].onmessage = (event) => {
        // Обработка полученного сообщения
        const rawData = processWebSocketMessage(event.data);
        if (rawData && rawData.mode === "log") {
          const newProcessedData: LogEntry = {
            bot_id: Number(rawData.bot_id),
            color: rawData.color,
            date: rawData.date,
            message: rawData.message,
            mode: rawData.mode,
            pair_id: Number(rawData.pair_id),
            site: rawData.site,
          };
          // console.log("newProcessedData", newProcessedData);
          setBotsLogs((prevLogs) => [...prevLogs, newProcessedData]);
        }
        if (rawData && rawData.mode === "idx") {
          // console.log(rawData);
          const newProcessedData: BotIdx = {
            bot_id: Number(rawData.bot_id),
            color: rawData.color,
            date: rawData.date,
            id: rawData.id,
            indicator: rawData.indicator,
            mode: rawData.mode,
            pair_id: Number(rawData.pair_id),
            site: rawData.site,
            value: Number(rawData.value),
          };
          setBotsIdxs((prevLogs) => [...prevLogs, newProcessedData]);
        }
        // console.log(botsLogs);
      };
    }
  }, [sockets]); */

  if (isLoadingPermissions) {
    return <div>Permissions is loading...</div>;
  }

  if (isLoadingBoats) {
    return <Loading />;
  }

  const role = permissions.role;

  if (role === 1 || role === 2) {
    console.log("List component isLoadingBoats: ", isLoadingBoats);
    console.log("List component data: ", botsData);
    console.log("List component totalBots: ", totalBots);
    return (
      <List perPage={10}>
        {isSmall ? (
          <SimpleList
            primaryText={(record) => record.title}
            secondaryText={(record) => record.state}
            tertiaryText={(record) => record.currencies}
          />
        ) : (
          <Datagrid expand={<BotPanel logs={botsLogs} />}>
            <TextField source="id" />
            <FunctionField
              source="title"
              label="Title"
              render={(record) => {
                let stateColor,
                  botApiState = (
                    <KeyIcon
                      style={{ color: "green", marginRight: "5px" }}
                      sx={{ fontSize: "1.1em" }}
                    />
                  ),
                  botPauseUntil

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

                if (record.api_ready === 0) {
                  botApiState = (
                    <KeyOffIcon
                      style={{ color: "red", marginRight: "5px" }}
                      sx={{ fontSize: "1.1em" }}
                    />
                  );
                }

                if (record.pause_until) {
                  botPauseUntil = (<span style={{fontSize: "0.8em"}}><span style={{ fontWeight: "700", marginRight: "5px" }}>Pause until:</span>{new Date(record.pause_until).toLocaleString()}</span>
                  );
                }

                return (
                  <div>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <CircleIcon
                        color={stateColor}
                        style={{ marginRight: "5px" }}
                        sx={{ fontSize: "0.9em" }}
                      />
                      {botApiState}
                      <span style={{ marginRight: "0.7em" }}>{record.title}</span>
                      <span style={{ display: "flex", marginLeft: "auto" }}>
                        <BtnsStateControl/>
                        <EditButton label="" color="inherit" variant="contained" className="btn_iconOnly" style={{ marginLeft: "0.3em" }} icon={<SettingsIcon style={{fontSize: "1em"}} />} />
                      </span>
                    </span>
                    {botPauseUntil}
                  </div>
                );
              }}
            />
            <ReferenceField
              label="Exchange"
              source="exchange_id"
              reference="exchanges"
            >
              <FunctionField render={(record) => record.title} />
            </ReferenceField>
            {/* <TextField source="office_id" /> */}
            {/* <DateField
              source="created"
              showTime
              options={{
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }}
            /> */}
            {/* Поместить created внутрь коллапса */}
            <ReferenceManyField
              reference="pairs"
              target="bot_id"
              label="Pairs count"
            >
              <WithListContext
                render={({ isLoading, data }) =>
                  !isLoading && <BotPairsCounter pairs={data} />
                }
              />
            </ReferenceManyField>
            <TextField label="Order" source="auto_start_sum" />
            <TextField label="Profit %" source="auto_profit" />
            <TextField label="Limit" source="botlimit" />
            <FunctionField
              source="id"
              label="In trades"
              render={(record) => {
                // Логика вывода поля на основе данных записи
                return (
                  <GridData type="bot" id={record.id} parameter="in_trades" />
                );
              }}
            />
            <FunctionField
              source="id"
              label="Profit"
              render={(record) => {
                // Логика вывода поля на основе данных записи
                return (
                  <GridData type="bot" id={record.id} parameter="profit" />
                );
              }}
            />
          </Datagrid>
        )}
      </List>
    );
  } else {
    return <div>Not enough permissions</div>;
  }
};
