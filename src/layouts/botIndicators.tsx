import * as React from "react";
import {
  BooleanInput,
  NumberInput,
  required,
  SelectInput,
  TextInput,
  useTranslate,
} from "react-admin";
import { useLocaleState } from 'react-admin';
import { useWatch } from "react-hook-form";

import { FBotIndicator, FBotIndicatorField } from "../types";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

type BotIndicatorsProps = {
  botId?: number;
  botType: string;
  indicatorsData: FBotIndicator[] | any[];
  useStrategy?: boolean;
};

type IndicatorFieldsProps = {
  fieldsArr: FBotIndicatorField[] | any[];
  indicatorIndex: number;
  strategy?: boolean;
};

const color01 = "#2196f3";

const IndicatorFields = ({
  fieldsArr,
  indicatorIndex,
  strategy = false,
}: IndicatorFieldsProps) => {
  const isIndicatorEnabled = useWatch({
    name: `indicators[${indicatorIndex}].enabled`,
  });
  const [locale, setLocale] = useLocaleState();

  return isIndicatorEnabled ? (
    <Grid container spacing={1}>
      {fieldsArr
        ?.filter((field) => field.value !== null && field.value !== undefined)
        .map((field: FBotIndicatorField, fieldIndex: number) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            xl={3}
            key={`${indicatorIndex}-${fieldIndex}`}
          >
            {field.values_list?.length > 0 ? (
              <SelectInput
                choices={field.values_list}
                className={strategy ? "active useStrategy" : "useStrategy"}
                defaultValue={field.default}label={field[`title_${locale}`] || field.name}
                optionValue="value"
                source={`indicators[${indicatorIndex}].fields[${fieldIndex}].${field.name}`}
                variant="standard"
                {...(field.required ? { validate: required() } : {})}
              />
            ) : (
              <>
                {field.type === "text" && (
                  <TextInput
                    className={strategy ? "active useStrategy" : "useStrategy"}
                    defaultValue={field.default}label={field[`title_${locale}`] || field.name}
                    source={`indicators[${indicatorIndex}].fields[${fieldIndex}].${field.name}`}
                    variant="standard"
                    {...(field.required ? { validate: required() } : {})}
                  />
                )}
                {field.type === "number" && (
                  <NumberInput
                    className={strategy ? "active useStrategy" : "useStrategy"}
                    defaultValue={field.default}
                    label={field[`title_${locale}`] || field.name}
                    source={`indicators[${indicatorIndex}].fields[${fieldIndex}].${field.name}`}
                    variant="standard"
                    {...(field.required ? { validate: required() } : {})}
                  />
                )}
                {field.type === "boolean" && (
                  <BooleanInput
                    className={strategy ? "active useStrategy" : "useStrategy"}
                    defaultValue={field.default}
                    label={field[`title_${locale}`] || field.name}
                    source={`indicators[${indicatorIndex}].fields[${fieldIndex}].${field.name}`}
                    variant="standard"
                    {...(field.required ? { validate: required() } : {})}
                  />
                )}
              </>
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
  const translate = useTranslate(),
    indicators = indicatorsData;

  if (!indicators) {
    return <Box>{translate("common.no_indicators")}</Box>;
  }

  if (botType !== "fbot") {
    return (
      <Box className="warning warning_01">
        {translate("warnings.indicators_warning_01")}
      </Box>
    );
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
            <Grid container spacing={1}>
              <IndicatorFields
                fieldsArr={indicator.fields}
                indicatorIndex={indIndex}
                strategy={useStrategy}
              />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default BotIndicators;
