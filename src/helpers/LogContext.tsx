import React, { createContext, useContext, useEffect, useState } from "react";
import { LogContextType, LogEntry, Logs } from "../types";
import { useWebSocket } from "../webSocketProvider";
import processWebSocketMessage from "./webSocketDataProcessor";

interface LogContextProps {
  children: React.ReactNode;
  webSocketLogs: boolean;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export const useLogContext = () => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error("useLogContext must be used within a LogProvider");
  }
  return context;
};

const LogProvider: React.FC<LogContextProps> = ({ children, webSocketLogs }) => {
  const initialLogs: Logs = {};
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

  const { sockets } = useWebSocket();
  useEffect(() => {
    if (!webSocketLogs) {
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
      };
    }
  }, [sockets, logs, addLog]);

  return (
    <LogContext.Provider value={{ logs }}>
      {children}
    </LogContext.Provider>
  );
};

export default LogProvider;