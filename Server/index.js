import cors from "cors";
import Express from "express";
import mongoose from "mongoose";
import path, { resolve } from "path";
import userRoutes from "./routes/index.js";

const PORT = parseInt(process.env.PORT, 10) || 8081;
const isDev = "dev";
const mongoUrl =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/CreatePaperDB";
mongoose.connect(mongoUrl);

const createServer = async (root = process.cwd()) => {
  const app = Express();
  app.use(cors());
  app.disable("x-powered-by");

  const uploadsDirectory = path.join("./", "server", "backend", "uploads");
  app.use("/uploads", Express.static(uploadsDirectory));
  app.use(Express.json());

  app.use("/apps", userRoutes);

  if (!isDev) {
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );
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