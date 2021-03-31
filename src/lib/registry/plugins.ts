import {AutoRegistry} from '../class/registry';
import {Plugin} from '../class/plugin';
import {BaseConfig, parseCommandName} from '../util/config';
import {Message, User, GuildMember} from 'discord.js-light';
import {Blueprint, Internals} from '../class/client';

function hasCommand<T extends BaseConfig>(
  name: string,
  plugin: Plugin<T>,
  int: Internals<T>
): boolean {
  return (
    plugin.meta.commands.findIndex(({meta}) => {
      const keys = parseCommandName<T>(name, meta.name, int);
      keys.metaName === keys.name || meta.aliases.includes(keys.metaName);
    }) >= 0
  );
}

export class PluginRegistry<T extends BaseConfig> extends AutoRegistry<
  Plugin<T>
> {
  /**
   * Registers a new plugin
   * @param value The plugin class to register
   */
  register(value: Plugin<T>): void {
    const pluginData = {key: value.meta.name, value};
    this.executeHook({message: 'Register Plugin', data: pluginData});
    this.items.push(pluginData);
  }

  /**
   * Removes an existing plugin
   * @param key The name of the plugin
   */
  unregister(key: string): void {
    const vk = this.items.findIndex(v => v.key === key);
    if (vk > 0) {
      this.items.splice(vk, 1);
      this.executeHook({message: 'Unregister Plugin', data: {index: vk}});
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
    user: User | GuildMember,
    args: Array<string>,
    ref: Blueprint<T>
  ) {
    const plugin = this.items.find(({value}) =>
      hasCommand(cmd, value, ref.core)
    );
    if (plugin) plugin.value.execute(cmd, msg, user, args, ref);
  }
}
