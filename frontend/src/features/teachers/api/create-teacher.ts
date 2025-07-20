import { api } from '@/libs/axios';
import { useMutation } from '@tanstack/react-query';
import { CreateTeacherDto } from '../schemas';

export const createTeacher = async (data: CreateTeacherDto) =>
  api.post('/teachers', data).then((res) => res.data);

export const useCreateTeacher = () => useMutation({ mutationFn: createTeacher });
