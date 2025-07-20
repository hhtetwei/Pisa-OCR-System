import { User } from "../user/types";

export type Teachers = {
  user: User
};

export type GetTeacherResponse = { data: Teachers[]; count: number };

export type GetTeacherDto = {
    skip?: number;
    limit?: number;
    search?: string;
  };