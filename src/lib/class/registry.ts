export abstract class Registry<T> {
  protected items: Map<string, T>;
  constructor() {
    this.items = new Map();
  }
  abstract register(key: string, value: T): void;
  abstract unregister(key: string): void;
}
