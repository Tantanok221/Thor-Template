import { Hono } from "hono";
import { logger } from "hono/logger";
import { asc, desc, eq, count } from "drizzle-orm";
import { trimTrailingSlash } from "hono/trailing-slash";
import { BACKEND_BINDING } from "@pkg/env/constant";
import { initDB, s } from "@pkg/database/db";

const UserRoutes = new Hono<{ Bindings: BACKEND_BINDING }>();

UserRoutes.get("/", async (c) => {
  const db = initDB();
  const data = await db.select().from(s.user);
  return c.json(data);
});

export default UserRoutes;
