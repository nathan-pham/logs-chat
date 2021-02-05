import colorize from "./color.js"

const table = {
  "/shrug": "**¯\\_(ツ)_/¯**",
  "/tableflip":"(╯°□°）╯︵ ┻━┻",
  "/unflip": "┬─┬ ノ( ゜-゜ノ)" 
}

const markdown = msg => {
  const bold = /\*\*(.*)\*\*/gim
  const hidden = /\|\|(.*)\|\|/gim
  const italics = /\*(.*)\*/gim
  const strikethrough = /\~\~(.*)\~\~/gim

  let content = msg

  for(const [key, value] of Object.entries(table)) {
    content = content.replace(new RegExp(key, "gi"), value)
  }

  content = content
    .replace(bold, "[1m$1[22m")
    .replace(italics, "[3m$1[23m")

  let sMatches = content.match(strikethrough) || []
  sMatches.forEach(match => {
    content = content.replace(match, 
      match.substring(2, match.length - 2)
        .split('')
        .map(char => char + "\u0336")
        .join('')
    ) 
  })

  let hMatches = content.match(hidden) || []
  hMatches.forEach(match => {
    content = content.replace(match, colorize("color:black", 
      match.substring(2, match.length - 2)
    ))
  })

  return content.trim()
}

export default markdown