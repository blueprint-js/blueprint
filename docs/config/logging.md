# Logging Configuration

While Blueprint doesn't necessarily force a specific logger, when the `logging` section is present
in your configuration file, it uses the [log4js](https://github.com/log4js-node/log4js-node) library
due to it's powerful configuration and flexibility. This section unlike the 2 sections detailed in the
[Discord](discord.md) page, is optional and when not specified disables the use of log4js completely,
this allows the use of other loggers via Blueprint's extension system.

## Appenders

[Appenders](https://log4js-node.github.io/log4js-node/appenders.html) are the way log4js outputs messages
to the type of log you want to use, there is many many types of appenders, especially third party ones, but
the most common appender type is the `stdout` appender, which simply outputs log messages to your console or TTY.
It requires no options other than setting the `type` key to `stdout`, while as other types may require additional
configuration.

```json
{
  "logging": {
    "appenders": {
      "default": {
        "type": "stdout"
      }
    }
  }
}
```

## Categories

Categories are a way to group log events, as talked about on [this page](https://log4js-node.github.io/log4js-node/terms.html).
They can use multiple appenders, and can allow you to seperate different log levels into different outputs, which is one primary
reason why Blueprint uses log4js by default. By default log4js looks for a category named `default`, and uses the settings from that.

```json
{
  "logging": {
    "categories": {
      "default": {
        "appenders": ["default"],
        "level": "debug"
      }
    }
  }
}
```
