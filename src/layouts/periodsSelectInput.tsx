import * as React from "react";
import {
  Loading,
  required,
  SelectInput,
  useGetList,
  useTranslate,
} from "react-admin";

import { period } from "../types";

interface PeriodsSelectInputProps {
  label: string;
  periodChoices: number[];
  required?: boolean;
  sourceName: string;
}

export const PeriodsSelectInput: React.FC<PeriodsSelectInputProps> = (
  props
) => {
  const translate = useTranslate();
  const calculateChoices = (periods: period[], filter: number[]) => {
    return periods.filter((period) => filter.includes(period.value));
  };
  const {
    data: choices,
    total: totalChoices,
    isPending: isPendingChoices,
    error: errorChoices,
  } = useGetList<period>("periods", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "value", order: "DESC" },
  });

  if (isPendingChoices) return <Loading />;
  if (errorChoices) return <div>ERROR</div>;

  const periodChoices = calculateChoices(choices, props.periodChoices);

  return (
    <SelectInput
      {...(props.required ? { validate: required() } : {})}
      choices={periodChoices}
      disabled={isPendingChoices}
      emptyText={translate("common.do_not_use")}
      isLoading={isPendingChoices}
      label={props.label}
      margin="none"
      optionText="name"
      optionValue="value"
      source={props.sourceName}
      variant="standard"
    />
  );
};
