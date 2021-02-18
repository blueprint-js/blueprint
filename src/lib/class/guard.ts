import {Message} from 'eris';
import {BaseConfig} from '../util/config';
import {Blueprint} from './client';

export interface GuardResult {
  passed: boolean;
  message?: string;
}

export type FailCallback<T extends BaseConfig> = (
  results: GuardResult[],
  ctx: {msg: Message; ref: Blueprint<T>}
) => void;

export type Guard<T extends BaseConfig> = (
  ctx: Message,
  ref: Blueprint<T>
) => GuardResult;
