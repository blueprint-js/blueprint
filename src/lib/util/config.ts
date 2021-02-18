import {readFileSync} from 'fs';
import {ClientOptions} from 'eris';
import {Configuration as LoggerOptions} from 'log4js';
import {ConnectionOptions} from 'typeorm';
export {LoggerOptions, ConnectionOptions, ClientOptions};

export interface BotOptions {
  token: string;
  prefix: string;
  options?: ClientOptions;
}

/**
 * The type interface for the bot configuration
 */
export interface BaseConfig {
  bot: BotOptions;
  developers: Array<string>;
  logging?: LoggerOptions;
  database?: ConnectionOptions | 'external';
}

export interface InstanceOptions {
  config?: {parser?: Function; encoding?: BufferEncoding};
}

/**
 * Loads a JSON configuration file
 * @param path The path to a JSON configuration file
 * @param options Optional parser configuration
 */
export function loadConfig<T extends BaseConfig>(
  path: string,
  options?: InstanceOptions
): T {
  const data = readFileSync(path, {
    encoding: options?.config?.encoding ?? 'utf-8',
  });
  return options?.config?.parser?.(data) ?? JSON.parse(data);
}
