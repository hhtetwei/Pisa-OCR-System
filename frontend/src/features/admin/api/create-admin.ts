import { api } from '@/libs/axios';
import { useMutation } from '@tanstack/react-query';
import { CreateAdminDto } from '../schemas/create-admin';

export const createAdmin = async (data: CreateAdminDto) =>
  api.post('/admins', data).then((res) => res.data);

export const useCreateAdmin = () => useMutation({ mutationFn: createAdmin });
