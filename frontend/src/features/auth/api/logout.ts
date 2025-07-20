import { User } from '@/features/user/types';
import { api } from '@/libs/axios';
import { useMutation } from '@tanstack/react-query';

export const logout = async () => api.post<User>('/auth/logout').then((res) => res.data);

export const useLogout = () =>
  useMutation({
    mutationFn: logout,
  });
