export interface BasePluginData {
  name: string;
  info?: any;
}

export interface GuildPluginData<T> extends BasePluginData {
  commands?: any; // TODO: Type
  events?: any; // TODO: Type
}

export interface GlobalPluginData<T> extends BasePluginData {
  commands?: any; // TODO: Type
  events?: any; // TODO: Type
}

export type AnyPluginData = GuildPluginData<any> | GlobalPluginData<any>;
