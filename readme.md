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

`joined` when you are into the chat and, then you will be recive the next json as a string
```json
{
    "event": "joined",
    "users": [ "darwin", "dash" ]
}
```

`new_user` when a new user is into the chat and, then you will be recive the next json as a string
```json
{
    "event": "new_user",
    "user": "dash",
    "users": [ "darwin", "dash" ]
}
```

`new_user` when one user has left the chat and, then you will be recive the next json as a string
```json
{
    "event": "left",
    "user": "dash",
    "users": [ "darwin" ]
}
```