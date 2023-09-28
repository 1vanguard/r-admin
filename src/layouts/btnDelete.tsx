import { useDelete, useRecordContext } from "react-admin";

const btnDelete = (props) => {
  const record = useRecordContext(),
    [deleteOne, { isLoading, error }] = useDelete(),
    resourseType = props.resource;
  const handleClick = () => {
    deleteOne(resourseType, {
      id: record.id,
      previousData: record,
    });
  };
  if (error) {
    return <p>ERROR</p>;
  }
  return (
    <button disabled={isLoading} onClick={handleClick}>
      Delete
    </button>
  );
};

export default btnDelete;
