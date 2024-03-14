import React, { createContext, useContext, useState, useEffect } from "react";
import { WebSocketContextType } from "./types";

const WebSocketContext = createContext<WebSocketContextType>(null);

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider: React.FC<{
  children: React.ReactNode;
  urls: string[];
  protocols: string[];
}> = ({ children, urls, protocols }) => {
  const [sockets, setSockets] = useState<(WebSocket | null)[]>([]);

  useEffect(() => {
    const newSockets = urls.map((url, index) => {
      const socket = new WebSocket(url, protocols[index]);

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };
      socket.onmessage = (event) => {
        // Обработка полученного сообщения
        // console.log("Received WebSocket message:", event.data);
      };
      socket.onerror = (error) => {
        // Обработка ошибки
        console.error("WebSocket connection error:", error);
      };
      socket.onclose = () => {
        // Обработка закрытия веб-сокета
        console.log("WebSocket connection closed");
      };
      return socket;
    });
    setSockets(newSockets);

    return () => {
      newSockets.forEach((socket) => {
        if (socket) {
          socket.close();
        }
      });
    };
  }, [urls, protocols]);

  return (
    <WebSocketContext.Provider value={{ sockets }}>
      {children}
    </WebSocketContext.Provider>
  );
};
