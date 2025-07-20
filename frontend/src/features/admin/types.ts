import { User } from "../user/types";

export type Admins = {
  user: User
};

export type GetAdminResponse = { data: Admins[]; count: number };

export type GetAdminDto = {
    skip?: number;
    limit?: number;
    search?: string;
  };