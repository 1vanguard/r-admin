import * as React from "react";
import { useEffect, useState } from "react";
import {
  Loading,
  Edit,
  TabbedForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  required,
  useRecordContext,
  FunctionField,
  AutocompleteInput,
} from "react-admin";
import Grid from "@mui/material/Grid";
import { getStates } from "../../helpers/stateUtils";

const Editform = () => {
  const record = useRecordContext();

  if (!record) {
    return <Loading />;
  }

  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const states = await getStates();
      setStates(states);
    };

    fetchStates();
  }, []);

  return (
    <>
      {states.length > 0 ? (
        <TabbedForm>
          <TabbedForm.Tab label="General">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={2} lg={1}>
                <TextInput fullWidth disabled label="Id" source="id" />
              </Grid>
              <Grid item xs={12} sm={8} md={10} lg={11}>
                <TextInput
                  fullWidth
                  source="title"
                  defaultValue={record.title}
                  validate={required()}
                />
              </Grid>
              <Grid item lg={4}>
                <SelectInput
                  fullWidth
                  source="state"
                  choices={states}
                  validate={required()}
                  defaultValue={record.state}
                />
              </Grid>
              <Grid item lg={4}>
                <ReferenceInput
                  label="Client"
                  source="client_id"
                  reference="users"
                >
                  <AutocompleteInput fullWidth optionText="username" />
                </ReferenceInput>
              </Grid>
              <Grid item lg={4}>
                <ReferenceInput
                  label="Exchange"
                  source="exchange_id"
                  reference="exchanges"
                >
                  <AutocompleteInput fullWidth optionText="title" />
                </ReferenceInput>
              </Grid>
            </Grid>
          </TabbedForm.Tab>
        </TabbedForm>
      ) : (
        <Loading />
      )}
    </>
  );
};

export const BotEdit = () => {
  return (
    <Edit>
      <Editform />
    </Edit>
  );
};
