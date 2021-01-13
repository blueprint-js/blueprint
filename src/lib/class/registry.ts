export abstract class Registry<T> {
  protected items: Map<string, T>;
  constructor() {
    this.items = new Map();
  }
  getItem(key: string): T | null {
    return this.items.get(key) ?? null;
  }
  abstract register(key: string, value: T): void;
  abstract unregister(key: string): void;
}

export abstract class AutoRegistry<T> {
  protected items: Map<string, T>;
  constructor() {
    this.items = new Map();
  }
  getItem(key: string): T | null {
    return this.items.get(key) ?? null;
  }
  abstract register(value: T): void;
  abstract unregister(key: string): void;
}
