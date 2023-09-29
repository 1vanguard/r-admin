import { Create, SimpleForm, TextInput, SelectInput } from "react-admin";

export const OfficeCreate = (props) => {
  const stateChoises = [
    { id: "active", name: "active" },
    { id: "disabled", name: "disabled" }
  ];
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="address" />
        <TextInput source="phone" />
        <SelectInput source="state" choices={ stateChoises } defaultValue={ "active"} />
      </SimpleForm>
    </Create>
  );
};
