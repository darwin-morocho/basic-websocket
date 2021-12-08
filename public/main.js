$(function () {
    const FADE_TIME = 150; // ms
    const TYPING_TIMER_LENGTH = 400; // ms
    const COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];

    const $usernameInput = $('.usernameInput'); // Input for username
    const $button = $('#join');          // The chatroom page

    const socket = new WebSocket("wss://meeduws.herokuapp.com");

    let username = "";
    let connected = false;
    // Focus input when clicking on the message input's border
    $button.click(() => {
        username = $usernameInput.val().trim();
        console.log('username', username);
        if (connected && username != "") {
            socket.send(JSON.stringify({ event: 'join', data: username }));
            $button.fadeOut();
        }
    });

    socket.onmessage = (data) => {
        const message = data.data;
        console.log('ws message', message)
        if (message == "connected") {
            connected = true;
        }
    }





});