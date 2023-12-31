import * as React from "react";
import { Loading, SelectInput, useGetList } from "react-admin";
import { useWatch } from "react-hook-form";
// import { period } from "../../types";

const calculateChoices = (periods, filter) => {
  return periods
    .filter((period) => filter.includes(period.value))
};

export const PeriodsSelectInput = (props) => {
  const {
      data: choices,
      isLoading: isLoadingChoices,
      error,
    } = useGetList("periods"),
    currentValue = useWatch({ name: props.name });

  if (isLoadingChoices) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }

  const periodChoices = calculateChoices(choices, props.periodChoices);

  return (
    <SelectInput
      fullWidth={props.fullWidth ? true : false}
      label={props.label}
      source={props.name}
      optionText="name"
      emptyText="Do not use"
      choices={periodChoices}
      isLoading={isLoadingChoices}
      disabled={isLoadingChoices}
    />
  );
};