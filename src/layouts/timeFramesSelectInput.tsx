import * as React from "react";
import {
  Loading,
  required,
  SelectInput,
  useGetList,
  useTranslate,
} from "react-admin";

import { timeFrame } from "../types";

interface TimeFramesSelectInputProps {
  frameChoices: number[];
  label: string;
  required?: boolean;
  sourceName: string;
}

export const TimeFramesSelectInput: React.FC<TimeFramesSelectInputProps> = (
  props
) => {
  const translate = useTranslate();
  const calculateChoices = (timeFrames: timeFrame[], filter: number[]) => {
    return timeFrames
      .filter((timeFrame) => filter.includes(timeFrame.minutes))
      .map((timeFrame) => {
        let name = "";

        if (timeFrame.minutes < 60) {
          name = `${timeFrame.minutes} ${
            timeFrame.minutes > 1
              ? translate("timeFrames.minShortPlural")
              : translate("timeFrames.minShort")
          }`;
        } else if (timeFrame.minutes >= 60 && timeFrame.minutes < 1440) {
          const hours = Math.floor(timeFrame.minutes / 60);
          name = `${hours} ${
            hours > 1
              ? translate("timeFrames.hourShortPlural")
              : translate("timeFrames.hourShort")
          }`;
        } else if (timeFrame.minutes < 10080) {
          const days = Math.floor(timeFrame.minutes / 1440);
          name = `${days} ${
            days > 1
              ? translate("timeFrames.dayShortPlural")
              : translate("timeFrames.dayShort")
          }`;
        } else if (timeFrame.minutes < 43200) {
          const weeks = Math.floor(timeFrame.minutes / 10080);
          name = `${weeks} ${
            weeks > 1
              ? translate("timeFrames.weekShortPlural")
              : translate("timeFrames.weekShort")
          }`;
        } else {
          const months = Math.floor(timeFrame.minutes / 43200);
          name = `${months} ${
            months > 1
              ? translate("timeFrames.monthShortPlural")
              : translate("timeFrames.monthShort")
          }`;
        }

        return { ...timeFrame, name: name };
      });
  };
  const {
    data: choices,
    total: totalChoices,
    isPending: isPendingChoices,
    error: errorChoices,
  } = useGetList<timeFrame>("timeframes", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "minutes", order: "DESC" },
  });

  if (isPendingChoices) return <Loading />;
  if (errorChoices) return <div>ERROR</div>;

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
      disabled={isPendingChoices}
      emptyText={translate("common.do_not_use")}
      isLoading={isPendingChoices}
      label={props.label}
      margin="none"
      optionText="name"
      optionValue="minutes"
      source={props.sourceName}
      variant="standard"
    />
  );
};
