import * as React from "react";
import {
  List,
  SimpleList,
  Datagrid,
  DateField,
  FunctionField,
  TextField,
  TextInput,
  ReferenceField,
  EditButton,
  usePermissions,
  SearchInput,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  useListContext,
  AutocompleteInputProps,
} from "react-admin";
import { useWatch } from "react-hook-form";
import { useMediaQuery, Theme } from "@mui/material";

const botFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  }),
  exchangeFilterToQuery = (searchText: any) => ({
    title_like: `${searchText}`,
  });

const botFilter = () => {
  const { data, isLoading } = useListContext();
  const exchangeId = useWatch({
    name: "exchange_id_like",
  });

  return (
    <ReferenceInput source="bot_id" reference="bots" allowEmpty>
      <AutocompleteInput optionText="title" filterToQuery={botFilterToQuery} />
    </ReferenceInput>
  );
};

/* const ExchangeFilter = () => {
  const { displayedFilters, filterValues, setFilters, hideFilter } =
    useListContext();
  console.log("filterValues", filterValues);
  const handleChange: AutocompleteInputProps["onChange"] = (value, record) => {
    console.log("value", value, "record", record);
    setFilters(
      {
        bot_id: 48,
      },
      ["bot_id"]
    );
    console.log("filterValues", filterValues);
    console.log("filterValues.bot_id", filterValues.bot_id);

    hideFilter("symbol_like");
  };
  //console.log("displayedFilters", displayedFilters);
  return (
    <ReferenceInput source="exchange_id" reference="exchange">
      <AutocompleteInput
        optionText="title"
        filterToQuery={exchangeFilterToQuery}
        onChange={handleChange}
      />
    </ReferenceInput>
  );
}; */

const ExchangeHandleChange = (value: any, record: any) => {
  console.log("value", value, "record", record);

  const { filterValues, setFilters } = useListContext();
  console.log("filterValues", filterValues);
  /* setFilters(
    {
      bot_id: 48,
    },
    ["bot_id"]
  );
  
  console.log("filterValues", filterValues); */
};
{/* <ReferenceInput source="exchange_id" reference="exchange" allowEmpty alwaysOn>
    <AutocompleteInput
      optionText="title"
      filterToQuery={exchangeFilterToQuery}
      onChange={ExchangeHandleChange}
    />
  </ReferenceInput>, */}
const pairsFilters = [
  <TextInput label="Symbol" source="symbol_like" alwaysOn />,

  <ReferenceInput source="bot_id" reference="bots" allowEmpty alwaysOn>
    <AutocompleteInput optionText="title" filterToQuery={botFilterToQuery} />
  </ReferenceInput>,
  <ReferenceInput
    label="State"
    source="state"
    reference="states"
    allowEmpty
    alwaysOn
  >
    <SelectInput optionText="name" source="state" />
  </ReferenceInput>,
];

/* const botFilterToQuery = (searchText: any, _, params: any) => {
  const query = {
    title_like: `${searchText}`,
  };

  if (params.exchange_id_like) {
    query.exchange_id_like = params.exchange_id_like;
  }

  return query;
};

const exchangeFilterToQuery = (searchText: any, _, params: any) => {
  const query = {
    title_like: `${searchText}`,
  };

  if (params.bot_id_like) {
    query.bot_id_like = params.bot_id_like;
  }

  return query;
};

const BotFilter = () => {
  const exchangeId = useWatch({
    name: "exchange_id_like",
  });

  return (
    <ReferenceInput source="bot_id" reference="bots" allowEmpty>
      <AutocompleteInput
        optionText="title"
        filterToQuery={botFilterToQuery}
        onChange={(event, newValue) => {
          // Обновить значение exchange_id_like при изменении значения фильтра bot_id
          setFilterValue("exchange_id_like", newValue?.id);
        }}
      />
    </ReferenceInput>
  );
};

const ExchangeFilter = () => {
  const botId = useWatch({
    name: "bot_id_like",
  });

  return (
    <ReferenceInput source="exchange_id" reference="exchange" allowEmpty>
      <AutocompleteInput
        optionText="title"
        filterToQuery={exchangeFilterToQuery}
        onChange={(event, newValue) => {
          // Обновить значение bot_id_like при изменении значения фильтра exchange_id
          setFilterValue("bot_id_like", newValue?.id);
        }}
      />
    </ReferenceInput>
  );
};

const pairsFilters = [
  <TextInput label="Symbol" source="symbol_like" alwaysOn />,
  <ExchangeFilter />,
  <BotFilter />,
  <ReferenceInput
    label="State"
    source="state"
    reference="states"
    allowEmpty
    alwaysOn
  >
    <SelectInput optionText="name" source="state" />
  </ReferenceInput>,
]; */

export const PairsList = () => {
  const { isLoading, permissions } = usePermissions();
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  if (isLoading) {
    return <div>Checking permissions...</div>;
  } else {
    const role = permissions.role;

    if (role === 1 || role === 2) {
      return (
        <List perPage={10} filters={pairsFilters}>
          {isSmall ? (
            <SimpleList
              primaryText={(record) => record.title}
              secondaryText={(record) => record.state}
              tertiaryText={(record) => record.currencies}
            />
          ) : (
            <Datagrid>
              <TextField source="id" />
              <TextField source="symbol" />
              <ReferenceField label="State" source="state" reference="states">
                <FunctionField render={(record) => record.name} />
              </ReferenceField>
              <ReferenceField label="Bot" source="bot_id" reference="bots">
                <FunctionField render={(record) => record.title} />
              </ReferenceField>
              <TextField source="pair_limit" />
              <TextField source="step" />
              <TextField source="start_offset" />
              <TextField source="profit" />
              <TextField source="squiz" />
              <EditButton />
            </Datagrid>
          )}
        </List>
      );
    } else {
      return <div>Not enough permissions</div>;
    }
  }
};
