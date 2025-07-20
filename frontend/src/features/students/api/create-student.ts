import { api } from '@/libs/axios';
import { useMutation } from '@tanstack/react-query';
import { CreateStudentDto } from '../schemas/create-student';


export const createStudent = async (data: CreateStudentDto) =>
  api.post('/students', data).then((res) => res.data);

export const useCreateStudent = () => useMutation({ mutationFn: createStudent });
