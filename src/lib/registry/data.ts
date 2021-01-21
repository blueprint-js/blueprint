import {Registry} from '../class/registry';

export class DataRegistry extends Registry<unknown> {
  /**
   * Register a new data entry
   * @param key The key of the data entry
   * @param value The value of the data entry
   */
  register(key: string, value: unknown): void {
    if (!this.items.find(v => v.key === key)) this.items.push({key, value});
    else throw new Error('Can not set an already existant value');
  }
  /**
   * Deletes an existing data entry
   * @param key The key of the data entry
   */
  unregister(key: string): void {
    const index = this.items.findIndex(v => v.key === key);
    if (index >= 0) this.items.splice(index, 1);
    else throw new Error('Can not delete an undefined item');
  }
}
