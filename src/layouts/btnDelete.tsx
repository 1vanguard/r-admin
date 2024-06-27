import { useDelete, useRecordContext } from "react-admin";

const btnDelete = (props) => {
  const record = useRecordContext();
  if (!record) return null;
  const [deleteOne, { isLoading, error }] = useDelete(),
    resourseType = props.resource;
  const handleClick = () => {
    deleteOne(resourseType, {
      id: record.id,
      previousData: record,
    });
  };
  if (error) return <div>ERROR</div>;

  return (
    <button disabled={isLoading} onClick={handleClick}>
      Delete
    </button>
  );
};

export default btnDelete;
