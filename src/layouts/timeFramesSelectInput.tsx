import * as React from "react";
import { useEffect, useState } from "react";
import { Loading, SelectInput, required, useGetList } from "react-admin";
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

interface TimeFramesSelectInputProps {
  frameChoices: number[];
  fullWidth?: boolean;
  label: string;
  recordValue?: number;
  required?: boolean;
  sourceName: string;
}

export const TimeFramesSelectInput: React.FC<TimeFramesSelectInputProps> = (props) => {
  
  const [selectedValue, setSelectedValue] = useState(null);

  const {
      data: choices,
      isLoading: isLoadingChoices,
      error,
    } = useGetList("timeframes"),
    currentValue = useWatch({ name: props.sourceName });

  if (isLoadingChoices) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }

  const frameChoices = props.frameChoices;
  const timeFrameChoices = calculateChoices(choices, frameChoices);
  const minChoiceObj = timeFrameChoices.reduce((min, current) => current.id < min.id ? current : min, timeFrameChoices[0]);
  const minChoiceId = minChoiceObj.id;

  /* useEffect(() => {
    if (props.recordValue === null || props.recordValue === undefined) {

      setSelectedValue(minChoiceId);
    } 
  }, [props.recordValue]);

  const handleSelectChange = (value: number) => {
    setSelectedValue(value);
  }; */

  return (
    <SelectInput
      choices={timeFrameChoices}
      // defaultValue={minChoiceId}
      disabled={isLoadingChoices}
      emptyText="Do not use"
      fullWidth={props.fullWidth ? true : false}
      isLoading={isLoadingChoices}
      label={props.label}
      margin="none"
      emptyValue={minChoiceId}
      optionText="name"
      source={props.sourceName}
      variant="standard"
      validate={required()}
      // {...(props.required ? { validate: required() } : {})}
    />
  );
};