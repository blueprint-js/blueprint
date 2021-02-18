import {Message} from 'eris';
import {Blueprint} from '../class/client';
import {BaseConfig} from '../util/config';
import {Guard, FailCallback} from './guard';

export interface CommandMeta<T extends BaseConfig> {
  name: string;
  aliases: Array<string>;
  groups: Array<string>;
  guards?: Array<Guard<T>>;
  fail?: FailCallback<T>;
}

interface PartialMeta<T extends BaseConfig> {
  aliases: Array<string>;
  groups: Array<string>;
  guards?: Array<Guard<T>>;
  fail?: FailCallback<T>;
}

export interface CommandContext<T extends BaseConfig> {
  message: Message;
  args: Array<string>;
  ref: Blueprint<T>;
}

/**
 * Interface used to enforce the callback signature of a command
 */
export abstract class Command<T extends BaseConfig> {
  public readonly meta: CommandMeta<T>;
  constructor(name: string, meta: PartialMeta<T>) {
    this.meta = {name, ...meta};
  }
  abstract callback(ctx: CommandContext<T>): void;
}
