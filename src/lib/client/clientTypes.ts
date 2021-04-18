import { GuildPluginData, GlobalPluginData } from "../plugins/pluginTypes";

export interface BaseConfig<T> {
  guildPlugins: GuildPluginData<T>[];
  globalPlugins: GlobalPluginData<T>[];

  options?: BlueprintOptions;
}

export interface BlueprintOptions {
  canLoadGuild: () => boolean;
}
