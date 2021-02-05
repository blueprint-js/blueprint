export interface HookResponse {
  message: string;
  data: unknown;
}

export type HookCallback = (res: HookResponse) => void;

export class Hookable {
  private hookCallback?: HookCallback;
  constructor() {
    this.hook.bind(this);
    this.unhook.bind(this);
    this.executeHook.bind(this);
  }
  protected executeHook = (res: HookResponse) => this.hookCallback?.(res);
  hook = (callback: HookCallback) => (this.hookCallback = callback);
  unhook = () => (this.hookCallback = undefined);
}

export const bindHooks = (hooks: Hookable[], callback: HookCallback) =>
  hooks.forEach(h => h.hook(callback));

export const unbindHooks = (hooks: Hookable[]) =>
  hooks.forEach(h => h.unhook());
