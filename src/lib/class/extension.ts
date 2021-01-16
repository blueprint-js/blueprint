import {Internals, Registries} from '../class/client';

export type ExtensionType = 'core' | 'registry' | 'full';

export interface ExtensionData {
  core?: Internals;
  registries?: Registries;
}

export interface ExtensionMeta {
  name: string;
  type: ExtensionType;
}

/**
 * Class used to create middleware
 */
export interface Extension extends ExtensionMeta {
  injector(inst: ExtensionData): void;
}
