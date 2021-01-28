# Configuration Parsers

Blueprint allows the ability to use whatever configuration format the user
wants, this includes JSON, YAML, TOML, INI, etc natively, this is done by providing
a parser and encoding to the `Blueprint` constuctor. It should however be noted that
the configuration object parsed and returned **must** return the same types as the default
JSON parser used when no parser is provided.

```ts
import {parse as parser} from 'yaml';

const bot = new Blueprint('config.yml', {parser});
```

## Important Notes

While you can technically use any format your heart desires, we will only provide support towards
popular or well known formats, such as JSON, YAML, or TOML, and some others. If you for whatever reason
decide to use something obscure such as S-Expressions, or something else strange in the "config world",
then no support will be provided, and you will have to figure out why something isn't working on your
own.
