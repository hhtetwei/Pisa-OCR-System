import { api } from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';



export const getTemplates = async () => {
    return api.get("/templates").then((res) => res.data);
  };
  
  export const useTemplates = () => {
    return useQuery({
      queryKey: ["templates"],
      queryFn: () => getTemplates(),
    });
  };
