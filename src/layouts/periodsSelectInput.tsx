import * as React from "react";
import { Loading, required, SelectInput, useGetList } from "react-admin";

const calculateChoices = (periods, filter) => {
  return periods.filter((period) => filter.includes(period.value));
};

interface PeriodsSelectInputProps {
  label: string;
  periodChoices?: number[];
  required?: boolean;
  sourceName: string;
}

export const PeriodsSelectInput: React.FC<PeriodsSelectInputProps> = (
  props
) => {
  const {
    data: choices,
    isLoading: isLoadingChoices,
    error: errorChoices,
  } = useGetList("periods");

  if (isLoadingChoices) return <Loading />;
  if (errorChoices) return <div>ERROR</div>;

  const periodChoices = calculateChoices(choices, props.periodChoices);

  return (
    <SelectInput
      {...(props.required ? { validate: required() } : {})}
      choices={periodChoices}
      disabled={isLoadingChoices}
      emptyText="Do not use"
      isLoading={isLoadingChoices}
      label={props.label}
      margin="none"
      optionText="name"
      optionValue="value"
      source={props.sourceName}
      variant="standard"
    />
  );
};
