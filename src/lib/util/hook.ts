export type HookCallback = (message: string) => void;

export class Hookable {
  private hookCallback?: HookCallback;
  hook(callback: HookCallback) {
    this.hookCallback = callback;
  }
  protected executeHook(message: string) {
    this.hookCallback?.(message);
  }
}
