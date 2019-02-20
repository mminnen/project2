document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#submit_channel').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#channel_name').onkeyup = () => {
    	if (document.querySelector('#channel_name').value.length > 2)
        	document.querySelector('#submit_channel').disabled = false;
        else
        	document.querySelector('#submit_channel').disabled = true;
        }

	if (localStorage.getItem('selected_channel'))
    		{
        		const selected_channel = localStorage.getItem('selected_channel');
        		// Load messages
                load_messages(selected_channel);
					}

    // wait for click on .list class
	document.querySelectorAll(".channel-links").forEach(link => {
            link.onclick = () => {
				const selected_channel = link.dataset.channel;
                localStorage.setItem('selected_channel', selected_channel);
         		// load messages
				// document.querySelector("#message_bar").innerHTML = "This is a test!";
				load_messages(selected_channel);
			}            
		});
});

	function load_messages(selected_channel)  {
		document.querySelector("#message_bar").innerHTML = "Message load dock...";
		const request_messages = new XMLHttpRequest();
        request_messages.open('GET', '/messages');
        request_messages.onload = () => {
              const messages = JSON.parse(request_messages.responseText);
               if (1==1) {
                   alert("success");
                    document.querySelector("#message_bar").innerHTML = "Messages have been received";
                    }
                else {
                    alert("fail");
                    document.querySelector("#message_bar").innerHTML = "There was an error.";
                    }
               return false;
               }	
	}
