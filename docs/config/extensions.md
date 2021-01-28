# Config Extensions

Blueprint has a extension system, on top of this allowing extension
developers to extend the base Blueprint configuration interface, allowing
extension-specific configuration options. This is done by creating a custom
config interface that extends the `BaseConfig` interface, which is then passed
to everything that requires a generic type, which is used to tell the framework
what configuration to use, by default if no configuration type is used, it assumes
you want to use the `BaseConfig`.

## Creating Custom Configs

Creating a custom configuration scheme is fairly simple, as you only need to import
and extend the `BaseConfig` interface, and then use that from then onwards, an example
of how to do this is below.

```ts
import {BaseConfig} from '@dxz/blueprint';

// Sentry.io example extension config
export interface SentryConfig extends BaseConfig {
  sentry: {
    dsn: string;
  }
}
```

## Third Party Config Types

When using an extension that uses a custom config interface, it can often get confusing,
especially when multiple extensions have custom configuration formats, this is easily fixed
by extending the extension configs to combine them into a single type.

```ts
interface FullConfig extends BaseConfig, SentryConfig, OtherExtensionConfig {}

const bot = new Blueprint<FullConfig>('config.json');
```
