import * as React from "react";
import { useEffect, useState } from "react";
import {
  Loading,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  required,
  usePermissions,
} from "react-admin";
import { getStates } from "../../helpers/stateUtils";
import { getRoles } from "../../helpers/roleUtils";

const CreateForm = () => {
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
          <TextInput source="username" validate={required()} />
          <TextInput source="password" type="password" validate={required()} />
          <TextInput source="firstName" validate={required()} />
          <TextInput source="lastName" validate={required()} />
          <TextInput source="email" type="email" validate={required()} />
          <TextInput source="telegram" validate={required()} />
          <ReferenceInput label="Office" source="officeId" reference="offices">
            <SelectInput
              optionText="title"
              optionValue="id"
              validate={required()}
            />
          </ReferenceInput>
          <SelectInput
            source="role"
            choices={roles}
            validate={required()}
            defaultValue={2}
          />
          <SelectInput
            source="state"
            choices={states}
            validate={required()}
            defaultValue={1}
          />
        </SimpleForm>
      ) : (
        <Loading />
      )}
    </>
  );
};

export const UserCreate = () => {
  const { isLoading, permissions } = usePermissions(),
    role = permissions.role;

  return (
    <Create
      mutationOptions={{ meta: { creator_role: role } }}
      redirect="list"
    >
      <>
      {role === 1 ? (
      <CreateForm />
      ) : (
        <div>Only admins can create users</div>
      )}
      </>
    </Create>
  );
};
