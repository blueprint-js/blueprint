import {Registry} from '@class/registry';
import {Blueprint} from '@class/client';

type Callback = (...args: Array<unknown>) => unknown;

export class EventRegistry extends Registry<Callback> {
  private ref: Blueprint;
  constructor(ref: Blueprint) {
    super();
    this.ref = ref;
  }
  /**
   * Registers a new event handler
   * @param key The name of the event to listen to
   * @param value The callback to execute when the event is called
   */
  register(key: string, value: Callback): void {
    if (key !== 'messageCreate') {
      this.ref.core.client.on(key, value);
      this.items.set(key, value);
    } else this.items.set(key, value);
  }
  /**
   * Unregisters an existing event handler
   * @param key The name of the event
   */
  unregister(key: string): void {
    if (!this.items.has(key)) return;
    if (key !== 'messageCreate') {
      this.ref.core.client.off(key, this.items.get(key) as Callback);
      this.items.delete(key);
    } else this.items.delete(key);
  }
}
