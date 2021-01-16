import {Client} from 'eris';
import {configure, Log4js} from 'log4js';
import {Config, loadConfig} from '@util/config';
import {EventRegistry} from '@registry/events';
import {GroupRegistry} from '@registry/groups';
import {CommandRegistry} from '@registry/commands';
import {Extension, ExtensionMeta} from '@class/extension';
import {TypeORM} from '@class/database';

export interface Internals {
  config: Config;
  client: Client;
  logger?: Log4js;
  database?: TypeORM;
  extensions: Set<ExtensionMeta>;
}

export interface Registries {
  commands: CommandRegistry;
  events: EventRegistry;
  groups: GroupRegistry;
}

/**
 * The core Blueprint client class to manage everything
 */
export class Blueprint {
  private readonly events: EventRegistry;
  private readonly groups: GroupRegistry;
  private readonly commands: CommandRegistry;
  private readonly config: Config;
  private readonly client: Client;
  private readonly logger?: Log4js;
  private readonly database?: TypeORM;
  private readonly extensions: Set<ExtensionMeta>;

  /**
   * Creates a new Blueprint instance
   * @param config A path to a Blueprint configuration file
   */
  constructor(config: string) {
    this.config = loadConfig(config);
    if (this.config.logging) this.logger = configure(this.config.logging);
    if (this.config.database) this.database = new TypeORM(this.config.database);
    this.client = new Client(this.config.bot.token, this.config.bot.options);
    this.groups = new GroupRegistry(this.config.developers);
    this.commands = new CommandRegistry();
    this.events = new EventRegistry(this);
    this.extensions = new Set();
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
      extensions: this.extensions,
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
    };
  }

  inject(ext: Extension): void {
    ext.injector({
      core: ext.type !== 'registry' ? this.core : undefined,
      registries: ext.type !== 'core' ? this.registry : undefined,
    });
    this.extensions.add({name: ext.name, type: ext.type});
  }

  /**
   * Initializes everything and connects to Discord
   */
  async start() {
    await this.database?.connect();
    await this.client.connect();
  }
}
