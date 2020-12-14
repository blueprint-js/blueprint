import {parse} from 'yaml';
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
  name: string;
  bot: BotOptions;
  developers: Array<string>;
  logging: LoggerOptions;
  database: ConnectionOptions;
}

/**
 * Loads a YAML configuration file
 * @param path The path to a YAML configuration file
 */
export function loadConfig(path: string): Config {
  const data = readFileSync(path, {encoding: 'utf-8'});
  return parse(data);
}
