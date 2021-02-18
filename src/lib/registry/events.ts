import {Registry} from '../class/registry';
import {Blueprint} from '../class/client';
import {ClientEvents} from '../util/types';
import {BaseConfig, InstanceOptions} from '../util/config';

type Callback = (...args: Array<unknown>) => void;

interface PrefixCacheItem {
  guild: string;
  prefix: string;
}

export class EventRegistry<T extends BaseConfig> extends Registry<Callback> {
  private readonly ref: Blueprint<T>;
  private prefixCache: PrefixCacheItem[];

  constructor(ref: Blueprint<T>, opts?: InstanceOptions<T>) {
    super();
    this.ref = ref;
    this.prefixCache = [];
    this.register.bind(this);
    this.ref.core.client.on('messageCreate', msg => {
      let prefix = this.ref.core.config.bot.prefix;
      const v = this.items.find(v => v.key === 'messageCreate');
      if (v) (v.value as Callback)(this.ref, msg);
      if (msg.author.bot) return;
      if (opts?.prefix?.enabled) {
        const cached = this.prefixCache.find(p => p.guild === msg.guildID);
        if (!cached && opts?.prefix?.load) {
          prefix = opts?.prefix?.load?.({message: msg, ref});
          this.prefixCache.push({guild: msg.guildID as string, prefix});
        } else prefix = cached?.prefix ?? prefix;
      }
      if (!msg.content.startsWith(prefix)) return;
      const [commandName, ...args] = msg.content
        .slice(prefix.length)
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
