import * as React from "react";
import { Loading, required, SelectInput, useGetList } from "react-admin";

const calculateChoices = (timeFrames, filter) => {
  return timeFrames
    .filter((timeFrame) => filter.includes(timeFrame.minutes)) // Filter time frames based on values in the filter array
    .map((timeFrame) => {
      let name = "";

      if (timeFrame.minutes < 60) {
        // If the duration is less than 60 minutes, format the name as "{minutes} min."
        name = `${timeFrame.minutes} min.`;
      } else if (timeFrame.minutes >= 60 && timeFrame.minutes < 1440) {
        // If the duration is between 60 and 1440 minutes (one day), format the name as "{hours} hour{s}"
        const hours = Math.floor(timeFrame.minutes / 60);
        name = `${hours} hour${hours > 1 ? "s" : ""}`;
      } else if (timeFrame.minutes < 10080) {
        // If the duration is between 1440 and 10080 minutes (one week), format the name as "{days} day{s}"
        const days = Math.floor(timeFrame.minutes / 1440);
        name = `${days} day${days > 1 ? "s" : ""}`;
      } else if (timeFrame.minutes < 43200) {
        // If the duration is between 10080 and 43200 minutes (one month), format the name as "{weeks} week{s}"
        const weeks = Math.floor(timeFrame.minutes / 10080);
        name = `${weeks} week${weeks > 1 ? "s" : ""}`;
      } else {
        // If the duration is more than 43200 minutes (more than one month), format the name as "{months} month{s}"
        const months = Math.floor(timeFrame.minutes / 43200);
        name = `${months} month${months > 1 ? "s" : ""}`;
      }

      return { ...timeFrame, name: name }; // Return the time frame with the added name property
    });
};

interface TimeFramesSelectInputProps {
  frameChoices: number[];
  label: string;
  required?: boolean;
  sourceName: string;
}

export const TimeFramesSelectInput: React.FC<TimeFramesSelectInputProps> = (
  props
) => {
  const {
    data: choices,
    isLoading: isLoadingChoices,
    error: errorChoices,
  } = useGetList("timeframes");

  isLoadingChoices && <Loading />
  errorChoices && <div>ERROR</div>

  const frameChoices = props.frameChoices;
  const timeFrameChoices = calculateChoices(choices, frameChoices);
  /* const minChoiceObj = timeFrameChoices.reduce(
    (min, current) => (current.id < min.id ? current : min),
    timeFrameChoices[0]
  );
  const minChoiceId = minChoiceObj.id; */

  return (
    <SelectInput
      {...(props.required ? { validate: required() } : {})}
      // emptyValue={minChoiceId}
      choices={timeFrameChoices}
      disabled={isLoadingChoices}
      emptyText="Do not use"
      isLoading={isLoadingChoices}
      label={props.label}
      margin="none"
      optionText="name"
      optionValue="minutes"
      source={props.sourceName}
      variant="standard"
    />
  );
};
