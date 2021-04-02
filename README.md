![logo](https://siasky.net/EACyoXDqOUO61hZ7-qnF_DZOs7UJuMUjn7HL7eQeD0XQ7A)  
![GitHub package.json version](https://img.shields.io/github/package-json/v/blueprint-js/blueprint?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/blueprint-js/blueprint?style=flat-square)
![GitHub Repo stars](https://img.shields.io/github/stars/blueprint-js/blueprint?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/blueprint-js/blueprint?style=flat-square)
![GitHub](https://img.shields.io/github/license/blueprint-js/blueprint?style=flat-square)  
A modern, powerful, and modular Discord bot framework.

## Installation

You can install any version after `4.0.0` using the below command:

```bash
npm i blueprint-framework
```

If you want to install a version below `4.0.0`, please install using the legacy repository:

```bash
npm i @dxz/blueprint
```

> Please note that any version **below** 4.0.0 will **not** recieve any security updates or bug fixes.

## Example

Making a bot with Blueprint is meant to be simple, here's a quick example on how to make a small bot using it:
```ts
import { Blueprint, Command, BaseConfig, Plugin } from 'blueprint-framework';

// This instantiates the Blueprint class, and tells Blueprint where our config file is!
const client = new Blueprint('./config.json');

// Let's register a group so users can run the commands we add!
client.registry.groups.register('user', {
  // Makes it so only users with the sendMessages permission can run the ping command.
  permissions: ['messages.send']
});

// Now, to make a simple ping command, we can do this:
class Ping extends Command<BaseConfig> {
  constructor() {
    // The name of our command here
    super('ping', {
      aliases: [],
      groups: []
    });
  }
  
  callback(ctx: CommandContext<BaseConfig>) {
    return ctx.message.channel.send('Pong!');
  }
}

client.registry.plugins.register(
  new Plugin({
    name: 'randomPlugin', // Name of the plugin, name it something besides this!
    // Set's the user group globally throughout the plugin (so we don't need it on every command).
    groups: ['user'],
    commands: [new Ping()], // We add commands to a plugin.
  })
);

// Now, let's register the READY event and start our bot!
client.registry.events.register('ready', () => console.log('READY!'));

client.start();
```

## Official Support

If you need help with contributing to the library or using it, you can join our official [Discord server](https://discord.gg/gcH8rPTGhx).
You will be able to chat with other people that use or contribute to the library, as well talk to the maintainers directly. Do note that
we (the maintainers) do not provide 1-on-1 support for the library.
