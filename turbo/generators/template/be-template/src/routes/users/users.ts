import { Hono } from "hono";
import { logger } from "hono/logger";
import { asc, desc, eq, count } from "drizzle-orm";
import { trimTrailingSlash } from "hono/trailing-slash";
import { BACKEND_BINDING } from "@pkg/env/constant";
import { initDB, s } from "@pkg/database/db";
import { zValidator } from "@hono/zod-validator";
import { zodSchema } from "@pkg/database/zod";

const UserRoutes = new Hono<{ Bindings: BACKEND_BINDING }>()
  .get("/", async (c) => {
    const db = initDB();
    const data = await db.select().from(s.user);
    return c.json(data);
  })
  .post("", zValidator("json", zodSchema.userInsertSchema), async (c) => {
    const db = initDB();
    const body: zodSchema.zodUserInsertSchema = await c.req.json();
    const data = await db.insert(s.user).values(body).returning();
    return c.json(data);
  });

export default UserRoutes;
