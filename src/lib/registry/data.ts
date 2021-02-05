import {Registry} from '../class/registry';

export class DataRegistry extends Registry<unknown> {
  /**
   * Register a new data entry
   * @param key The key of the data entry
   * @param value The value of the data entry
   */
  register(key: string, value: unknown): void {
    if (!this.items.find(v => v.key === key)) {
      this.items.push({key, value});
      this.executeHook({message: 'Register Data', data: value});
    } else throw new Error('Can not set an already existant value');
  }
  /**
   * Deletes an existing data entry
   * @param key The key of the data entry
   */
  unregister(key: string): void {
    const index = this.items.findIndex(v => v.key === key);
    if (index >= 0) {
      this.items.splice(index, 1);
      this.executeHook({message: 'Unregiste Data', data: {index}});
    } else throw new Error('Can not delete an undefined item');
  }
}
