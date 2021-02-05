import { generateMessage, generateRoles, time } from "./utils.js"
import colorize from "./color.js"
import config from "../config.js"

const removeGET = "\r\u0008\u0008    \n"

class Bot {
  constructor(prefix, commands) {
    this.prefix = prefix
    this.commands = commands

    const roles = generateRoles([
      { name: "BOT", color: "color:blue" }
    ])

    this.name =  `${ roles } ${ colorize("color:yellow", "REPLIT_BOT") }`
  }
  sendMessage(text) {
    text = (this.name + " said: " + text).split('\n')
    const message = `${ removeGET }
╔\n
║ ${ time() } \n
${ generateMessage(text) }
╚\n`
    console.log(decodeURIComponent(encodeURIComponent(message)))
    fetch(`${ config.base }/${ encodeURIComponent(message)}`)
  }
  parseCommand(message) {
    message = message.trim()
    if(message.startsWith(this.prefix)) {
      let args = message.substring(this.prefix.length).split(' ')
      const command = args.pop()
      if(this.commands.hasOwnProperty(command)) {
        const binded = this.commands[command].bind(this)
        binded(args.join(' '))
      }
    }
    return message
  }
}

const bot = new Bot("r-", {
  "pong": function(args) {
    this.sendMessage("ping")
  } 
})

export default bot
export {
  generateRoles
}