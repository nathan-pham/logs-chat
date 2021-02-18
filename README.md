# replit-blog-chat
An implementation of a __logs client for replit. Unfortunately, requests no longer log to the console so this chat application will not work. 

## proposed-standard (REPLITCHAT_V1)

```
GET protocol encrypted-key {
  message: "message",
  room: "global"
}
```

### protocol
refers to the type and version  
delimited by `_`

### encrypted-key
key generated from signed in username 
must be salted with a crypto number in form value

### message
parsing precedence
1. commands (bot integration?)
2. emojis & /shrug
3. markdown

### room 
defaults to "global"
technically all rooms are public

## commands
default prefix !
`list` list all rooms  
`join (room)` join a specific rooms  
`color (color)` change your color name 
`nick (display-name)` change your display name
