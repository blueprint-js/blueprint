# Extensions

Extensions are a way for developers to share 'injectable' snippets of code
to extend the functionality of the Blueprint library, without the functionality
having to be implemented into the library itself. Extensions consist of a function
that takes 3 arguments, `core` which is access to the instance's internals, `registry`
which gives access to the normal registries users have access to, and `data` which grants
writable access to the [data registry](registry/data.md), these functions can be async or
synchronous, but always return `void`.

## Creating Extensions

To create an extension it is fairly simple, you want to import the `Extension` type from
Blueprint, and then use it as the type for a function, the function can be an arrow (bound)
function, or a function with a `this` context.

```ts
import {Extension} from '@dxz/blueprint';

const extension: Extension = (core, registry, data) => {
  registry.events.register('ready', ({core: {logger}}) => {
    logger?.getLogger('Extension').debug('Successfully Injected!');
  });
};

export default extension;
```

## Using Extensions

To use an extension, it simply needs to be injected using a instance's `inject` method. This
method executes the code inside the extension's function or callback, and essentially does as it
is named, "injects" the code into the Blueprint instance.

!!! warning
    Extensions can be dangerous due to how they work, extensions can erase existing events
    and other things without your knowledge, and could even stealthily inject malicious code without knowledge.

```ts
import {ExampleExtension} from 'example-ext';

bot.inject(ExampleExtension);
```

## Passing Data To Users

In order to provide a one-way method of providing data or functions to the user of the extension, the [data registry](registry/data.md)
is used. While immutable from a user standpoint, the registry can be mutated from extensions, as stated in the page as well, values are
also immutable, in order to be changed they need to be **re-registered**.

```ts
const extension: Extension = (core, registry, data) => {
  // example passing a 'something' key to users.
  data.register('something', 12);
};
```
