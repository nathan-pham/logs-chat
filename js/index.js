import bot, { generateRoles } from "./libs/bot.js"
import { removeGET, time } from "./libs/utils.js"
import markdown from "./libs/markdown.js"
import colorize from "./libs/color.js"
import config from "./config.js"
const { base, user } = config
const roles = generateRoles(user.roles)
const input = document.getElementById("input")

const emoji = new EmojiConvertor()
emoji.replace_mode = "unified"
emoji.allow_native = true

const name = `${ roles } ${ colorize("color:yellow", user.name) }`

const sendMessage = (e) => {
  if(e.key == "Enter") {
    let message = input.value
    if(message.length) {
      fetch(`${ config.base }/${ encodeURIComponent(
        `${ removeGET }
╔\n
║ ${ time() } \n
║ ${ name } said: ${ markdown(emoji.replace_colons(message)) }
╚\n`
      )}`)
      input.value = ""
      bot.parseCommand(message)
    }
  }
}

input.addEventListener("keydown", sendMessage)

window.onbeforeunload = () => {
  fetch(`${ config.base }/${ encodeURIComponent(
    `${ removeGET } \n${ name } left the chat!`
  )}`)
}

fetch(`${ config.base }/${ encodeURIComponent(
  `${ removeGET } \n${ name } has joined the chat!`
)}`)