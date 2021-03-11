import {Client} from 'eris';
import {configure, Log4js} from 'log4js';
import {EventRegistry} from '../registry/events';
import {GroupRegistry} from '../registry/groups';
import {BaseConfig, loadConfig, InstanceOptions} from '../util/config';
import {PluginRegistry} from '../registry/plugins';
import {DataRegistry} from '../registry/data';

export interface Internals<T extends BaseConfig> {
  config: T;
  client: Client;
  logger?: Log4js;
}

export interface Registries<T extends BaseConfig> {
  plugins: PluginRegistry<T>;
  events: EventRegistry<T>;
  groups: GroupRegistry;
  data: {get: (key: string) => unknown};
}

export type Extension<T extends BaseConfig> = (
  core: Internals<T>,
  registry: Registries<T>,
  data: DataRegistry
) => void;

/**
 * The core Blueprint client class to manage everything
 */
export class Blueprint<T extends BaseConfig> {
  private readonly config: T;
  private readonly client: Client;
  private readonly logger?: Log4js;
  private readonly events: EventRegistry<T>;
  private readonly groups: GroupRegistry;
  private readonly plugins: PluginRegistry<T>;
  private readonly data: DataRegistry;

  /**
   * Creates a new Blueprint instance
   * @param config A path to a Blueprint configuration file
   * @param options Optional parser configuration
   */
  constructor(config: string, options?: InstanceOptions<T>) {
    this.inject.bind(this);
    this.config = loadConfig<T>(config, options);
    if (this.config.logging) this.logger = configure(this.config.logging);
    this.client = new Client(this.config.bot.token, this.config.bot.options);
    this.groups = new GroupRegistry(this.config.developers);
    this.events = new EventRegistry(this, options);
    this.plugins = new PluginRegistry();
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
    };
  }

  /**
   * Returns the registries of the client
   */
  get registry(): Registries<T> {
    return {
      events: this.events,
      plugins: this.plugins,
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
    await this.client.connect();
  }

  /**
   * Destroy the Discord connections
   */
  async destroy() {
    this.client.disconnect({reconnect: false});
  }
}
