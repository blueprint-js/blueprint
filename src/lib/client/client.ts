import { Client } from "discord.js-light";
import { BaseConfig } from "./clientTypes";
import {
    BasePluginData,
    GuildPluginData,
    GlobalPluginData,
    AnyPluginData,
} from "../plugins/pluginTypes";
import { EventEmitter } from "events";

export class Blueprint<
  T extends BaseConfig<any> = BaseConfig<BasePluginData>
> extends EventEmitter {
  protected client: Client;

  protected guildPlugins = new Map<string, GuildPluginData<T>>();
  protected globalPlugins = new Map<string, GlobalPluginData<T>>();

  private loadInProgress = new Set<string>();

  protected args: BaseConfig<T>;
  private pluginNames = new Set<string>();
  protected loadedGuilds = new Set<string>();

  /**
   * Creates a new Blueprint instance.
   * @param client
   * @param args Arguments for Blueprint
   */
  constructor(client: Client, args: BaseConfig<T>) {
    super();
    this.client = client;
    this.args = args;

    for (var guildPlugin of args.guildPlugins) {
      this.validatePlugin(guildPlugin);
      this.guildPlugins.set(guildPlugin.name, guildPlugin);
    }

    for (var globalPlugin of args.globalPlugins) {
      this.validatePlugin(globalPlugin);
      this.globalPlugins.set(globalPlugin.name, globalPlugin);
    }
  }

  /**
   * Starts the bot and connects to the gateway.
   */
  public async connect() {
    await this.client.login(this.args.options.token);
  }

  /**
   * Destroys the client and disconnects.
   */
  public disconnect() {
    this.client.destroy();
  }

  private async loadArgs() {

  }

  private validatePlugin(data: AnyPluginData) {
      if (!data.name) throw new Error("No plugin name provided!");

      if (this.pluginNames.has(data.name)) {
          throw new Error(`Duplicate plugin name for plugin ${data.name}`);
      }

      this.pluginNames.add(data.name);
  }

  protected async loadAllGuilds() {
    for (var guild of this.client.guilds.cache.values()) {

    }
  }

  private async loadGuild(id: string) {
    if (this.loadedGuilds.has(id)) return;
    if (!this.client.guilds.cache.has(id)) return;
    if (this.loadInProgress.has((id))) return;

    this.loadInProgress.add(id);

    if (!(await this.args.options.canLoadGuild?.(id))) {
      this.loadInProgress.delete(id);
      return;
    }


  }
}
