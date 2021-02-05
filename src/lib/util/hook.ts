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

export const bindHooks = (hooks: Hookable[], callback: HookCallback) =>
  hooks.forEach(h => h.hook(callback));

export const unbindHooks = (hooks: Hookable[]) =>
  hooks.forEach(h => h.unhook());
