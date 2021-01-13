import {Client} from 'eris';
import {configure, Log4js} from 'log4js';
import {Config, loadConfig} from '../util/config';
import {EventRegistry} from '../registry/events';
import {GroupRegistry} from '../registry/groups';
import {CommandRegistry} from '../registry/commands';
import {TypeORM} from './database';
import {Extension} from './extension';

export interface Internals {
  config: Config;
  client: Client;
  logger?: Log4js;
  database?: TypeORM;
  extensions: Set<Extension>;
}

/**
 * The core Blueprint client class to manage everything
 */
export class Blueprint {
  public events: EventRegistry;
  public groups: GroupRegistry;
  public commands: CommandRegistry;
  private readonly config: Config;
  private readonly client: Client;
  private readonly logger?: Log4js;
  private readonly database?: TypeORM;
  private readonly extensions: Set<Extension>;

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

  inject(ext: Extension): void {
    this.extensions.add(ext);
    switch (ext.type) {
      case 'core':
        ext.injector({core: this.core});
        break;
      case 'registry':
        ext.injector({
          registries: {
            events: this.events,
            groups: this.groups,
            commands: this.commands,
          },
        });
        break;
      case 'full':
        ext.injector({
          core: this.core,
          registries: {
            events: this.events,
            groups: this.groups,
            commands: this.commands,
          },
        });
        break;
    }
  }

  /**
   * Initializes everything and connects to Discord
   */
  async start() {
    await this.database?.connect();
    await this.client.connect();
  }
}
