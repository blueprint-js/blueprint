import {Registry} from '../class/registry';
import {Blueprint} from '../class/client';
import {ClientEvents} from '../util/types';

type Callback = (...args: Array<unknown>) => void;

export class EventRegistry extends Registry<Callback> {
  private readonly ref: Blueprint;

  constructor(ref: Blueprint) {
    super();
    this.ref = ref;
    this.register.bind(this);
    this.ref.core.client.on('messageCreate', msg => {
      if (this.items.has('messageCreate'))
        (this.items.get('messageCreate') as Callback)(this.ref, msg);
      if (msg.author.bot) return;
      if (!msg.content.startsWith(this.ref.core.config.bot.prefix)) return;
      this.ref.commands.execute(
        msg.content
          .replace(this.ref.core.config.bot.prefix, '')
          .split(' ')
          .shift() as string,
        msg,
        msg.member ?? msg.author,
        this.ref
      );
    });
  }

  /**
   * Registers a new event handler
   * @param key The name of the event to listen to
   * @param value The callback to execute when the event is called
   */
  register: ClientEvents<void> = (key: string, value: Function) => {
    const callback = (...args: Array<unknown>) => value(this.ref, ...args);
    if (key !== 'messageCreate') {
      this.ref.core.client.on(key, callback);
      this.items.set(key, callback);
    } else this.items.set(key, value as Callback);
  };

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
