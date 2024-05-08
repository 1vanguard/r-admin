import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { WebSocketProvider } from "./webSocketProvider";
import LogProvider from "./helpers/LogContext";
const webSocketUrl1 = import.meta.env.VITE_JSON_WEB_SOCKET_URL_1;
const webSocketProtocol1 = import.meta.env.VITE_JSON_WEB_SOCKET_PROTOCOL_1;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WebSocketProvider
      urls={[webSocketUrl1]}
      protocols={[webSocketProtocol1]}
    >
      <LogProvider webSocketLogs={true}>
        <App />
      </LogProvider>
    </WebSocketProvider>
  </React.StrictMode>
);
