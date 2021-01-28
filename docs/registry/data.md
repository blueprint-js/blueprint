# Data Registry

The data registry is a semi-immutable registry in a Blueprint instance used
for extensions to share data or functionality to the user. From a instance or the
`registry` property, you are unable to actually modify or mutate the registry. This
registry is also unique in the sense that already-existing keys can not be changed, this
is to prevent extensions from mutating other extensions data values.

## Obtaining Data

Unlike most registries, you are only able to obtain data from the registry from a user standpoint.
To do this it is a simple call to the `Blueprint.registry.data.get()` method, which takes a key to the
data entry you want to obtain, this key is set by extensions and are not logged or detailed anywhere, so
the extension authors must explain this on their end.

```ts
import {Logger, LogExtension} from 'log-extension';
let logger: Logger;

bot.inject(LogExtension);

bot.registry.events.register('ready', ({registry: {data}}) => {
  logger = data.get('logger') as Logger;
});
```
