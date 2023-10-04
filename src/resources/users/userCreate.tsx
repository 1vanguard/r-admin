import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  required,
  usePermissions,
} from "react-admin";

export const UserCreate = (props) => {
  const rolesChoices = [
    { id: "admin", name: "admin" },
    { id: "manager", name: "manager" },
    { id: "client", name: "client" },
  ];

  const { isLoading, permissions } = usePermissions(),
    role = permissions.role;

  console.log(permissions);
  return (
    <Create
      resource="users"
      mutationOptions={{ meta: { creator_role: role } }}
      {...props}
    >
      <SimpleForm>
        <TextInput source="username" />
        <TextInput source="email" type="email" />
        <TextInput source="password" type="password" />
        <SelectInput
          source="role"
          choices={rolesChoices}
          defaultValue={"manager"}
        />
        <ReferenceInput label="Office" source="office_id" reference="offices">
          <SelectInput
            optionText="title"
            optionValue="id"
            validate={required()}
          />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
