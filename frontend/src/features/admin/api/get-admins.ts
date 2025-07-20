import { api } from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';
import { GetAdminDto, GetAdminResponse } from '../types';

export const getAdmins = async (queries?: GetAdminDto) =>
  api.get<GetAdminResponse>('/admins', { params: queries }).then((res) => res.data);

export const useGetAdmins = (queries?: GetAdminDto) =>
  useQuery({
    queryFn: () => getAdmins(queries),
    queryKey: ['admins', queries],
  });
