import * as React from "react";
import { useEffect, useState } from "react";
import {
  Loading,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
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
            disabled
            source="username"
            defaultValue={record.username}
          />
          <TextInput source="firstName" defaultValue={record.firstName} />
          <TextInput source="lastName" defaultValue={record.lastName} />
          <TextInput
            source="email"
            type="email"
            validate={required()}
            defaultValue={record.email}
          />
          <TextInput source="telegram" defaultValue={record.telegram} />
          <TextInput disabled source="role" />
          <ReferenceInput label="Office" source="office_id" reference="offices">
            <SelectInput
              optionText="title"
              optionValue="id"
              validate={required()}
            />
          </ReferenceInput>
        </SimpleForm>
      ) : (
        <Loading />
      )}
    </>
  );
};

export const UserEdit = () => {
  return (
    <Edit>
      <Editform />
    </Edit>
  );
};
