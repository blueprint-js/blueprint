import {Member, Message, User} from 'eris';
import {AutoRegistry} from '../class/registry';
import {Command} from '../class/command';
import {Blueprint} from '../class/client';
import {BaseConfig} from '../util/config';

export class CommandRegistry<T extends BaseConfig> extends AutoRegistry<
  Command<T>
> {
  /**
   * Registers a new command
   * @param value The command class to register
   */
  register(value: Command<T>): void {
    const commandData = {key: value.meta.name, value};
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
      if (value.meta.aliases.includes(cmd) || value.meta.name === cmd) {
        if (ref.registry.groups.validate(user, value.meta.groups))
          if (value.meta.guards?.every(g => g(msg, ref) === true) ?? true)
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
}
