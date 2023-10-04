import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required
} from "react-admin";
import stateValues from "../../helpers/stateValues";

export const OfficeEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="title" validate={required()} />
      <TextInput source="address" validate={required()} />
      <TextInput source="phone" validate={required()} />
        <SelectInput
          source="state"
          choices={stateValues}
          defaultValue={"active"}
          validate={required()}
        />
    </SimpleForm>
  </Edit>
);
