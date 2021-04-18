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

  protected options: BaseConfig<T>;
  private pluginNames = new Set<string>();

  /**
   * Creates a new Blueprint instance.
   * @param client
   * @param args Arguments for Blueprint
   */
  constructor(client: Client, args: BaseConfig<T>) {
    super();
    this.client = client;
    this.options = args;

    const validatePlugin = (data: AnyPluginData) => {
        if (!data.name) {
            throw new Error(`No plugin name provided!`);
        }

        if (this.pluginNames.has(data.name)) {
            throw new Error(`Duplicate plugin name for plugin ${data.name}`);
        }
    }
  }

  /**
   * Starts the bot and connects to the gateway.
   */
  public async connect() {
    await this.client.login("");
  }

  public disconnect() {
    this.client.destroy();
  }
}
