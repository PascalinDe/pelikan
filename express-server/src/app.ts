// third party imports
import express, { Express, Request, Response } from "express";

// library specific imports
import { Config, getConfig } from "./config.js";
import { initDatabase } from "./db.js";

const app: Express = express();
const port: number = 2999;
const config: Config = getConfig();
initDatabase(config);

app.get(
  "/",
  (req: Request, res: Response) => {
    res.send("Hello World!");
  }
);
app.listen(
  port,
  () => {
    console.log(`Example app listening on port ${port}`);
  }
);
