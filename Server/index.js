// import * as Sentry from "@sentry/node";
import "@shopify/shopify-api/adapters/node";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import Express from "express";
import mongoose from "mongoose";
import path, { resolve } from "path";
import setupCheck from "../utils/setupCheck.js";
import { handleExpressError } from "./backend/helpers/errorUtils.js";
import { logger } from "./backend/services/logger/index.js";

import userRoutes from "./routes/index.js";

setupCheck(); 

const PORT = parseInt(process.env.PORT, 10) || 8081;
const isDev = process.env.NODE_ENV === "dev";
console.log(PORT,'PORT')


const createServer = async (root = process.cwd()) => {
  const app = Express();
  //TODO: update this call being called from all place
  app.use(cors());

  app.disable("x-powered-by");

  logger.init();
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());

  const uploadsDirectory = path.join("./", "server", "backend", "uploads");
  app.use("/uploads", Express.static(uploadsDirectory));



  app.use(Express.json());

  


  app.use("/apps", userRoutes); 

  app.use(async (err, req, res, next) => {
    handleExpressError(err, req, res, next);
  });

  if (!isDev) {
    const compression = await import("compression").then(({ default: fn }) => fn);
    const serveStatic = await import("serve-static").then(({ default: fn }) => fn);
    const fs = await import("fs");

    app.use(compression());
    app.use(serveStatic(resolve("dist/client")));
    app.use("/*", (req, res, next) => {
      res
        .status(200)
        .set("Content-Type", "text/html")
        .send(fs.readFileSync(`${root}/dist/client/index.html`));
    });
  }

  return { app };
};

createServer().then(({ app }) => {
  app.listen(PORT, () => {
    console.log(`--> Running on ${PORT}`);
  });
});
