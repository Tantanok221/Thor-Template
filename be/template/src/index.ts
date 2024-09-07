import { Env, Hono } from "hono";
import { logger } from "hono/logger";

import { clerkMiddleware } from "@hono/clerk-auth";
import { trimTrailingSlash } from "hono/trailing-slash";
import { BACKEND_BINDING } from "@pkg/env/constant";
import UserRoutes from "./routes/users/users";

const app = new Hono<{ Bindings: BACKEND_BINDING }>();
// app.use("*", clerkMiddleware());
app.use("*", logger());
app.use("*", trimTrailingSlash());
const routes = app
  .route("/users", UserRoutes)

export type TemplateBackend = typeof routes;

export default {
  /** this part manages cronjobs */
  scheduled(
    event: ScheduledEvent,
    env: {
      DATABASE_URL?: any;
    },
    ctx: ExecutionContext
  ) {
    const delayedProcessing = async () => {
      console.log("CRONJOB EXECUTED");
    };
    ctx.waitUntil(delayedProcessing());
  },
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return app.fetch(request, env, ctx);
  },
  /** this part manages regular REST */
};
