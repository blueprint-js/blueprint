import {Client} from 'eris';
import {configure, Log4js} from 'log4js';
import {EventRegistry} from '../registry/events';
import {GroupRegistry} from '../registry/groups';
import {BaseConfig, loadConfig, ParserOptions} from '../util/config';
import {CommandRegistry} from '../registry/commands';
import {TypeORM} from '../class/database';
import {DataRegistry} from '../registry/data';

export interface Internals<T> {
  config: T;
  client: Client;
  logger?: Log4js;
  database?: TypeORM;
}

export interface Registries {
  commands: CommandRegistry;
  events: EventRegistry;
  groups: GroupRegistry;
  data: {get: (key: string) => unknown};
}

export type Extension<T> = (
  core: Internals<T>,
  registry: Registries,
  data: DataRegistry
) => void;

/**
 * The core Blueprint client class to manage everything
 */
export class Blueprint<T extends BaseConfig> {
  private readonly config: T;
  private readonly client: Client;
  private readonly logger?: Log4js;
  private readonly database?: TypeORM;
  private readonly events: EventRegistry;
  private readonly groups: GroupRegistry;
  private readonly commands: CommandRegistry;
  private readonly data: DataRegistry;

  /**
   * Creates a new Blueprint instance
   * @param config A path to a Blueprint configuration file
   * @param options Optional parser configuration
   */
  constructor(config: string, options?: ParserOptions) {
    this.inject.bind(this);
    this.config = loadConfig<T>(config, options);
    if (this.config.logging) this.logger = configure(this.config.logging);
    if (this.config.database) this.database = new TypeORM(this.config.database);
    this.client = new Client(this.config.bot.token, this.config.bot.options);
    this.groups = new GroupRegistry(this.config.developers);
    this.commands = new CommandRegistry();
    this.events = new EventRegistry(this);
    this.data = new DataRegistry();
  }

  /**
   * Returns the internals of the Blueprint instance
   */
  get core(): Internals<T> {
    return {
      config: this.config,
      client: this.client,
      logger: this.logger,
      database: this.database,
    };
  }

  /**
   * Returns the registries of the client
   */
  get registry(): Registries {
    return {
      events: this.events,
      commands: this.commands,
      groups: this.groups,
      data: {get: key => this.data.item(key)},
    };
  }

  /**
   * Injects code into the client, similar to middleware
   * @param injection The injection to inject into the client
   */
  inject = (ext: Extension<T>) => ext(this.core, this.registry, this.data);

  /**
   * Initializes everything and connects to Discord
   */
  async start() {
    await this.database?.connect();
    await this.client.connect();
  }

  /**
   * Destroy the database and Discord connections
   */
  async destroy() {
    await this.database?.disconnect();
    this.client.disconnect({reconnect: false});
  }
}
