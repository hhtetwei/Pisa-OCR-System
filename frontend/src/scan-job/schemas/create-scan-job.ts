import { z } from "zod";

export const scanJobSchema = z.object({
  templateId: z.string().min(1, "Template is required"),
  pages: z.number().min(1).max(50),
});

export type CreateScanJobDto = z.infer<typeof scanJobSchema>;