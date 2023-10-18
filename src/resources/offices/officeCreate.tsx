import {
  Loading,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  useGetList,
  usePermissions,
} from "react-admin";

const CreateForm = () => {
  const {
    data: states,
    isLoading: isLoadingStates,
    error,
  } = useGetList("states");

  if (isLoadingStates) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }

  return (
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
  );
};

export const OfficeCreate = () => {
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
            <div>Only admins can create offices</div>
          )}
        </>
      </Create>
    );
  }
};
