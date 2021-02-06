export {
  BaseConfig,
  BotOptions,
  LoggerOptions,
  ClientOptions,
  ConnectionOptions,
} from './lib/util/config';

export {Hook, HookCallback, HookResponse} from './lib/util/hook';
export {Blueprint, Extension, Internals, Registries} from './lib/class/client';
export {Command, CommandMeta, Guard} from './lib/class/command';
export {PermissionString} from './lib/util/permissions';
export {Group, Override} from './lib/registry/groups';
export {Plugin, PluginMeta} from './lib/class/plugin';
export {ClientEvents} from './lib/util/types';
export {Message, User, Member} from 'eris';
export * as TypeORM from 'typeorm';
