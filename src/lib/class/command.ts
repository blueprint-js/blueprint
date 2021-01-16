import {Message} from 'eris';
import {Blueprint} from '@class/client';

export interface CommandMeta {
  name: string;
  aliases: Array<string>;
  groups: Array<string>;
}

/**
 * Decorator used to define the properties of a command
 * @param meta The metadata to use for the command
 * @constructor
 */
export function Command(meta: CommandMeta) {
  return function (target: Function) {
    Reflect.defineMetadata('meta', meta, target.prototype);
  };
}

/**
 * Interface used to enforce the callback signature of a command
 */
export interface Executor {
  callback(ctx: Message, ref: Blueprint): void;
}
