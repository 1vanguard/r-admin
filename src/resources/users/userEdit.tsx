import {
  Loading,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  useRecordContext,
  useGetList,
  usePermissions,
} from "react-admin";
import { getStates } from "../../helpers/stateUtils";
import { getRoles } from "../../helpers/roleUtils";
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";

const Editform = () => {
  const record = useRecordContext();

  if (!record) {
    return <Loading />;
  }

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
    <SimpleForm toolbar={<PrymaryEditToolbar />}>
      <TextInput disabled label="Id" source="id" />
      <TextInput disabled source="username" defaultValue={record.username} />
      <TextInput source="firstName" defaultValue={record.firstName} />
      <TextInput source="lastName" defaultValue={record.lastName} />
      <TextInput
        source="email"
        type="email"
        validate={required()}
        defaultValue={record.email}
      />
      <TextInput source="telegram" defaultValue={record.telegram} />
      <ReferenceInput label="Role" source="role" reference="roles">
        <SelectInput
          source="role"
          choices={roles}
          validate={required()}
          defaultValue={"2"}
        />
      </ReferenceInput>
      <ReferenceInput label="Office" source="officeId" reference="offices">
        <SelectInput
          optionText="title"
          optionValue="id"
          validate={required()}
        />
      </ReferenceInput>
      <SelectInput
        source="state"
        choices={states}
        validate={required()}
        defaultValue={record.state}
      />
    </SimpleForm>
  );
};

export const UserEdit = () => {
  return (
    <Edit>
      <Editform />
    </Edit>
  );
};
