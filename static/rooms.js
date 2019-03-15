document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    const username = localStorage.getItem('user');

    document.querySelector('#submit_channel').disabled = true;


        // Enable button only if there is text in the input field
        document.querySelector('#channel_name').onkeyup = () => {
    	if (document.querySelector('#channel_name').value.length > 2)
        	document.querySelector('#submit_channel').disabled = false;
        else
        	document.querySelector('#submit_channel').disabled = true;
        };



	     // wait for click on .list class
	            document.querySelectorAll(".channel-links").forEach(link => {
                    link.onclick = () => {
                        const selected_channel = link.dataset.channel;
                        localStorage.setItem('selected_channel', selected_channel);
                        // need to change to join a room
                        // socket.emit('send message',{'message': 'Howdie', 'room': selected_channel, 'username':username});
                        socket.emit('join', {'room': selected_channel, 'username': username});
                        // socket.emit('send message', {'message': username + ' has joined room ' + selected_channel, 'room': selected_channel, 'username': username});
                        return false;
                    };
                });

	if (localStorage.getItem('selected_channel'))
    		{
            //join the right room straight away
            const selected_channel = localStorage.getItem('selected_channel');
            socket.emit('join', {'room': selected_channel, 'username': username});
		}
	else localStorage.setItem('selected_channel', 'Main Channel');

});
