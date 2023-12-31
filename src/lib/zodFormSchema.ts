import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(140, "Maximum of 140 characters"),
  });