import {
  Loading,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  required,
  useGetList,
  usePermissions,
} from "react-admin";

const CreateForm = () => {
  const {
    data: states,
    isLoading: isLoadingStates,
    error: errorStates,
  } = useGetList("states");

  const {
    data: roles,
    isLoading: isLoadingRoles,
    error: errorRoles,
  } = useGetList("roles");

  if (isLoadingStates || isLoadingRoles) {
    return <Loading />;
  }
  if (errorStates || errorRoles) {
    return <p>ERROR</p>;
  }

  return (
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
  );
};

export const UserCreate = () => {
  const { isLoading, permissions } = usePermissions(),
    role = permissions.role;

  if (isLoading) {
    return <Loading />;
  } else {
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
  }
};
