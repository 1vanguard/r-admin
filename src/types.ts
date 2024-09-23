/* import { Role } from './types';
import { type } from "os"; */

// types.ts
export type Permissions = {
  role: string;
  age: string;
};

export type Role = {
  id: number;
  name: string;
  state: number;
  parent_role?: number;
};

export interface State {
  id: number;
  name: string;
}

export interface WebSocketContextType {
  sockets: (WebSocket | null)[];
}

export interface timeFrame {
  [key: string]: any;
  id: number;
  minutes: number;
}

export interface period {
  id: number;
  value: number;
}

export interface usersPermanentFilter {
  officeId?: number;
  role?: number;
}

export type Idxs = {
  [baseEntityId: number]: IdxEntry[];
};

export type Logs = {
  [baseEntityId: number]: LogEntry[];
};


export interface IdxEntry {
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

export interface LogEntry {
  id: string;
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
  api_ready: number;
  state: number;
  title: string;
  exchange_id: number;
  user_id: number;
} & {
  [key: string]: any;
};

export type FBot = {
  id: number;
  api_ready: number;
  state: number;
  title: string;
  exchange_id: number;
  user_id: number;
} & {
  [key: string]: any;
};

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

export type FBotGrid = {
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

export type BotPause = {
  id: number;
  bot_id: number;
  pause_start: string;
  pause_end?: string;
}

export type FBotPause = {
  id: number;
  bot_id: number;
  pause_start: string;
  pause_end?: string;
}

export type PairPause = {
  id: number;
  pair_id: number;
  pause_start: string;
  pause_end?: string;
}

export type FPairPause = {
  id: number;
  pair_id: number;
  pause_start: string;
  pause_end?: string;
}

export type Exchange = {
  id: number;
  state: number;
  title: string;
} & {
  [key: string]: any;
};

export type PairGrid = {
  id: number;
  symbol: string;
  bot_id: number;
  pair_id: number;
  in_orders: number;
  purchases: number;
  sales: number;
}

export type FPairGrid = {
  id: number;
  symbol: string;
  bot_id: number;
  pair_id: number;
  in_orders: number;
  purchases: number;
  sales: number;
}

export type PairOrder = {
  id: number;
  order_done: number;
  order_id: number;
  pair_id: number;
  price: number;
  profit: number;
  qty: number;
  sell_done: number;
  sell_price: number;
  sell_qty: number;
  sellOrder: string;
  startOrder: string;
  symbol: string;
}

export type FPairOrder = {
  id: number;
  order_done: number;
  order_id: number;
  pair_id: number;
  price: number;
  profit: number;
  qty: number;
  sell_done: number;
  sell_price: number;
  sell_qty: number;
  sellOrder: string;
  startOrder: string;
  symbol: string;
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
  state: number;
  symbol: string;
  bot_id: number;
} & {
  [key: string]: any;
};

export type FBotPair = {
  id: number;
  state: number;
  symbol: string;
  bot_id: number;
} & {
  [key: string]: any;
};

export type FBotIndicator = {
  enabled: number | string;
  id: number;
  fbot_id: number;
  fields: Array<FBotIndicatorField>;
  indicator_id: number;
  indicator_name: string;
} & {
  [key: string]: any;
};

export type FBotIndicatorField = {
  attributes: Array<object>;
  name: string;
  required: boolean;
  type: string;
  value: any;
  values_list: Array<object>;
} & {
  [key: string]: any;
};

export interface WebSocketDataContextType {
  logs?: Logs;
  idxs?: Idxs;
  addLog?(baseEntityId: number, data: LogEntry): void;
  addIdx?(baseEntityId: number, data: IdxEntry): void;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  parentId?: number;
  tabValue: number;
}

export type Office = {
  id: number;
  title: string;
  state: number;
} & {
  [key: string]: any;
}

export type User = {
  id: number;
  name?: string;
  username: string;
  officeId: number;
  role:  number;
  state: number;
} & {
  [key: string]: any;
}