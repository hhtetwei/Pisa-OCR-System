import { User } from "../user/types";

export type Students = {
  parentEmail: string;
  user: User
};

export type GetStudentResponse = { data: Students[]; count: number };

export type GetStudentsDto = {
    skip?: number;
    limit?: number;
    search?: string;
  };