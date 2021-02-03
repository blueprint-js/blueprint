import {Member, Message, User} from 'eris';
import {AutoRegistry} from '../class/registry';
import {CommandMeta, Executor} from '../class/command';
import {Blueprint} from '../class/client';
import {BaseConfig} from '../util/config';

type Command = {new (...args: Array<unknown>): unknown};

export class CommandRegistry extends AutoRegistry<Command> {
  /**
   * Registers a new command
   * @param value The command class to register
   */
  register(value: Command): void {
    const meta = Reflect.getMetadata('meta', value.prototype) as CommandMeta;
    const commandData = {key: meta.name, value};
    this.executeHook(`Registering command with data ${commandData}`);
    this.items.push(commandData);
  }

  /**
   * Removes an existing command
   * @param key The name of the command
   */
  unregister(key: string): void {
    const vk = this.items.findIndex(v => v.key === key);
    if (vk > 0) {
      this.executeHook(`Unregistering command with name ${this.items[vk].key}`);
      this.items.splice(vk, 1);
    }
  }

  /**
   * Returns the metadata of a command
   * @param name The name of the command
   */
  meta(name: string): CommandMeta {
    const item = this.items.find(i => i.key === name);
    if (item) return Reflect.getMetadata('meta', item.value.prototype);
    else throw new Error(`Unable to find command with name '${name}'`);
  }

  /**
   * Executes a command if the user has permissions to
   * @param cmd The name of the command
   * @param msg The message context
   * @param user The user to check groups of
   * @param ref The blueprint instance
   */
  execute<T extends BaseConfig>(
    cmd: string,
    msg: Message,
    user: User | Member,
    args: Array<string>,
    ref: Blueprint<T>
  ) {
    for (const {value} of this.items) {
      const meta = Reflect.getMetadata('meta', value.prototype) as CommandMeta;
      if (meta.aliases.includes(cmd) || meta.name === cmd) {
        if (ref.registry.groups.validate(user, meta.groups))
          (new value() as Executor).callback(msg, args, ref);
      }
    }
  }
}
