import * as React from "react";
import {
  Loading,
  useGetManyReference,
  useRecordContext,
} from "react-admin";
//import { useMediaQuery, Theme } from "@mui/material";
import { BotPair } from "../../types";
import LogMaster from "../../layouts/logMaster";
import Grid from "@mui/material/Grid";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

export const BotPanel = (props: any) => {
  const record = useRecordContext(),
    botId = parseInt(record.id);
  const {
    data: botPairs,
    isLoading: botPairsLoading,
    error: botPairsError,
  } = useGetManyReference<BotPair>("pairs", {
    target: "bot_id",
    id: botId,
    pagination: { page: 1, perPage: 1000000 },
  });

  if (botPairsLoading) {
    return <Loading />;
  }

  if (botPairsError) {
    return <div>Bot pairs error</div>;
  }

  return (
    <div className="botPanel">
      <div className="header">
        <h3 style={{ marginTop: 0 }}>
          {record.title}: <small>created at</small>{" "}
          {new Date(record.created).toLocaleString()}
        </h3>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h4
            style={{
              marginBottom: 0,
              marginTop: 0,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Logs
          </h4>
          <div className="content">
            <LogMaster entityType="bot" entityId={botId} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <h4
            style={{
              marginBottom: 0,
              marginTop: 0,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Pairs
          </h4>
          <div className="content">
            {botPairs?.length === 0 ? (
              <div style={{ fontWeight: "700", textAlign: "center" }}>
                Bot has no pairs
              </div>
            ) : (
              <Table
                stickyHeader
                size="small"
                aria-labelledby="Bot pairs table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Pair</TableCell>
                    <TableCell>Opened orders</TableCell>
                    <TableCell>In trades</TableCell>
                    <TableCell>Profit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {botPairs.map((botPair) => {
                    let stateColor = "";
                    switch (botPair.state) {
                      case 1:
                        stateColor = "success";
                        break;
                      case 2:
                        stateColor = "warning";
                        break;
                      default:
                        stateColor = "disabled";
                    }
                    if (botPair.state === 1 || botPair.state === 2) {
                      return (
                        <TableRow key={botPair.id}>
                          <TableCell>
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <CircleIcon
                                color={stateColor}
                                style={{ marginRight: "5px" }}
                                sx={{ fontSize: "0.9em" }}
                              />
                              <span>{botPair.symbol}</span>
                            </span>
                          </TableCell>
                          <TableCell>
                            {Math.round(botPair.ordersOpened)}
                          </TableCell>
                          <TableCell>{Math.round(botPair.inTrades)}</TableCell>
                          <TableCell>{Math.round(botPair.profit)}</TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
