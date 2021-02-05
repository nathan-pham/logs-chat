const markdown = msg => {
  const bold = /\*\*(.*)\*\*/gim
  const strikethrough = /\~\~(.*)\~\~/gim
  const italics = /\*(.*)\*/gim

  let content = msg
    .replace(bold, "[1m$1[22m")
    .replace(italics, "[3m$1[23m")

  let matches = content.match(strikethrough) || []
  matches.forEach(match => {
    content = content.replace(match, 
      match.substring(2, match.length - 2)
        .split('')
        .map(char => char + "\u0336")
        .join('')
    ) 
  })

  return content.trim()
}

export default markdown