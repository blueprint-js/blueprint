# Event Registry

To manage client events, such as when the bot is ready, or a message is received, Blueprint
uses a event-specific registry allowing a modular yet familiar syntax to create event listeners
when necessary. Note that while you could in theory do all the command handling yourself, the
event registry automatically handles command execution and permission checking.

## Creating events

To create or register an event you use the registry's `register()` method which takes 2 arguments,
the name of the event as a string, as well as a callback to run when the event is triggered. This is
very similar to eris' `client.on` method, and even extends the types used.

```ts
bot.registry.events.register('ready', ({core: {logger}}) => {
  logger?.getLogger('Client').info('Connected to Discord');
});
```

To unregister an event, it follows the same premise as other registries and uses the `unregister()` method
which takes the name of the event to remove.

```ts
bot.registry.events.unregister('ready');
```

## External event callbacks

Due to how the event registry is setup, if you want to use a named function and other methods as a callback and
pass that, it needs to follow the type `ClientEvents<T>`, where `T` in this case is the return type of the callback, in most
cases the return type used will simply be `void` as no return type is needed. While this is completely possible
and allowed, there will be no support provided with this method due to the complexity of getting it to work
properly.
