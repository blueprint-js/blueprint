import {readFileSync} from 'fs';
import {ClientOptions} from 'eris';
import {Configuration as LoggerOptions} from 'log4js';
import {ConnectionOptions} from 'typeorm';

interface BotOptions {
  token: string;
  prefix: string;
  options?: ClientOptions;
}

/**
 * The type interface for the bot configuration
 */
export interface Config {
  bot: BotOptions;
  developers: Array<string>;
  logging?: LoggerOptions;
  database?: ConnectionOptions;
}

/**
 * Loads a JSON configuration file
 * @param path The path to a JSON configuration file
 * @param parser An optional configuration parser
 */
export function loadConfig(path: string, parser?: Function): Config {
  const data = readFileSync(path, {encoding: 'utf-8'});
  return parser?.(data) ?? JSON.parse(data);
}
