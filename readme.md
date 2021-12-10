# A simple websocket for flutter_meedu

web: https://meeduws.herokuapp.com/

ws host `wss://meeduws.herokuapp.com`

## messages

`connected` when the current device has been connected to the socket. Then you need to emit the next json as a string to join to the chat.

```json
{
  "event": "join",
  "data:": "your_username"
}
```

`username_not_available` when the entered username was taken.

`joined` when you are into the chat and, then you will be recive the next json as a string

```json
{
  "event": "joined",
  "users": ["darwin", "dash"]
}
```

`new_user` when a new user is into the chat and, then you will be recive the next json as a string

```json
{
  "event": "new_user",
  "data": {
    "user": "dash",
    "users": ["darwin", "dash"]
  }
}
```

`left` when one user has left the chat and, then you will be recive the next json as a string

```json
{
  "event": "left",
  "data": {
    "user": "dash",
    "users": ["darwin"]
  }
}
```

`new_message` when we have a new message

```json
{
  "event": "new_message",
  "data": {
    "user": "dash",
    "data": "your text"
  }
}
```

`typing` when a user is typing a message in the chat

```json
{
  "event": "typing",
  "data": {
    "user": "dash"
  }
}
```

`stop_typing` when a user has stopped typing a message in the chat

```json
{
  "event": "stop_typing",
  "data": {
    "user": "dash"
  }
}
```
