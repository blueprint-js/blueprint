import { GuildPluginData, GlobalPluginData } from "../plugins/pluginTypes";
import { AsyncOrSync } from "../typings";

export interface BaseConfig<T> {
  guildPlugins: GuildPluginData<T>[];
  globalPlugins: GlobalPluginData<T>[];

  options: BlueprintOptions;
}

export interface BlueprintOptions {
  token: string;
  canLoadGuild?: (guildId: string) => AsyncOrSync<boolean>;
}
