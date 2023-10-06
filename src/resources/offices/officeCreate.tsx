import * as React from "react";
import { useEffect, useState } from "react";
import {
  Loading,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  usePermissions,
} from "react-admin";
import { getStates } from "../../helpers/stateUtils";

const CreateForm = () => {
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
          <TextInput source="title" validate={required()} />
          <TextInput source="address" validate={required()} />
          <TextInput source="phone" validate={required()} />
          <TextInput source="url" />
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

export const OfficeCreate = () => {
  const { isLoading, permissions } = usePermissions(),
    role = permissions.role;
  return (
    <Create mutationOptions={{ meta: { creator_role: role } }} redirect="list">
      <>
        {role === 1 ? (
          <CreateForm />
        ) : (
          <div>Only admins can create offices</div>
        )}
      </>
    </Create>
  );
};
