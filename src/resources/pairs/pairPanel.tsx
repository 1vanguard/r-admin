import * as React from "react";
import { useRecordContext } from "react-admin";

import LogMaster from "../../layouts/logMaster";
import PairOrders from "../../layouts/pairOrders";

import Grid from "@mui/material/Grid";

export const PairPanel = (props: any) => {
  const record = useRecordContext();
  if (!record) return null;
  const pairId = parseInt(record?.id);

  return (
    <div className="pairPanel">
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <div className="content">
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
            <LogMaster entityType="pair" entityId={pairId} />
          </div>
        </Grid>
        <Grid item xs={7}>
          <div className="content">
            <PairOrders autoUpdate={true} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
