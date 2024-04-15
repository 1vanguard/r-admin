import React, { useEffect, useState } from "react";
import {
  List,
  SimpleList,
  Datagrid,
  DateField,
  FunctionField,
  TextField,
  ReferenceField,
  ReferenceManyField,
  EditButton,
  usePermissions,
  useRecordContext,
  WithListContext,
} from "react-admin";
import { BotIdx, BotPair, LogEntry } from "../../types";
import processWebSocketMessage from "../../helpers/webSocketDataProcessor";
import { useWebSocket } from "../../webSocketProvider";
import { BotPanel } from "./botPanel";
import { useMediaQuery, Theme } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import BotPairsCounter from "../../helpers/botPairsCounter";

export const BotsList = () => {
  const { sockets } = useWebSocket();
  const [botsLogs, setBotsLogs] = useState<LogEntry[]>([]);
  const [botsIdxs, setBotsIdxs] = useState<BotIdx[]>([]);
  const { isLoading, permissions } = usePermissions();
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
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
  }, [sockets]);

  if (isLoading) {
    return <div>Checking permissions...</div>;
  } else {
    const role = permissions.role;

    if (role === 1 || role === 2) {
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
                    );
                  switch (record.state) {
                    case -1:
                      stateColor = "violet";
                      break;
                    case 0:
                      stateColor = "red";
                      break;
                    case 1:
                      stateColor = "green";
                      break;
                    case 2:
                      stateColor = "yellow";
                      break;
                    default:
                      stateColor = "black";
                  }

                  if (record.api_ready === 0) {
                    botApiState = (
                      <KeyOffIcon
                        style={{ color: "red", marginRight: "5px" }}
                        sx={{ fontSize: "1.1em" }}
                      />
                    );
                  }
                  return (
                    <span
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <CircleIcon
                        style={{ color: stateColor, marginRight: "5px" }}
                        sx={{ fontSize: "0.9em" }}
                      />
                      {botApiState}
                      <span>{record.title}</span>
                    </span>
                  );
                }}
              />
              <ReferenceField label="State" source="state" reference="states">
                <FunctionField render={(record) => record.name} />
              </ReferenceField>
              <DateField
                source="pause_until"
                showTime
                options={{
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
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
              <ReferenceField
                label="Client"
                source="client_id"
                reference="users"
              />
              <DateField
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
              />
              <ReferenceManyField
                reference="pairs"
                target="bot_id"
                label="Pairs count"
              >
                <WithListContext
                  render={({ isLoading, data }) => (
                    !isLoading && (
                      <BotPairsCounter pairs={data} />
                    )
                  )}
                />
              </ReferenceManyField>
              <TextField label="Order" source="auto_start_sum" />
              <TextField label="Profit %" source="auto_profit" />
              <TextField label="Limit" source="botlimit" />
              <FunctionField
                source="id"
                label="Test field"
                render={(record) => {
                  // Логика вывода поля на основе данных записи
                  if (record.published) {
                    return <span>Published</span>;
                  } else {
                    return <span>Not published</span>;
                  }
                }}
              />
              <EditButton />
            </Datagrid>
          )}
        </List>
      );
    } else {
      return <div>Not enough permissions</div>;
    }
  }
};
