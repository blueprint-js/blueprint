import {Member, Message, User} from 'eris';
import {AutoRegistry} from '../class/registry';
import {CommandMeta, Executor} from '../class/command';
import {Blueprint} from '../class/client';

type Command = {new (...args: Array<unknown>): unknown};

export class CommandRegistry extends AutoRegistry<Command> {
  /**
   * Registers a new command
   * @param value The command class to register
   */
  register(value: Command): void {
    const meta = Reflect.getMetadata('meta', value.prototype) as CommandMeta;
    this.items.push({key: meta.name, value});
  }

  /**
   * Removes an existing command
   * @param key The name of the command
   */
  unregister(key: string): void {
    const vk = this.items.findIndex(v => v.key === key);
    if (vk > 0) this.items.splice(vk, 1);
  }

  /**
   * Executes a command if the user has permissions to
   * @param cmd The name of the command
   * @param msg The message context
   * @param user The user to check groups of
   * @param ref The blueprint instance
   */
  execute(cmd: string, msg: Message, user: User | Member, ref: Blueprint) {
    for (const {value} of this.items) {
      const meta = Reflect.getMetadata('meta', value.prototype) as CommandMeta;
      if (meta.aliases.includes(cmd) || meta.name === cmd) {
        if (ref.registry.groups.validate(user, meta.groups))
          (new value() as Executor).callback(msg, ref);
      }
    }
  }
}
