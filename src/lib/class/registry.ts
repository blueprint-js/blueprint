type RegistryValue<T> = {key: string; value: T};

export abstract class Registry<T> {
  protected items: Array<RegistryValue<T>>;
  constructor() {
    this.items = [];
  }
  item(key: string): T | undefined {
    return this.items.find(v => v.key === key)?.value;
  }
  abstract register(key: string, value: T): void;
  abstract unregister(key: string): void;
}

export abstract class AutoRegistry<T> {
  protected items: Array<RegistryValue<T>>;
  constructor() {
    this.items = [];
  }
  item(key: string): T | undefined {
    return this.items.find(v => v.key === key)?.value;
  }
  abstract register(value: T): void;
  abstract unregister(key: string): void;
}
