import { api } from "@/libs";
import { useQuery } from "@tanstack/react-query";

export const getScanJobs = async () => {
    return api.get("/scan-jobs").then((res) => res.data);
};
  
export const useScanJobs = () => {
    return useQuery({
      queryKey: ["scan-jobs"],
      queryFn: () => getScanJobs(),
    });
  };
  