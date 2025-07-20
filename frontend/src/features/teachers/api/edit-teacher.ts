import { api } from '@/libs/axios';
import { useMutation } from '@tanstack/react-query';
import { CreateTeacherDto } from '../schemas';

export const editTeacher = async ({ id, data }: { id: number; data: CreateTeacherDto }) =>
  api.patch(`/teachers/${id}`, data).then((res) => res.data);

export const useEditTeacher = () => useMutation({ mutationFn: editTeacher });
