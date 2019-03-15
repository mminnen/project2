document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {


        document.querySelector('#send_message').onsubmit = () => {


                    const message = document.querySelector('#message').value;
                    const username = localStorage.getItem('user');
                    const selected_channel = localStorage.getItem('selected_channel');
                    socket.emit('send message', {'message': message, 'username': username, 'room': selected_channel});

                    // console.log('send message', {'message': message, 'username': username, 'room': selected_channel})
                    // console.log(socket.sid);
                    // Clear input field and disable button again
                    document.querySelector('#message').value = '';
                    // document.querySelector('#submit_message').disabled = true;

                    // Do not reload the page
                    return false;
                };

    });

    // When a new message is sent, add to the unordered list
    socket.on('cast message', data => {

        // console.log(data);
        // Substract sid from the data (sid is 32 characters)
        var new_message = data.slice(32);
        // Create new item for list
        const li = document.createElement('li');
        li.innerHTML = new_message;


    // Personal touch: Styling of messages
        // console.log(socket.id);
        // console.log(data.slice(0,32));
        var sid = data.slice(0,32);

       if (sid == socket.id)
          {
              li.className += "list-group-item list-group-item-primary";
          }

       else li.className += "list-group-item list-group-item-info";

       // Write the message to screen
       document.querySelector('#messages').append(li);
    });
});