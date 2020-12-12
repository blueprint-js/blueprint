import {Registry} from '../class/registry';
import {Plugin} from '../class/plugin';
import {Blueprint} from '../class/client';
import {Member, Message, User} from 'eris';

export class PluginRegistry extends Registry<Plugin> {
  private readonly blueprint: Blueprint;

  constructor(client: Blueprint) {
    super();
    this.blueprint = client;
  }

  /**
   * Registers a new plugin
   * @param key The name of the plugin
   * @param value The plugin instance
   */
  register(key: string, value: Plugin): void {
    this.items.set(key, value);
  }

  /**
   * Unregisters an existing plugin
   * @param key The name of the plugin
   */
  unregister(key: string): void {
    if (this.items.has(key)) this.items.delete(key);
  }

  /**
   * Attempts to execute a command
   * @param cmd The command to execute
   * @param user The user to execute it with
   * @param msg The message context
   */
  execute(cmd: string, user: User | Member, msg: Message) {
    for (const plugin of this.items.values()) {
      if (plugin.has(cmd)) plugin.execute(cmd, msg, user, this.blueprint);
    }
  }
}
