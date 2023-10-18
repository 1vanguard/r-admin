import {
  Loading,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  useGetList,
  useRecordContext,
  usePermissions,
} from "react-admin";
import { PrymaryEditToolbar } from "../../layouts/primaryEditToolbar";

const Editform = () => {
  const record = useRecordContext();

  if (!record) {
    return <Loading />;
  }

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
    <SimpleForm toolbar={<PrymaryEditToolbar />}>
      <TextInput disabled label="Id" source="id" />
      <TextInput
        source="title"
        defaultValue={record.title}
        validate={required()}
      />
      <TextInput
        source="address"
        defaultValue={record.address}
        validate={required()}
      />
      <TextInput
        source="phone"
        defaultValue={record.phone}
        validate={required()}
      />
      <SelectInput
        source="state"
        choices={states}
        validate={required()}
        defaultValue={record.state}
      />
    </SimpleForm>
  );
};

export const OfficeEdit = () => {
  const { isLoading, permissions } = usePermissions();

  if (isLoading) {
    return <Loading />;
  } else {
    const role = permissions.role;

    if (role === 1) {
      return (
        <Edit>
          <Editform />
        </Edit>
      );
    } else {
      return <div>Not enough permissions</div>;
    }
  }
};
