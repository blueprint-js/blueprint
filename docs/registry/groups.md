# Group Registry

For permissions Blueprint uses a permission group system, grouping
users by what Discord permissions each user has access to, then judging
if they can run commands or not by what groups they are in. This allows users
to have a fairly flexible, yet simplistic and modular permission system, these
groups are made of 3 things: inheritance, permissions, and overrides, as well
as a unique identifier.

## Creating groups

To create a group you use Blueprint's group registry, which manages all the groups
and their properties, as well as checks what groups users are in. This is heavily inspired
by Minecraft permission system plugins such as PermissionsEx, and LuckPerms, and uses dot
notation strings (for example, `messages.read`) to define permssions in a declarative manner.

```ts
bot.registry.groups.register('groupName', {
  /** Group definition here **/
});
```

You can also undefine or remove groups by using the `.unregister()` method likewise

```ts
bot.registry.groups.register('groupName');
```

## Inheritance

Blueprint allows groups to inherit the permissions and overrides of other groups, creating
so-called "compound groups" in the process. This is all done at the registration stage of the bot
and therefor groups are afterwords immutable unless they are reregistered. To inherit a group, you
just need to add a group's name to the `inherits` array in the group definition.

```ts
bot.registry.groups.register('groupName', {
  inherits: ['otherGroup'], 
});
```

## Permissions

For permissions, Blueprint uses a string system somewhat similar to how Minecraft plugins manage permissions,
with dot-notation based strings, an example of this as said before is something similar to `messages.read`, or
`messages.read.history`, among others. A list of permissions and their explanations can be read on the
[permissions page](../permissions.md) for more information. The permissions section of group definitions is
**required** as they are needed to define what groups users are in.

```ts
bot.registry.groups.register('groupName', {
  permissions: [
    'messages.read',
    'messages.read.history',
    'messages.send',
    'nicks.change',
  ],
});
```

## Overrides

Overrides allow users to force specific users or roles into a specific permission group. There are typically
two types of overrides, `user` overrides and `role` overrides. Each one is a simple object containing a `type`
field and an `id` field with the id of the role or user.

```ts
bot.registry.groups.register('groupName', {
  overrides: [
    {type: 'user', id: '333459879379337216'},
  ]
});
```
