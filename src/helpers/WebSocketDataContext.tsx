import React, { createContext, useContext, useEffect, useState } from "react";
import {
  IdxEntry,
  Idxs,
  LogEntry,
  Logs,
  WebSocketDataContextType,
} from "../types";
import { useWebSocket } from "../webSocketProvider";
import processWebSocketMessage from "./webSocketDataProcessor";

interface WebSocketDataContextProps {
  children: React.ReactNode;
  webSocket: boolean;
}

const WebSocketDataContext = createContext<
  WebSocketDataContextType | undefined
>(undefined);

export const useWebSocketDataContext = () => {
  const context = useContext(WebSocketDataContext);
  if (!context) {
    throw new Error(
      "useWebSocketDataContext must be used within a WebSocketDataProvider"
    );
  }
  return context;
};

const WebSocketDataProvider: React.FC<WebSocketDataContextProps> = ({
  children,
  webSocket,
}) => {
  const initialIdxs: Idxs = {};
  const initialLogs: Logs = {};
  const [idxs, setIdxs] = useState<Idxs>(initialIdxs);
  const [logs, setLogs] = useState<Logs>(initialLogs);
  const maxLogsPerBasetEntity = 50;

  const addLog = (baseEntityId: number, data: LogEntry): void => {
    setLogs((prevLogs: Logs) => {
      const updatedLogs = {
        ...prevLogs,
        [baseEntityId]: [...(prevLogs[baseEntityId] || []), data],
      };

      if (updatedLogs[baseEntityId].length > maxLogsPerBasetEntity) {
        updatedLogs[baseEntityId].splice(
          0,
          updatedLogs[baseEntityId].length - maxLogsPerBasetEntity
        );
      }

      return updatedLogs;
    });
  };

  const addIdx = (baseEntityId: number, data: IdxEntry): void => {
    setIdxs((prevIdxs: Idxs) => {
      const updatedIdxs = { ...prevIdxs };
      const existingIdx = updatedIdxs[baseEntityId]?.find(
        (idx) => idx.indicator === data.indicator
      );

      if (existingIdx) {
        // Update existing index entry
        updatedIdxs[baseEntityId] = updatedIdxs[baseEntityId].map((idx) =>
          idx.indicator === data.indicator ? data : idx
        );
      } else {
        // Add new index entry
        updatedIdxs[baseEntityId] = [...(updatedIdxs[baseEntityId] || []), data];
      }

      return updatedIdxs;
    });
  };

  const { sockets } = useWebSocket();
  useEffect(() => {
    if (!webSocket) {
      return;
    }
    // Прослушивание сообщений от веб-сокета
    if (sockets.length > 0 && sockets[0]) {
      sockets[0].onmessage = (event) => {
        const rawData = processWebSocketMessage(event.data);

        if (rawData && rawData.mode === "log") {
          const newProcessedData: LogEntry = {
            id: rawData.id,
            bot_id: Number(rawData.bot_id),
            color: rawData.color,
            date: rawData.date,
            message: rawData.message,
            mode: rawData.mode,
            pair_id: Number(rawData.pair_id),
            site: rawData.site,
          };
          addLog(Number(rawData.pair_id), newProcessedData);
        }

        if (rawData && rawData.mode === "idx") {
          const newProcessedData: IdxEntry = {
            bot_id: Number(rawData.bot_id),
            color: rawData.color,
            date: rawData.date,
            id: rawData.id,
            indicator: rawData.indicator,
            mode: rawData.mode,
            pair_id: Number(rawData.pair_id),
            site: rawData.site,
            value: rawData.value,
          };
          addIdx(Number(rawData.pair_id), newProcessedData);
        }
      };
    }
  }, [sockets, idxs, addIdx, logs, addLog]);

  return (
    <WebSocketDataContext.Provider value={{ logs, idxs }}>
      {children}
    </WebSocketDataContext.Provider>
  );
};

export default WebSocketDataProvider;
