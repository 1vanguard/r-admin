import * as React from "react";
import { useRecordContext, useTranslate } from "react-admin";

import LogMaster from "../../layouts/logMaster";
import PairOrders from "../../layouts/pairOrders";

import Grid from "@mui/material/Grid";

export const FPairPanel = () => {
  const record = useRecordContext(),
    translate = useTranslate();
  if (!record) return null;

  const pairId = record?.id;

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
              {translate("common.logs")}
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