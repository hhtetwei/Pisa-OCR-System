import { api } from "@/libs/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createScanJob = async (data: FormData) => {
  return api.post("/scan-jobs", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);
};

export const useCreateScanJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: FormData) => createScanJob(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["scan-jobs"] });
      },
    });
  };
