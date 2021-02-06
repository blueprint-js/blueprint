export interface HookResponse {
  message: string;
  data: unknown;
}

export type HookCallback = (res: HookResponse) => void;

export class Hookable {
  private hookCallback?: HookCallback;
  protected executeHook(res: HookResponse) {
    if (this.hookCallback) this.hookCallback(res);
  }
  hook(callback: HookCallback) {
    this.hookCallback = callback;
  }
  unhook() {
    this.hookCallback = undefined;
  }
}

export class Hook {
  private callback: HookCallback;
  constructor(callback: HookCallback) {
    this.callback = callback;
  }
  bind(...hooks: Hookable[]) {
    hooks.forEach(h => h.hook(this.callback));
  }
  unbind(...hooks: Hookable[]) {
    hooks.forEach(h => h.unhook());
  }
}
