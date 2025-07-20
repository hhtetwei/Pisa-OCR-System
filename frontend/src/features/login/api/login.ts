import { api } from '@/libs/axios';
import { useMutation } from '@tanstack/react-query';
import { LoginDto } from '../schemas';
import { User } from '@/features/user/types';

export const login = async (data: LoginDto) =>
  api.post<{ data: User; token: string }>('/auth/login', data).then((res) => res.data);

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });
