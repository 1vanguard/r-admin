import * as React from "react";
import {
  Loading,
  useGetManyReference,
  useRecordContext,
  useTranslate,
} from "react-admin";

import { BotPair } from "../../types";
import LogMaster from "../../layouts/logMaster";

import CircleIcon from "@mui/icons-material/Circle";
import Grid from "@mui/material/Grid";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

export const BotPanel = () => {
  const record = useRecordContext(),
    translate = useTranslate();
  if (!record) return null
  const botId = parseInt(record?.id);
  const {
    data: botPairs,
    isLoading: botPairsLoading,
    error: botPairsError,
  } = useGetManyReference<BotPair>("pairs", {
    target: "bot_id",
    id: botId,
    pagination: { page: 1, perPage: 1000000 },
  });

  if (botPairsLoading) return <Loading />
  if (botPairsError) return <div className="error dataError">{translate("errors.loadDataError")}</div>
console.log('botPairs: ', botPairs)
  return (
    <div className="botPanel">
      <div className="header">
        <h3 style={{ marginTop: 0 }}>
          {record.title}: <small>{translate("common.created_at")}</small>{" "}
          {new Date(record.created).toLocaleString()}
        </h3>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <h4
            style={{
              marginBottom: 0,
              marginTop: 0,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {translate("common.logs")}
          </h4>
          <div className="content">
            <LogMaster entityType="bot" entityId={botId} />
          </div>
        </Grid>
        <Grid item xs={7}>
          <h4
            style={{
              marginBottom: 0,
              marginTop: 0,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {translate("common.pairs")}
          </h4>
          <div className="content">
            {botPairs?.length === 0 ? (
              <div style={{ fontWeight: "700", textAlign: "center" }}>
                {translate("state.spec_states.no_pairs")}
              </div>
            ) : (
              <Table
                stickyHeader
                size="small"
                aria-labelledby="Bot pairs table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>{translate("common.pair")}</TableCell>
                    <TableCell>{translate("common.opened_orders")}</TableCell>
                    <TableCell>{translate("common.in_trades")}</TableCell>
                    <TableCell>{translate("common.profit")}</TableCell>
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
