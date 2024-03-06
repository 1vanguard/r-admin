import * as React from "react";
import { useRecordContext } from "react-admin";
//import { useMediaQuery, Theme } from "@mui/material";
import Grid from "@mui/material/Grid";

export const BotPanel = () => {
  const record = useRecordContext();
  return (
    <div>
      Bot panel content
      <Grid container spacing={2}>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={6}>
          <>
            <pre style={{
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
            }}>{JSON.stringify(record, null, 2)}</pre>
          </>
        </Grid>
      </Grid>
    </div>
  );
};
