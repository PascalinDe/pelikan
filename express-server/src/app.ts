// third party imports
import express, { Express, Request, Response } from "express";

// library specific imports
import { Config, getConfig } from "./config.js";
import { initDatabase } from "./db.js";
import { router } from "./routes.js";

const app: Express = express();
app.use("/", router);
const port: number = 2999;
const config: Config = getConfig();
initDatabase(config);

app.listen(
  port,
  () => {
    console.log(`Example app listening on port ${port}`);
  }
);
