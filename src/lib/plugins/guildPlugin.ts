import { GuildPluginData } from "./pluginTypes";

export class GuildPlugin<T> {
  constructor(blueprint: GuildPluginData<T>) {}
}
