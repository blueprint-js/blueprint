import {Executor} from './command';
import {Registry} from './registry';
import {Member, Message, User} from 'eris';
import {Blueprint} from './client';

/**
 * Groups commands together
 */
export class Plugin extends Registry<Executor> {
  /**
   * Registers a new command
   * @param key The name of the command
   * @param value The command class to register
   */
  register(key: string, value: Executor): void {
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
   * @param cmd The name of the command
   */
  get(cmd: string): string | null {
    for (const [key, executor] of this.items.entries()) {
      const meta = Reflect.getMetadata('meta', executor);
      if (key === cmd || meta.aliases.includes(cmd)) return key;
    }
    return null;
  }

  /**
   * Executes a command if the user has permissions to
   * @param cmd The name of the command
   * @param msg The message context
   * @param user The user to check groups of
   * @param ref The blueprint instance
   */
  execute(cmd: string, msg: Message, user: User | Member, ref: Blueprint) {
    for (const [key, executor] of this.items.entries()) {
      const meta = Reflect.getMetadata('meta', executor);
      if (meta.aliases.includes(key) || cmd === key) {
        const userGroups = ref.groups.check(user);
        if (userGroups.some((g: string) => meta.groups.includes(g)))
          executor.callback(msg, ref);
        break;
      }
    }
  }
}
