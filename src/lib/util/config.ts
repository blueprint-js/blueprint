import {parse} from 'yaml';
import {readFileSync} from 'fs';
import {ClientOptions} from 'eris';

/**
 * The type interface for the bot configuration
 */
export interface Config {
  bot: {token: string; prefix: string; options?: ClientOptions};
}

/**
 * Loads a YAML configuration file
 * @param path The path to a YAML configuration file
 */
export function loadConfig(path: string): Config {
  const data = readFileSync(path, {encoding: 'utf-8'});
  return parse(data);
}
