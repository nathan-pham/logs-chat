import markdown from "./libs/markdown.js"
import colorize from "./libs/color.js"
import config from "./config.js"

const { base, user } = config
const roles = generateRoles()
const input = document.getElementById("input")

const sendMessage = (e) => {
  if(e.key == "Enter") {
    let message = input.value
    let toSend = [ 
      time(),
      roles, 
      user.name + ":", 
      markdown(message.trim()), 
      "\n" 
    ]
    //  '\r   \n' + time() + '\n\x1b[1m\x1b[90m'+ user +'\x1b[0m: ' + markdown(answer.replace("\\n","\n")) + '\n'
    if(message.length) {
      fetch(`${ config.base }/${ encodeURIComponent(
        `\r   \n\/ \n${ time() }\n${roles} ${user.name}: ${markdown(message)}`
      ) }`).catch(e => {})
      input.value = ""
    }
  }
}

function generateRoles() {
  let array = []

  user.roles.forEach(role => {
    array.push(
      colorize(role.color, `[[${ role.name }]]`)
    )
  })
  
  return array.join(" ")
}

function time() {
	let today = new Date(),
		date = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0'),
		time = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0')

	return `${date} ${time}\n`
}

input.addEventListener("keydown", sendMessage)
/*
export const config = {
  base: "https://blog.repl.",
  user: {
    name: "Nathaniel#6988",
    roles: [
      { 
        name: "Hacker",
        color: "foreground:red"
      },
      {
        name: "Content Creator",
        color: "foreground:yellow"
      }
    ]
  }
}
 */
// console.log(colorize("background:red", "test"))