import {Client} from 'eris';
import {configure, Logger} from 'log4js';
import {Config, loadConfig} from '../util/config';
import {EventRegistry} from '../registry/events';
import {GroupRegistry} from '../registry/groups';
import {PluginRegistry} from '../registry/plugins';
import {Connection, createConnection} from 'typeorm';

interface Internals {
  config: Config;
  client: Client;
  logger?: Logger;
  database?: Connection;
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
  private readonly logger?: Logger;
  private database?: Connection;

  /**
   * Creates a new Blueprint instance
   * @param config A path to a Blueprint configuration file
   */
  constructor(config: string) {
    this.config = loadConfig(config);
    if (this.config.logging)
      this.logger = configure(this.config.logging).getLogger(this.config.name);
    this.client = new Client(this.config.bot.token, this.config.bot.options);
    this.groups = new GroupRegistry(this.config.developers);
    this.plugins = new PluginRegistry(this);
    this.events = new EventRegistry(this);
  }

  /**
   * Returns the internals of the Blueprint instance
   */
  get core(): Internals {
    return {
      config: this.config,
      client: this.client,
      logger: this.logger,
      database: this.database,
    };
  }

  /**
   * Initializes everything and connects to Discord
   */
  async start() {
    if (this.config.database)
      this.database = await createConnection(this.config.database);
    await this.client.connect();
  }
}
