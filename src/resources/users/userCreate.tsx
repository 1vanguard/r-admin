import { Create, SimpleForm, TextInput, SelectInput } from "react-admin";

export const UserCreate = (props) => {
  const rolesChoices = [
    { id: "admin", name: "admin" },
    { id: "manager", name: "manager" },
    { id: "client", name: "client" },
  ];
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="username" />
        <TextInput source="email" type="email" />
        <TextInput source="password" type="password" />
        <SelectInput source="role" choices={ rolesChoices } defaultValue={ "manager"} />
      </SimpleForm>
    </Create>
  );
};
