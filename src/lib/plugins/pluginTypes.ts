export interface BasePluginData<T> {
    name: string;
    info?: any;
}

export interface GuildPluginData<T> extends BasePluginData<T> {
    commands?: any; // TODO: Type
    events?: any; // TODO: Type
}

export interface GlobalPluginData<T> extends BasePluginData<T> {
    commands?: any; // TODO: Type
    events?: any; // TODO: Type
}
