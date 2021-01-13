import {AutoRegistry} from '../class/registry';
import {CommandMeta, Executor} from '../class/command';
import {Member, Message, User} from 'eris';
import {Blueprint} from '../class/client';

type Command = {new (...args: Array<unknown>): unknown} & Executor;

export class CommandRegistry extends AutoRegistry<Command> {
  /**
   * Registers a new command
   * @param value The command class to register
   */
  register(value: Command): void {
    const meta = Reflect.getMetadata('meta', value.prototype) as CommandMeta;
    this.items.set(meta.name, new value() as Command);
  }

  /**
   * Removes an existing command
   * @param key The name of the command
   */
  unregister(key: string): void {
    if (this.items.has(key)) this.items.delete(key);
  }

  /**
   * Executes a command if the user has permissions to
   * @param cmd The name of the command
   * @param msg The message context
   * @param user The user to check groups of
   * @param ref The blueprint instance
   */
  execute(cmd: string, msg: Message, user: User | Member, ref: Blueprint) {
    for (const [key, value] of this.items.entries()) {
      const meta = Reflect.getMetadata('meta', value.prototype) as CommandMeta;
      if (meta.aliases.includes(cmd) || key === cmd) {
        const ugroups = ref.groups.check(user);
        if (ugroups.some((g: string) => meta.groups.includes(g)))
          value.callback(msg, ref);
        break;
      }
    }
  }
}
