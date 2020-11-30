# Blueprint

![logo](https://siasky.net/CAC_253ClVEp9KkmODOFmsMSWj7NARg2nnV9LRKySRbDrw)  
A modern, powerful, experimental, and modular Discord bot framework

## Example

```ts
import {Blueprint} from '@xpyxel/blueprint';
const blueprint = new Blueprint('config.yml');

blueprint.events.register('ready', () => {
  console.log('Connected to Discord');
});

blueprint.start();
```
