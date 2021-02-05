const markdown = msg => {
  const bold = /\*\*(.*)\*\*/gim
  const strikethrough = /\~\~(.*)\~\~/gim
  const italics = /\*(.*)\*/gim
  return msg
    .replace(bold, '[1m$1[22m')
    .replace(italics, '[3m$1[23m')
    .trim()
}

export default markdown