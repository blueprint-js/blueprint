import { GuildPluginData } from "./pluginTypes";

export class GuildPlugin<T> {
    private readonly plugins: Map<string, GuildPluginData<T>>;

    constructor(blueprint: GuildPluginData<T>) {
        this.plugins = new Map<string, GuildPluginData<T>>();
        this.plugins.set(blueprint.name, blueprint);
    }
}
