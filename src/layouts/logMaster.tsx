import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useWebSocketDataContext } from "../helpers/WebSocketDataContext";

interface LogMasterProps {
  entityType: string;
  entityId: number;
}

const LogMaster: React.FC<LogMasterProps> = ({ entityType, entityId }) => {
  const { logs } = useWebSocketDataContext();

  let targetEntityLogsArray: any[] = [];

  if (!logs)return "No data accepted"

  const baseLogs = Object.entries(logs);

  targetEntityLogsArray = baseLogs.flatMap(([key, value]) => {
    return value.filter((entry) => {
      if (entityType === "bot") {
        return entry.bot_id === entityId;
      }
      if (entityType === "pair") {
        return entry.pair_id === entityId;
      }
    });
  });

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
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
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
