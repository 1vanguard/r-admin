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

export type Bot = {
  id: number;
  state: number;
  title: string;
  exchange_id: number;
  user_id: number;
}

export type BotGrid = {
  id: number;
  symbol: string;
  bot_id: number;
  pair_id: number;
  qty_usd: number;
  order_done: number;
  sell_done: number;
  in_trades: number;
  profit: number;
}

export interface BotIdx {
  bot_id: number;
  color: string;
  date: string;
  id: string;
  indicator: string;
  mode: string;
  pair_id: number;
  site: string;
  value: number; // Проверить на знаки после запятой
}

export type BotPair = {
  id: number;
  state: string;
  symbol: string;
  bot_id: number;
}