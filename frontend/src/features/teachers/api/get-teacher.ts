import { api } from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';
import { GetTeacherDto, GetTeacherResponse } from '../types';


export const getTeachers = async (queries?: GetTeacherDto) =>
  api.get<GetTeacherResponse>('/teachers', { params: queries }).then((res) => res.data);

export const useGetTeachers = (queries?: GetTeacherDto) =>
  useQuery({
    queryFn: () => getTeachers(queries),
    queryKey: ['teachers', queries],
  });
