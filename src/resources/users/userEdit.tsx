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
import { getRoles } from "../../helpers/roleUtils";

const Editform = () => {
  const record = useRecordContext();

  if (!record) {
    return <Loading />;
  }

  const [states, setStates] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const states = await getStates();
      setStates(states);
    };

    fetchStates();

    const fetchRoles = async () => {
      const roles = await getRoles();
      setRoles(roles);
    };

    fetchRoles();
  }, []);

  return (
    <>
      {states.length > 0 && roles.length > 0 ? (
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
          <ReferenceInput label="Role" source="role" reference="roles">
            <SelectInput
              source="role"
              choices={roles}
              validate={required()}
              defaultValue={"2"}
            />
          </ReferenceInput>
          <ReferenceInput label="Office" source="officeId" reference="offices">
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
