import * as React from "react";
import { Loading, required, SelectInput, useGetList } from "react-admin";
// import { period } from "../../types";

const calculateChoices = (periods, filter) => {
  return periods
    .filter((period) => filter.includes(period.value))
};

interface PeriodsSelectInputProps {
  fullWidth?: boolean;
  label: string;
  periodChoices?: number[];
  required?: boolean;
  sourceName: string;
}

export const PeriodsSelectInput: React.FC<PeriodsSelectInputProps> = (props) => {
  const {
      data: choices,
      isLoading: isLoadingChoices,
      error,
    } = useGetList("periods")

  if (isLoadingChoices) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }

  const periodChoices = calculateChoices(choices, props.periodChoices);

  return (
    <SelectInput
      choices={periodChoices}
      disabled={isLoadingChoices}
      emptyText="Do not use"
      fullWidth={props.fullWidth ? true : false}
      isLoading={isLoadingChoices}
      label={props.label}
      margin="none"
      optionText="name"
      optionValue="value"
      source={props.sourceName}
      variant="standard"
      {...(props.required ? { validate: required() } : {})}
    />
  );
};