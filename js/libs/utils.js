import colorize from "./color.js"

const removeGET = "\r\u0008\u0008    \n"

function time() {
	let today = new Date(),
		date = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0'),
		time = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0')

	return `${date} ${time}`
}

function generateMessage(array) {
  const formatted = array.map(v => {
    return `║ ${v}`
  }).join("\n")
  return formatted.trim()
}

function generateRoles(roles) {
  let array = []

  roles.forEach(role => {
    array.push(
      colorize(role.color, `[${ role.name }]`)
    )
  })
  
  return array.join(" ")
}

export {
  time,
  removeGET,
  generateRoles,
  generateMessage,
}