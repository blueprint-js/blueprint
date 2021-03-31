import {readFileSync} from 'fs';
import {ClientOptions, Message} from 'discord.js-light';
import {Configuration as LoggerOptions} from 'log4js';
import {Blueprint, Internals} from '../class/client';

export interface BotOptions {
  token: string;
  prefix: string | Array<string>;
  caseInsensitiveCommands?: boolean;
  options?: ClientOptions;
}
/**
 * The type interface for the bot configuration
 */
export interface BaseConfig {
  bot: BotOptions;
  developers: Array<string>;
  logging?: LoggerOptions;
}

export interface PrefixContext<T extends BaseConfig> {
  message: Message;
  ref: Blueprint<T>;
}

export interface InstanceOptions<T extends BaseConfig> {
  prefix?: {
    enabled: boolean;
    load?: (ctx: PrefixContext<T>) => string | Array<string>;
  };
  config?: {parser?: Function; encoding?: BufferEncoding};
}

/**
 * Checks if caseInsensitiveCommands option, and returns the parsed command name.
 * @param key The requested command name.
 * @param value The value provided by the meta.
 */
export function parseCommandName<T extends BaseConfig>(
  name: string,
  metaName: string,
  int: Internals<T>
) {
  const isInsensitive = int.config.bot.caseInsensitiveCommands ?? true;
  return isInsensitive
    ? {
        name: name.toLowerCase(),
        metaName: metaName.toLowerCase(),
      }
    : {
        name,
        metaName,
      };
}

/**
 * Loads a JSON configuration file
 * @param path The path to a JSON configuration file
 * @param options Optional parser configuration
 */
export function loadConfig<T extends BaseConfig>(
  path: string,
  options?: InstanceOptions<T>
): T {
  const data = readFileSync(path, {
    encoding: options?.config?.encoding ?? 'utf-8',
  });
  return options?.config?.parser?.(data) ?? JSON.parse(data);
}
