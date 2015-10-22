# required-config
Ensure your config objects contain the required values.

Designed to work with [config](https://www.npmjs.com/package/config). In your `config/default.json` specify your **required config** values by surrounding them with angle brackets `<REQUIRED CONFIG VALUE>`.

You can use `required-config` to check your merged config values were set, not set to "" and not set to null.

## Example

**config/default.json**
```json
{
  "smtp": {
    "host": "<SMTP HOST>",
    "username": "<SMTP USERNAME>",
    "password": "<SMTP PASSWORD>"
  }
}
```

**config/development.json**
```json
{
  "smtp": {
    "host": "smtp://localhost",
    "username": ""
  }
}
```

**app.js**
```js
var requiredConfig = require('requiredConfig')
var config = require('config')
var base = config.util.getConfigSources()[0].parsed

/* config is now:
{
  "smtp": {
    "host": "smtp://localhost",
    "username": "",
    "password": "<SMTP PASSWORD>"
  }
}
*/

requiredConfig(base, config) // Throws!

/*
Error: Configuration value for path smtp.username missing
Error: Configuration value for path smtp.password missing
*/
```
