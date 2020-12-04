import {Registry} from '../class/registry';
import {Blueprint} from '../class/client';
import {ClientEvents} from '../util/types';

export class EventRegistry extends Registry<Function> {
  private ref: Blueprint;
  constructor(ref: Blueprint) {
    super();
    this.ref = ref;
    this.register.bind(this);
    this.ref.core.client.on('messageCreate', msg => {
      if (this.items.has('messageCreate'))
        (this.items.get('messageCreate') as Function)(this.ref, msg);
      if (msg.author.bot) return;
      if (!msg.content.startsWith(this.ref.core.config.bot.prefix)) return;
      this.ref.plugins.execute(
        msg.content
          .replace(this.ref.core.config.bot.prefix, '')
          .split(' ')
          .shift() as string,
        msg.member ?? msg.author,
        msg
      );
    });
  }
  /**
   * Registers a new event handler
   * @param key The name of the event to listen to
   * @param value The callback to execute when the event is called
   */
  register: ClientEvents<void> = (key: string, value: Function) => {
    if (key !== 'messageCreate') {
      this.ref.core.client.on(key, (...args: Array<unknown>) =>
        value(this.ref, args)
      );
      this.items.set(key, value);
    } else this.items.set(key, value);
  };
  /**
   * Unregisters an existing event handler
   * @param key The name of the event
   */
  unregister(key: string): void {
    if (!this.items.has(key)) return;
    if (key !== 'messageCreate') {
      this.ref.core.client.off(key, (...args: Array<unknown>) =>
        (this.items.get(key) as Function)(this.ref, args)
      );
      this.items.delete(key);
    } else this.items.delete(key);
  }
}
