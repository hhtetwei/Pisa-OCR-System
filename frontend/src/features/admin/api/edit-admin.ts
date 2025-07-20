import { api } from '@/libs/axios';
import { useMutation } from '@tanstack/react-query';
import { CreateAdminDto } from '../schemas/create-admin';

export const editAdmin = async ({ id, data }: { id: number; data: CreateAdminDto }) =>
  api.patch(`/admins/${id}`, data).then((res) => res.data);

export const useEditAdmin = () => useMutation({ mutationFn: editAdmin });
