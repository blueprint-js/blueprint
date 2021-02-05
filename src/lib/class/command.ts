import {Message} from 'eris';
import {Blueprint} from '../class/client';
import {BaseConfig} from '../util/config';

export interface CommandMeta {
  name: string;
  aliases: Array<string>;
  groups: Array<string>;
}

/**
 * Interface used to enforce the callback signature of a command
 */
export abstract class Command<T extends BaseConfig> {
  public readonly meta: CommandMeta;
  constructor(
    name: string,
    meta: {aliases: Array<string>; groups: Array<string>}
  ) {
    this.meta = {name, ...meta};
  }
  abstract callback(ctx: Message, args: Array<string>, ref: Blueprint<T>): void;
}
