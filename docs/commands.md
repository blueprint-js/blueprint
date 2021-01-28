# Commands

Blueprint uses 2 seperate things for commands, this is to manage the
complexity that comes with having a custom-built command system, the two things
are a `Command` decorator, and a `Executor` interface. Each providing a important
part of a command. The `Command` decorator is used to set the metadata of the command
such as it's name, aliases, and groups, while the `Executor` interface enforces the
`callback` method used to execute the command.

## `Command` Decorator

The `Command` decorator is used to set the metadata of a command, and consists of
3 required fields: `name`, `aliases`, and `groups`. An example of the use of the decorator
can be seen below with an explanation of each field, and why they are required.

```ts
@Command({
  // used to set the name in the command registry and check against when executing
  name: '',
  // used to check against when executing, similar to name
  aliases: [],
  // the command registry checks if a user is in any of these groups
  groups: [],
})
```

## `Executor` Interface

The `Executor` interface is used to enforce the `callback` method of command classes, all
commands **must** have the `callback` method in order to be a valid command, and must loosely follow
the signature `callback(ctx: Message, args: string[], ref: Blueprint): void` in order to be functional. However, the
the method can be async.

## Creating Commands

Commands are classes implementing the `Executor` interface, and decorated by the `Command`
decorator. In specific, the `Command` decorator consists of an object with 3 keys: `name` which
is a string containing the command's primary alias, `aliases` which is an array of alternate names,
and `groups` which is an array of group names, that you have defined using the [group registry](registry/groups.md).

```ts
@Command({
  name: 'ping',
  aliases: ['latency', 'lag'],
  groups: ['user'],
})
export class PingCommand implements Executor {
  async callback(ctx: Message, args: string[], ref: Blueprint) {
    const startTime = Date.now();
    const msg = await ctx.channel.createMessage('loading...');
    msg.edit('The current ping is `' + (Date.now() - startTime) + 'ms`');
  }
}
```
