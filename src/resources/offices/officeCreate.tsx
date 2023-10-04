import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
} from "react-admin";
import stateValues from "../../helpers/stateValues";

export const OfficeCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
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
    </Create>
  );
};
