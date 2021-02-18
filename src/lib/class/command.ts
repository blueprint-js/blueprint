import {Message} from 'eris';
import {Blueprint} from '../class/client';
import {BaseConfig} from '../util/config';

export interface CommandMeta<T extends BaseConfig> {
  name: string;
  aliases: Array<string>;
  groups: Array<string>;
  guards?: Array<Guard<T>>;
  fail?: (results: GuardResult[]) => void;
}

interface PartialMeta<T extends BaseConfig> {
  aliases: Array<string>;
  groups: Array<string>;
  guards?: Array<Guard<T>>;
  fail?: (results: GuardResult[]) => void;
}

export interface GuardResult {
  passed: boolean;
  message?: string;
}

export type Guard<T extends BaseConfig> = (
  ctx: Message,
  ref: Blueprint<T>
) => GuardResult;

/**
 * Interface used to enforce the callback signature of a command
 */
export abstract class Command<T extends BaseConfig> {
  public readonly meta: CommandMeta<T>;
  constructor(name: string, meta: PartialMeta<T>) {
    this.meta = {name, ...meta};
  }
  abstract callback(ctx: Message, args: Array<string>, ref: Blueprint<T>): void;
}
