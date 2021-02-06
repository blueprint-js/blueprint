import {AutoRegistry} from './registry';
import {Command} from './command';
import {BaseConfig} from '../util/config';
import {Message, User, Member} from 'eris';
import {Blueprint} from './client';

export interface PluginMeta {
  name: string;
  groups?: string[];
}

export class Plugin<T extends BaseConfig> extends AutoRegistry<Command<T>> {
  public readonly meta: PluginMeta;
  constructor(meta: PluginMeta) {
    super();
    this.meta = meta;
  }

  /**
   * Registers a new command
   * @param value The command class to register
   */
  register(value: Command<T>): void {
    const commandData = {key: value.meta.name, value};
    value.meta.groups = value.meta.groups.concat(this.meta.groups ?? []);
    this.executeHook({message: 'Register Command', data: commandData});
    this.items.push(commandData);
  }

  /**
   * Removes an existing command
   * @param key The name of the command
   */
  unregister(key: string): void {
    const vk = this.items.findIndex(v => v.key === key);
    if (vk > 0) {
      this.items.splice(vk, 1);
      this.executeHook({message: 'Unregister Command', data: {index: vk}});
    }
  }

  /**
   * Executes a command if the user has permissions to
   * @param cmd The name of the command
   * @param msg The message context
   * @param user The user to check groups of
   * @param ref The blueprint instance
   */
  execute(
    cmd: string,
    msg: Message,
    user: User | Member,
    args: Array<string>,
    ref: Blueprint<T>
  ) {
    for (const {value} of this.items) {
      if (
        (value.meta.aliases.includes(cmd) || value.meta.name === cmd) &&
        ref.registry.groups.validate(user, value.meta.groups) &&
        (value.meta.guards?.every(g => g(msg, ref) === true) ?? true)
      ) {
        value.callback(msg, args, ref);
        this.executeHook({
          message: 'Execute Command',
          data: {
            validated: ref.registry.groups.validate(user, value.meta.groups),
            meta: value.meta,
            cmd,
            msg,
            user,
            args,
            ref,
          },
        });
      }
    }
  }

  /**
   * Check if a command exists
   * @param name The name of the command
   */
  has(name: string): boolean {
    if (
      this.items.find(
        ({value}) =>
          value.meta.name === name || value.meta.aliases.includes(name)
      )
    ) {
      return true;
    } else return false;
  }
}
