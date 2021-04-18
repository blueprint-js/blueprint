import { GlobalPluginData } from "./pluginTypes";
import { BaseConfig } from "../client/clientTypes";

const plugins = new Map<string, GlobalPluginData<BaseConfig<any>>>();

export class GlobalPlugin<T> {
  constructor(blueprint: GlobalPluginData<T>) {
    plugins.set(blueprint.name, blueprint);
  }
}
