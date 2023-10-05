import * as React from "react";
import { Loading, useGetList } from "react-admin";

type stateValue = {
  id: number;
  name: string;
};

export const getStateValues = () => {
  const { data, total, isLoading, error } = useGetList("states", {
    pagination: { page: 1, perPage: 0 },
    sort: { field: "id", order: "ASC" },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

// console.log(data)
  const stateValues = data
    ? data.map((item) => ({
        id: item.id,
        title: item.title,
      }))
    : [];

  return stateValues;
}

export const StateValues = () => {
  const stateValues = getStateValues();
  return null;
};

/* type stateValue = {
  id: string;
  name: string;
};

const stateValues: stateValue[] = [
  { id: "active", name: "active" },
  { id: "disabled", name: "disabled" },
];

export default stateValues; */
