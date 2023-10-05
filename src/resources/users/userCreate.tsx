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
        <TextInput source="username" validate={required()} />
        <TextInput source="email" type="email" validate={required()} />
        <TextInput source="password" type="password" validate={required()} />
        <SelectInput
          source="role"
          choices={rolesChoices}
          defaultValue={"manager"}
          validate={required()}
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
