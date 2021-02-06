import {Registry} from '../class/registry';
import {Blueprint} from '../class/client';
import {ClientEvents} from '../util/types';
import {BaseConfig} from '../util/config';

type Callback = (...args: Array<unknown>) => void;

export class EventRegistry<T extends BaseConfig> extends Registry<Callback> {
  private readonly ref: Blueprint<T>;

  constructor(ref: Blueprint<T>) {
    super();
    this.ref = ref;
    this.register.bind(this);
    this.ref.core.client.on('messageCreate', msg => {
      const v = this.items.find(v => v.key === 'messageCreate');
      if (v) (v.value as Callback)(this.ref, msg);
      if (msg.author.bot) return;
      if (!msg.content.startsWith(this.ref.core.config.bot.prefix)) return;
      const [commandName, ...args] = msg.content
        .slice(this.ref.core.config.bot.prefix.length)
        .trim()
        .split(/\s+/);
      this.ref.registry.plugins.execute(
        commandName,
        msg,
        msg.member ?? msg.author,
        args,
        this.ref
      );
    });
  }

  /**
   * Registers a new event handler
   * @param key The name of the event to listen to
   * @param value The callback to execute when the event is called
   */
  register: ClientEvents<void, T> = (key: string, value: Function) => {
    const callback = (...args: Array<unknown>) => value(this.ref, ...args);
    if (key !== 'messageCreate') {
      this.ref.core.client.on(key, callback);
      this.items.push({key, value: callback});
    } else this.items.push({key, value: value as Callback});
    this.executeHook({message: 'Register Event', data: {key, value}});
  };

  /**
   * Unregisters an existing event handler
   * @param key The name of the event
   */
  unregister(key: string): void {
    if (!this.items.find(v => v.key === key)) return;
    if (key !== 'messageCreate') {
      this.ref.core.client.off(
        key,
        this.items.find(v => v.key === key)?.value as Callback
      );
      this.items.splice(
        this.items.findIndex(v => v.key),
        1
      );
    } else
      this.items.splice(
        this.items.findIndex(v => v.key),
        1
      );
    this.executeHook({message: 'Unregister Event', data: {key}});
  }
}
