import { type } from "os";

// types.ts
export type Permissions = {
  role: string;
  age: string;
};

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