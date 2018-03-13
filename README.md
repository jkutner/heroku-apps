# Heroku CLI Clippy

Turns any CLI command into an interactive experience (using AI).

![demo](clippy.gif)

Just add the following to your favorite CLI plugin command:

```javascript
module.exports = {
  ...
  run: cli.command(co.wrap(require('../../clippy').wrap(run)))
}
```
