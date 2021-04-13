import { GlobalPluginData } from "./pluginTypes";

export class GlobalPlugin<T> {
    private readonly plugins: Map<string, GlobalPluginData<T>>;

    constructor(blueprint: GlobalPluginData<T>) {
        this.plugins = new Map<string, GlobalPluginData<T>>();
        this.plugins.set(blueprint.name, blueprint);
    }
}
