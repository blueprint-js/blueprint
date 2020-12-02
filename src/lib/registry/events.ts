import {Client} from 'eris';
import {Registry} from '@class/registry';

type Callback = (...args: Array<unknown>) => unknown;

export class EventRegistry extends Registry<Callback> {
  private client: Client;
  constructor(client: Client) {
    super();
    this.client = client;
  }
  /**
   * Registers a new event handler
   * @param key The name of the event to listen to
   * @param value The callback to execute when the event is called
   */
  register(key: string, value: Callback): void {
    this.client.on(key, value);
    this.items.set(key, value);
  }
  /**
   * Unregisters an existing event handler
   * @param key The name of the event
   */
  unregister(key: string): void {
    if (!this.items.has(key)) return;
    this.client.off(key, this.items.get(key) as Callback);
    this.items.delete(key);
  }
}
