import {Blueprint} from '../class/client';

export abstract class Extension {
  abstract injector(inst: Blueprint): void;
}
