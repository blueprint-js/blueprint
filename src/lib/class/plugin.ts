import {Command} from '@class/command';
import {Registry} from '@class/registry';
import {Member, Message, User} from 'eris';
import {Blueprint} from '@class/client';

/**
 * Groups commands together
 */
export class Plugin extends Registry<Command> {
  /**
   * Registers a new command
   * @param key The name of the command
   * @param value The command class to register
   */
  register(key: string, value: Command): void {
    this.items.set(key, value);
  }
  /**
   * Unregisters an existing command
   * @param key The name of the command
   */
  unregister(key: string): void {
    if (this.items.has(key)) this.items.delete(key);
  }
  /**
   * Checks if the plugin has the command
   * @param key The name of the command
   */
  has(cmd: string): boolean {
    for (const [key, {meta}] of this.items) {
      if (key === cmd || meta.aliases.includes(cmd)) return true;
    }
    return false;
  }
  /**
   * Executes a command if the user has permissions to
   * @param cmd The name of the command
   * @param msg The message context
   * @param user The user to check groups of
   * @param ref The blueprint instance
   */
  execute(cmd: string, msg: Message, user: User | Member, ref: Blueprint) {
    for (const [key, {meta, callback}] of this.items) {
      if (meta.aliases.includes(key) || cmd === key) {
        const ugroups = ref.groups.check(user);
        if (ugroups.some(g => meta.groups.includes(g))) callback(msg, ref);
        break;
      }
    }
  }
}
