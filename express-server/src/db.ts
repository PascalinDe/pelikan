// third party imports
import sqlite3 from "sqlite3";

// library specific imports
import { Config } from "./config";

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

export function initDatabase(config: Config) {
  const connection: sqlite3.Database = new sqlite3.Database(config.databaseFilename);
  connection.exec(createTableStatement);
}
