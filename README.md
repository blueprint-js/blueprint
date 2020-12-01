# Blueprint

![logo](https://siasky.net/CAC_253ClVEp9KkmODOFmsMSWj7NARg2nnV9LRKySRbDrw)  
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/xpyxel/blueprint/dev?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/xpyxel/blueprint?style=flat-square)
![GitHub Repo stars](https://img.shields.io/github/stars/xpyxel/blueprint?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/xpyxel/blueprint?style=flat-square)
![GitHub](https://img.shields.io/github/license/xpyxel/blueprint?style=flat-square)  
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
