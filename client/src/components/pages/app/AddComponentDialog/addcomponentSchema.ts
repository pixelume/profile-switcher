import { z } from "zod";

export const cardSchema = z.object({
  type: z.literal("Card"),
  children: z.array(z.any()).min(1),
  title: z.string().min(3),
});

export type CardSchema = z.infer<typeof cardSchema>;

export const dataTableSchema = z.object({
  type: z.string(),
  dataSource: z.string(),
  title: z.string().min(3),
});

export type DataTableSchema = z.infer<typeof dataTableSchema>;

export const textOrListSchema = z.object({
  type: z.string(),
  dataSource: z.string(),
});

export type TextOrListSchema = z.infer<typeof textOrListSchema>;
