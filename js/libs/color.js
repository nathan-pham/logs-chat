const palette = { black: 0, red: 1, green: 2, yellow: 3, blue: 4, magenta: 5, cyan: 6, white: 7 }

/*
Black            \e[0;30m
Blue             \e[0;34m
Green            \e[0;32m
Cyan             \e[0;36m
Red              \e[0;31m
Purple           \e[0;35m
Brown            \e[0;33m
Gray             \e[0;37m
Dark Gray        \e[1;30m
Light Blue       \e[1;34m
Light Green      \e[1;32m
Light Cyan       \e[1;36m
Light Red        \e[1;31m
Light Purple     \e[1;35m
Yellow           \e[1;33m
White            \e[1;37m
 */

const colorize = (encoded, text) => {
  let matches = encoded.split(",")
  let colors = []
  
  matches.forEach(match => {
    const [ type, color, bright ] = match.trim().split(':')

    const escapedColor = "\x1b" 
      + (bright == "alt" ? "[1;" : '[0;') 
      + (type == "background" ? '4' : '3')
      + palette[color]
      + "m"
    
    colors.push(escapedColor)
  })

  return colors.join(' ') + text + "\x1b[0m"
}

export default colorize