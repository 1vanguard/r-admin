import { type } from "os";

// types.ts
export type Permissions = {
  role: string;
  age: string;
};

export interface WebSocketContextType {
  sockets: (WebSocket | null)[];
}

export interface timeFrame {
  id: number;
  minutes: number;
}


export interface period {
  id: number;
  value: number;
}

export interface usersFilter {
  officeId?: number;
  role?: number;
}

export interface LogEntry {
  bot_id: number;
  color: string;
  date: string;
  message: string;
  mode: string;
  pair_id: number;
  site: string;
}