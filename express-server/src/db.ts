// third party imports
import sqlite3 from "sqlite3";

// library specific imports
import { Config } from "./config";

export interface RawUrl {
  id: number;
  url: string;
  description: string;
  status_code: number;
}

const createTableStatement: string = `
CREATE TABLE IF NOT EXISTS url(
  id INTEGER PRIMARY KEY,
  url TEXT,
  description TEXT,
  status_code INTEGER
);
CREATE TABLE IF NOT EXISTS tag(
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE,
  colour TEXT
);
CREATE TABLE IF NOT EXISTS added_to(
  tag_id INTEGER,
  url_id INTEGER,
  FOREIGN KEY(tag_id) REFERENCES tag(id),
  FOREIGN KEY(url_id) REFERENCES url(id)
);
`;
const selectUrlStatement: string = `SELECT id,url,description,status_code FROM url`;
const insertUrlStatement: string = `
INSERT INTO url (url,description,status_code) VALUES($url,$description,$status_code);
`;

export function initDatabase(config: Config) {
  const connection: sqlite3.Database = new sqlite3.Database(config.databaseFilename);
  connection.exec(createTableStatement);
}

export function getRawUrl(config: Config, callback: Function) {
  const connection: sqlite3.Database = new sqlite3.Database(config.databaseFilename);
  connection.all(
    selectUrlStatement,
    (err: any, rows: any[]) => {
      callback(rows);
    }
  );
}
export function postRawUrl(config: Config, rawUrl: RawUrl) {
  const connection: sqlite3.Database = new sqlite3.Database(config.databaseFilename);
  connection.run(
    insertUrlStatement,
    {
      "$url": rawUrl.url,
      "$description": rawUrl.description,
      "$status_code": rawUrl.status_code
    }
  );
}
