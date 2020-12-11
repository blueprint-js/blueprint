import {Client} from 'eris';
import {Config, loadConfig} from '../util/config';
import {EventRegistry} from '../registry/events';
import {GroupRegistry} from '../registry/groups';
import {PluginRegistry} from '../registry/plugins';
import * as log4js from 'log4js';

interface Internals {
  config: Config;
  client: Client;
  logger: log4js.Logger;
}

/**
 * The core Blueprint client class to manage everything
 */
export class Blueprint {
  public events: EventRegistry;
  public groups: GroupRegistry;
  public plugins: PluginRegistry;
  private readonly config: Config;
  private readonly client: Client;
  private readonly logger: log4js.Logger;

  /**
   * Creates a new Blueprint instance
   * @param config A path to a Blueprint configuration file
   */
  constructor(config: string) {
    this.config = loadConfig(config);
    this.client = new Client(this.config.bot.token, this.config.bot.options);
    this.groups = new GroupRegistry(this.config.developers);
    this.plugins = new PluginRegistry(this);
    this.events = new EventRegistry(this);
    this.logger = log4js
      .configure(this.config.logging)
      .getLogger(this.config.bot.name);
  }
  /**
   * Returns the internals of the Blueprint instance
   */
  get core(): Internals {
    return {config: this.config, client: this.client, logger: this.logger};
  }
  /**
   * Initializes everything and connects to Discord
   */
  async start() {
    await this.client.connect();
  }
}
