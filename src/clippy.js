'use strict'

let co = require('co')
let cli = require('heroku-cli-util')

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.wrap = (cmd) => {
  let oldRun = cmd.run
  cmd.run = async (context, heroku) => {
    if (!context.clippy) {
      context.clippy = true
      cli.log(`📎  Hello! It looks like you want to ${cmd.description}. Maybe I can help with that.`)

      for(var i in cmd.flags) {
        let flag = cmd.flags[i]
        if (flag.description) {
          let selected = await cli.prompt(`Would you like to set ${flag.name}? [y/n]`)
          if (selected === 'y') {
            if (flag.hasValue) {
              context.flags[flag.name] = await cli.prompt(capitalizeFirstLetter(flag.description))
            } else {
              let v = await cli.prompt(capitalizeFirstLetter(`${flag.description}?  [y/n]`))
              context.flags[flag.name] = (v === 'y') ? true : false
            }
          }
        }
      }
    }

    return oldRun(context, heroku)
  }
  return cmd
}
