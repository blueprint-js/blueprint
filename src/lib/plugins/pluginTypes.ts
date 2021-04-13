export interface BasePluginData<T> {
    name: string;
    info?: any;

    commands?: string[];
    events?: string[];
}

export interface GuildPluginData<T> extends BasePluginData<T> {}
export interface GlobalPluginData<T> extends BasePluginData<T> {}
