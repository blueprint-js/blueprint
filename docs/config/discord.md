# Bot Configuration

Blueprint is based on the [eris](https://github.com/abalabahaha/eris) Discord library.
This allows it to be extremely light-weight and performant, while also providing a solid foundation.
There is 2 sections that are **required** in order for a basic Blueprint-based bot to start at the
minimum. These are the `bot` and `developers` sections, these two sections portain to Discord specific
information such as the bot token, and developer user IDs.

## Bot Settings

The `bot` configuration section defines information about the bot, such as the bot's prefix, token, and options.
It contains 2 required keys (`prefix`, and `token`) and 1 optional key (`options`). The `options` key is an object
containing [eris client options](https://abal.moe/Eris/docs/Client), while as the `prefix` and `token` keys are strings
containing the bot's prefix, and the bot's token obtained from the [developer portal](https://discord.com/developers/applications).

```json
{
  "bot": {
    "prefix": "!",
    "token": "example_token",
    "options": {
      "compress": true
    }
  }
}
```

## Developer List

The `developers` configuration section defines an array or list containing Discord user IDs as strings.
This section is **required** as it used internally to create a immutable `developer` permission group to allow users to
create developer-specific commands, among other functionality.

```json
{
  "developers": [
    "333459879379337216"
  ]
}
```
