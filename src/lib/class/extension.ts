import {Blueprint} from '../class/client';

/**
 * Class used to create middleware
 */
export abstract class Extension {
  abstract injector(inst: Blueprint): void;
}
