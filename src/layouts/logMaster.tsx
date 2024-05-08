import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useLogContext } from "../helpers/LogContext";

interface LogMasterProps {
  entityType: string;
  entityId: number;
}

const LogMaster: React.FC<LogMasterProps> = ({ entityType, entityId }) => {
  const { logs } = useLogContext();

  let targetEntityLogsArray: any[] = [];
  const baseLogs = Object.entries(logs);

  if (entityType === "bot") {
    targetEntityLogsArray = baseLogs.flatMap(([key, value]) => {
      return value.filter((entry) => {
        return entry.bot_id === entityId;
      });
    });
  }

  targetEntityLogsArray.sort((a, b) => {
    const dateA = a.date.split(/\D/).map(Number);
    const dateB = b.date.split(/\D/).map(Number);

    for (let i = 0; i < Math.max(dateA.length, dateB.length); i++) {
      if (dateA[i] !== dateB[i]) {
        return dateA[i] - dateB[i];
      }
    }

    return 0;
  }).reverse();

  return (
    <Box className="logMaster" sx={{ overflowY: "auto" }}>
      {targetEntityLogsArray.map((item, index) => (
        <Grid key={index} container spacing={2} sx={{ fontSize: "88%" }}>
          <Grid item xs="auto">
            {new Date(item.date).toLocaleString("ru", {
              // year: "numeric",
              // month: "numeric",
              // day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              fractionalSecondDigits: 3,
            })}
          </Grid>
          <Grid item xs>
            {item.message}
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default LogMaster;
/* useEffect(() => {
  // Прослушивание сообщений от веб-сокета
  if (sockets.length > 0 && sockets[0]) {
    sockets[0].onmessage = (event) => {
      // Обработка полученного сообщения
      const rawData = processWebSocketMessage(event.data);
      // console.log(botId + ' - ' + parseInt(rawData.bot_id));

      // mode === "idx" - НУЖЕН ДЛЯ ОБНОВЛЕНИЯ ИНДИКАТОРОВ ПАР
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
      // console.log(botLog);
    };
  }
}, [sockets, botId, botLog]); */
