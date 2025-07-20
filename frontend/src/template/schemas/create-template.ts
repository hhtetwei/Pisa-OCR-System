import { z } from "zod";

export const templateRegionSchema = z.object({
  regionId: z.string().min(1, "Region ID is required"),
  type: z.enum(["qr_code", "multiple_choice", "short_answer", "math"]),
  coordinates: z.array(z.number()).length(4, "Coordinates must have 4 values [x1, y1, x2, y2]"),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().optional().nullable(),
  optionLabel: z.string().optional(),
});

export const createTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  createdBy: z.string().min(1, "Created by is required"),
  regions: z.array(templateRegionSchema).optional(),
});

export type TemplateRegionDto = z.infer<typeof templateRegionSchema>;
export type CreateTemplateDto = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateDto = CreateTemplateDto;