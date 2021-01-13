import {Internals} from '../class/client';
import {CommandRegistry} from '../registry/commands';
import {EventRegistry} from '../registry/events';
import {GroupRegistry} from '../registry/groups';

export type ExtensionType = 'core' | 'registry' | 'full';

interface Registries {
  commands: CommandRegistry;
  events: EventRegistry;
  groups: GroupRegistry;
}

export interface ExtensionData {
  core?: Internals;
  registries?: Registries;
}

/**
 * Class used to create middleware
 */
export interface Extension {
  type: ExtensionType;
  injector(inst: ExtensionData): void;
}
