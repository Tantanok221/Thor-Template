import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { s } from "../db/index.js";

export const userInsertSchema = createInsertSchema(s.user)
export const userSelectSchema = createSelectSchema(s.user)
export type zodUserInsertSchema = z.infer<typeof userInsertSchema>
export type zodUserSelectSchema = z.infer<typeof userSelectSchema>

export interface BINDING{
  
}