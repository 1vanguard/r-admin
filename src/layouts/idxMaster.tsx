import React from "react";
import { useWebSocketDataContext } from "../helpers/WebSocketDataContext";
import { Loading } from "react-admin";

interface IdxMasterProps {
  idxName: string;
  pairId: number;
  style?: React.CSSProperties;
}

const IdxMaster: React.FC<IdxMasterProps> = ({ idxName, pairId, style }) => {
  const { idxs } = useWebSocketDataContext();

  if (!idxs) {
    return <Loading />;
  }

  const targetIdx = idxs[pairId]?.find((idx) => idx.indicator === idxName);
  if (!targetIdx) {
    return "-";
  }

  const indColor = targetIdx.color;

  return (
    <span style={{ color: indColor, ...style }}>
        {targetIdx.value}
    </span>
  );
};

export default IdxMaster;