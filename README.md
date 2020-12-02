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
import {Blueprint, Permissions, Command, Plugin} from '@xpyxel/blueprint';
const bp = new Blueprint('config.yml');

const ping = new Command(
  {
    groups: ['admin'],
    aliases: ['ping', 'pong', 'test'],
    description: 'Returns "pong!"',
  },
  async ctx => {
    await ctx.channel.createMessage('pong!');
  }
);

const adminPlugin = new Plugin();
adminPlugin.register('ping', ping);
bp.plugins.register('admin', adminPlugin);
bp.groups.register('admin', {
  permissions: [Permissions.administrator, Permissions.manageGuild],
});
bp.events.register('ready', () => {
  console.log('Connected to Discord');
});

blueprint.start();
```
