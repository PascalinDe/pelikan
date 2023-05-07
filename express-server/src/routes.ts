// third party imports
import express, { Router, Request, Response } from "express";

// library specific imports
import { Config, getConfig } from "./config.js";
import { RawUrl, getRawUrl, postRawUrl } from "./db.js";

export const router: Router = Router();

const config: Config = getConfig();

router.get(
  "/url",
  (req: Request, res: Response) => {
    let rawUrls: RawUrl[] = [];
    getRawUrl(
      config,
      (rows: any[]) => {
        for (let row of rows) {
          rawUrls.push(row);
        }
        res.send(rawUrls);
      }
    );
  }
);
router.post(
  "/url",
  (req: Request, res: Response) => {
    console.log(req.body);
    postRawUrl(config, req.body);
  }
);
