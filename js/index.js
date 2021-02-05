import markdown from "./libs/markdown.js"
import colorize from "./libs/color.js"
import config from "./config.js"

const { base, user } = config
const roles = generateRoles()
const input = document.getElementById("input")

const emoji = new EmojiConvertor()
emoji.replace_mode = "unified"
emoji.allow_native = true

const name = `${ roles } ${ colorize("color:yellow", user.name) }`
const removeGET = "\r\u0008\u0008    \n"

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
    }
  }
}

function generateRoles() {
  let array = []

  user.roles.forEach(role => {
    array.push(
      colorize(role.color, `[${ role.name }]`)
    )
  })
  
  return array.join(" ")
}


function time() {
	let today = new Date(),
		date = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0'),
		time = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0')

	return `${date} ${time}`
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