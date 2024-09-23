import * as React from "react";
import {
  BooleanInput,
  LinearProgress,
  NumberInput,
  required,
  SelectInput,
  TextInput,
  useTranslate,
} from "react-admin";
import { useWatch } from "react-hook-form";

import { FBotIndicator, FBotIndicatorField, FBotPause } from "../types";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

type BotIndicatorsProps = {
  botId: number;
  botType: string;
  indicatorsData: FBotIndicator[] | any[];
  useStrategy?: boolean;
};

const baseMin = 0,
  color01 = "#2196f3",
  color02 = "rgba(33, 150, 243, 0.2)";

const IndicatorFields = ({ fieldsArr, indicatorIndex, strategy }) => {
  const isIndicatorEnabled = useWatch({
    name: `indicators[${indicatorIndex}].enabled`,
  });

  /* console.log("fieldsArr: ", fieldsArr);
  console.log(
    "fieldsArr filtered: ",
    fieldsArr?.filter((field) => "value" in field)
  ); */
  /* if (fieldsArr.length === 0) {
    return <LinearProgress />;
  } */

  return isIndicatorEnabled ? (
    <Grid container spacing={1}>
      {fieldsArr
        ?.filter((field) => "value" in field)
        .map((field: FBotIndicatorFields, fieldIndex: number) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            xl={3}
            key={`${indicatorIndex}-${fieldIndex}`}
          >
            {/* {!field ? <LinearProgress /> : null} */}
            {field.values_list?.length > 0 ? (
              <SelectInput
                choices={field.values_list}
                className={strategy ? "active useStrategy" : "useStrategy"}
                defaultValue={field.default}
                label={field.name}
                optionValue="value"
                source={`indicators[${indicatorIndex}].fields[${fieldIndex}].${field.name}`}
                variant="standard"
                {...(field.required ? { validate: required() } : {})}
              />
            ) : (
              <React.Fragment>
                {field.type === "text" && (
                  <TextInput
                    className={strategy ? "active useStrategy" : "useStrategy"}
                    defaultValue={field.default}
                    label={field.name}
                    source={`indicators[${indicatorIndex}].fields[${fieldIndex}].${field.name}`}
                    variant="standard"
                    {...(field.required ? { validate: required() } : {})}
                  />
                )}
                {field.type === "number" && (
                  <NumberInput
                    className={strategy ? "active useStrategy" : "useStrategy"}
                    defaultValue={field.default}
                    label={field.name}
                    source={`indicators[${indicatorIndex}].fields[${fieldIndex}].${field.name}`}
                    variant="standard"
                    {...(field.required ? { validate: required() } : {})}
                  />
                )}
                {field.type === "boolean" && (
                  <BooleanInput
                    className={strategy ? "active useStrategy" : "useStrategy"}
                    defaultValue={field.default}
                    label={field.name}
                    source={`indicators[${indicatorIndex}].fields[${fieldIndex}].${field.name}`}
                    variant="standard"
                    {...(field.required ? { validate: required() } : {})}
                  />
                )}
              </React.Fragment>
            )}
          </Grid>
        ))}
    </Grid>
  ) : null;
};

const BotIndicators = ({
  botId,
  botType,
  indicatorsData,
  useStrategy = false,
}: BotIndicatorsProps) => {
  const translate = useTranslate();
  const indicators = indicatorsData;

  if (!indicators) {
    return <Box>{translate("common.no_indicators")}</Box>;
  }

  return (
    <Box>
      {indicators.map((indicator: FBotIndicator, indIndex: number) => (
        <Grid
          container
          key={indIndex}
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: color01,
            marginBottom: 3,
            paddingTop: 3,
            paddingRight: 3,
            paddingLeft: 3,
          }}
        >
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={12} md="auto">
                <BooleanInput
                  className={useStrategy ? "active useStrategy" : "useStrategy"}
                  label="common.use_indicator"
                  source={`indicators[${indIndex}].enabled`}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md>
                <TextInput
                  label="common.indicator"
                  readOnly
                  source={`indicators[${indIndex}].indicator_name`}
                  validate={required()}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md="auto">
                <NumberInput
                  label="common.id"
                  readOnly
                  source={`indicators[${indIndex}].indicator_id`}
                  validate={required()}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <IndicatorFields
              fieldsArr={indicator.fields}
              indicatorIndex={indIndex}
              strategy={useStrategy}
            />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default BotIndicators;
