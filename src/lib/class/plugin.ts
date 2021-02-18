import {Command} from './command';
import {BaseConfig} from '../util/config';
import {Message, User, Member} from 'eris';
import {Blueprint} from './client';

export interface PluginMeta<T extends BaseConfig> {
  name: string;
  groups?: string[];
  commands: Command<T>[];
}

export class Plugin<T extends BaseConfig> {
  public readonly meta: PluginMeta<T>;
  constructor(meta: PluginMeta<T>) {
    this.meta = meta;
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
    const command = this.meta.commands.find(
      c => c.meta.aliases.includes(cmd) || c.meta.name === cmd
    );
    if (!command) return;
    if (!ref.registry.groups.validate(user, command.meta.groups)) return;
    const guards = command.meta.guards;
    if (guards && guards.length > 0) {
      const results = guards.map(g => g(msg, ref));
      if (!results.every(r => r.passed === true)) {
        command.meta.fail?.(results, {msg, ref});
        return;
      }
    }
    command.callback({message: msg, args, ref});
  }
}
