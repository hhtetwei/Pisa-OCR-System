import { api } from '@/libs/axios';
import { useMutation } from '@tanstack/react-query';
import { CreateStudentDto } from '../schemas';

export const editStudent = async ({ id, data }: { id: number; data: CreateStudentDto }) =>
  api.patch(`/students/${id}`, data).then((res) => res.data);

export const useEditStudent = () => useMutation({ mutationFn: editStudent });
