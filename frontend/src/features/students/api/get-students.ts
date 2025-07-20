import { api } from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';
import { GetStudentResponse, GetStudentsDto } from '../types';


export const getStudents = async (queries?: GetStudentsDto) =>
  api.get<GetStudentResponse>('/students', { params: queries }).then((res) => res.data);

export const useGetStudents = (queries?: GetStudentsDto) =>
  useQuery({
    queryFn: () => getStudents(queries),
    queryKey: ['students', queries],
  });
