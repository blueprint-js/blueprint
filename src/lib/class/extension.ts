import {Internals, Registries} from '@class/client';

export type ExtensionType = 'core' | 'registry' | 'full';

export interface ExtensionData {
  core?: Internals;
  registries?: Registries;
}

/**
 * Class used to create middleware
 */
export interface Extension {
  name: string;
  type: ExtensionType;
  injector(inst: ExtensionData): void;
}
