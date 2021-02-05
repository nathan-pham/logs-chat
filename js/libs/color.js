const palette = { black: 0, red: 1, green: 2, yellow: 3, blue: 4, magenta: 5, cyan: 6, white: 7 }

const colorize = (encoded, text) => {
  const [ background, color ] = encoded.split(':')
  return `\x1b[${ background == "background" ? '4' : '3' }${ palette[color] }m${ text }\x1b[0m`
}

export default colorize