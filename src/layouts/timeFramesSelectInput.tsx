import * as React from "react";
import { Loading, SelectInput, useGetList } from "react-admin";
import { useWatch } from "react-hook-form";
// import { timeFrame } from "../types";

const calculateChoices = (timeFrames, filter) => {
  return timeFrames
    .filter((timeFrame) => filter.includes(timeFrame.minutes))
    .map((timeFrame) => {
      const name =
        timeFrame.minutes < 60
          ? `${timeFrame.minutes} min.`
          : `${timeFrame.minutes / 60} h.`;
      return { ...timeFrame, name: name };
    });
};

export const TimeFramesSelectInput = (props) => {
  const {
      data: choices,
      isLoading: isLoadingChoices,
      error,
    } = useGetList("timeframes"),
    currentValue = useWatch({ name: props.name });

  if (isLoadingChoices) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }

  const timeFrameChoices = calculateChoices(choices, props.frameChoices);

  return (
    <SelectInput
      fullWidth={props.fullWidth ? true : false}
      label={props.label}
      source={props.name}
      optionText="name"
      emptyText="Do not use"
      choices={timeFrameChoices}
      isLoading={isLoadingChoices}
      disabled={isLoadingChoices}
    />
  );
};