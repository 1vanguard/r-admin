import * as React from "react";
import { useState } from "react";
import {
  Datagrid,
  EditButton,
  FunctionField,
  List,
  ReferenceField,
  TextField,
  useRecordContext,
} from "react-admin";
//import { useMediaQuery, Theme } from "@mui/material";
import LogMaster from "../../layouts/logMaster";
import Grid from "@mui/material/Grid";

export const BotPanel = (props: any) => {
  const record = useRecordContext(),
    botId = record.id;

  const botLogs = props.logs
  const botLog = [];

  for (let i = 0; i < botLogs.length; i++) {
    const bot_id = botLogs[i].bot_id
    if (bot_id === botId) {
      botLog.push(botLogs[i]);
    }
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
            <LogMaster itemLog={botLog}/>
        </Grid>
        <Grid item xs={6}>
          <List
            resource="pairs"
            filter={{ bot_id: botId }}
            sx={{ width: "100%" }}
          >
            <Datagrid>
              <TextField source="id" />
              <TextField source="symbol" />
              <ReferenceField label="State" source="state" reference="states">
                <FunctionField render={(record: string) => record.name} />
              </ReferenceField>
              {/* <TextField source="pair_limit" />
              <TextField source="step" />
              <TextField source="start_offset" /> */}
              <TextField source="profit" />
              {/* <TextField source="squiz" /> */}
              <EditButton />
            </Datagrid>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};
