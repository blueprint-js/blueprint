import {Message} from 'eris';
import {Blueprint} from './client';

interface CommandMeta {
  aliases: Array<string>;
  groups: Array<string>;
}

/**
 * Decorator used to define the properties of a command
 * @param meta The metadata to use for the command
 * @constructor
 */
export function Command(meta: CommandMeta) {
  return function (target: Symbol | object) {
    Reflect.defineMetadata('meta', meta, target);
  };
}

/**
 * Abstract class used to enforce the callback signature of a command
 */
export abstract class Executor {
  abstract callback(ctx: Message, ref: Blueprint): void;
}
