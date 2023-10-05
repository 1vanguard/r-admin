import * as React from "react";
import { useEffect, useState } from "react";
import {
  Loading,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  useRecordContext,
} from "react-admin";
import { getStates } from "../../helpers/stateUtils";

const Editform = () => {
  const record = useRecordContext();

  if (!record) {
    return <Loading />;
  }

  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const states = await getStates();
      setStates(states);
    };

    fetchStates();
  }, []);

  return (
    <>
      {states.length > 0 ? (
        <SimpleForm>
          <TextInput disabled label="Id" source="id" />
          <TextInput
            source="title"
            defaultValue={record.title}
            validate={required()}
          />
          <TextInput
            source="address"
            defaultValue={record.address}
            validate={required()}
          />
          <TextInput
            source="phone"
            defaultValue={record.phone}
            validate={required()}
          />
          <SelectInput
            source="state"
            choices={states}
            validate={required()}
            defaultValue={record.state}
          />
        </SimpleForm>
      ) : (
        <Loading />
      )}
    </>
  );
};

export const OfficeEdit = () => {
  return (
    <Edit>
      <Editform />
    </Edit>
  );
};
