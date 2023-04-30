// standard library imports
import { readFileSync, writeFileSync } from "fs";

export interface Config {}

/** Default backend application configuration. */
const defaultConfig: Config = {};
/** Configuration filename. */
const configFilename: string = "./config.json"

/** Load backend application configuration.
 *
 * @returns {Config} backend application configuration
 */
export function getConfig(): Config {
  try {
    return JSON.parse(readFileSync(configFilename, "utf-8"));
  } catch(err: any) {
    if (err.code !== "ENOENT") {
      throw err;
    }
    // generate config file if not exists
    writeFileSync(configFilename, JSON.stringify(defaultConfig), "utf-8");
    console.log(`Default configuration file ${configFilename} has been generated.`);
    return defaultConfig;
  }
}
