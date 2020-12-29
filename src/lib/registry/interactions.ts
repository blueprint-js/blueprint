import {Registry} from '../class/registry';
import {SlashCreator, SlashCommand, GatewayServer} from 'slash-create';
import {Blueprint} from '../class/client';
import {InteractionOptions} from '../util/config';
import {AnyRequestData} from 'slash-create/lib/constants';

export class InteractionRegistry extends Registry<SlashCommand> {
  private manager: SlashCreator;

  constructor(client: Blueprint) {
    super();
    this.manager = new SlashCreator({
      ...(client.core.config.interactions as InteractionOptions),
      token: client.core.config.bot.token,
    });
    this.manager.withServer(
      new GatewayServer(handler =>
        client.core.client.on('rawWS', event => {
          if (event.t === 'INTERACTION_CREATE')
            handler(event.d as AnyRequestData);
        })
      )
    );
  }

  /**
   * Registers a new slash command
   * @param key The name of the slash command
   * @param value The slash command class
   */
  register(key: string, value: SlashCommand): void {
    if (this.items.get(key)) return;
    this.manager.registerCommand(value);
    this.manager.syncCommands();
    this.items.set(key, value);
  }

  /**
   * Unregisters an existing slash command
   * @param key The name of the slash command
   */
  unregister(key: string): void {
    if (!this.items.get(key)) return;
    this.manager.unregisterCommand(this.items.get(key) as SlashCommand);
    this.manager.syncCommands();
    this.items.delete(key);
  }
}
