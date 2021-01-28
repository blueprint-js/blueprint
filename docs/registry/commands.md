# Command Registry

While Blueprint uses a command system written from the ground up, like
most things done in blueprint, they are registered through a registry, however
unlike most registries the command registry does not take 2 arguments, only one,
which is the command's class that you want to register. For more information on creating
commands, read the [commands](../commands.md) page.

## Registering Commands

To register a command you only need to pass a single argument, which is the command's class,
**not an instance of the class**. This is because Blueprint obtains metadata on the class from
decorators, and this data is unobtainable from an instance, instead it manages creating and executing
command classes on its own internally, making it easier on users.

```ts
import PingCommand from './commands/ping';

bot.registry.commands.register(PingCommand);
```

Like the other registries, you can remove or unregister a command by using the `unregister()` method

```ts
bot.registry.commands.register('ping');
```
