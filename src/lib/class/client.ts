import {Client} from 'eris';
import {Config, loadConfig} from '@util/config';
import {EventRegistry} from '@class/events';
import {GroupRegistry} from '@class/groups';

interface Internals {
  config: Config;
  client: Client;
}

/**
 * The core Blueprint client class to manage everything
 */
export class Blueprint {
  private config: Config;
  private client: Client;
  public events: EventRegistry;
  public groups: GroupRegistry;
  /**
   * Creates a new Blueprint instance
   * @param config A path to a Blueprint configuration file
   */
  constructor(config: string) {
    this.config = loadConfig(config);
    this.client = new Client(this.config.bot.token, this.config.bot.options);
    this.events = new EventRegistry(this.client);
    this.groups = new GroupRegistry();
  }
  /**
   * Returns the internals of the Blueprint instance
   */
  get core(): Internals {
    return {config: this.config, client: this.client};
  }
  /**
   * Initializes everything and connects to Discord
   */
  async start() {
    await this.client.connect();
  }
}