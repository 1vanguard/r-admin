import React from "react";

type IdMarkProps = {
  id: number;
};

const IdMark: React.FC<IdMarkProps> = (props) => {
  const { id } = props;
  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          fontSize: "0.8em",
          lineHeight: "0.8em",
          verticalAlign: "top",
        }}
      >
        ID
      </div>
      <div
        style={{
          fontSize: "1.2em",
          fontWeight: 700,
          lineHeight: "2.1em",
        }}
      >
        {id}
      </div>
    </div>
  );
};

export default IdMark;
