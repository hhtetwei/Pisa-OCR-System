import { api } from "@/libs";
import { CreateTemplateDto } from "../schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createTemplate = async (data: CreateTemplateDto) => {
    return api.post("/templates", data).then((res) => res.data);
};
  
export const useCreateTemplate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: createTemplate,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["templates"] });
      },
    });
  };
  