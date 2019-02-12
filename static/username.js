document.addEventListener('DOMContentLoaded', () => {

                // By default, submit button is disabled
                document.querySelector('#submit').disabled = true;

                document.querySelector('#welcome_message').innerHTML = `Pick a username:`;

                // Enable button only if there is text in the input field
                document.querySelector('#username').onkeyup = () => {
                    if (document.querySelector('#username').value.length > 0)
                        document.querySelector('#submit').disabled = false;
                    else
                        document.querySelector('#submit').disabled = true;
                };

                    if (localStorage.getItem('user'))
				       {
			        //  let username = localStorage.getItem('username');
                        let username = localStorage.getItem('user');
                        document.querySelector('#welcome_message').innerHTML = `Welcome back ${username}!`;
				        }

                    document.querySelector('#form').onsubmit = () => {

                    // Say hello to the user
                    let username = document.querySelector('#username').value;
                    // Store username in local storage
                    localStorage.setItem('user', username);
                    document.querySelector('#welcome_message').innerHTML = `Hello ${username}!`;

                    // Clear input field and disable button again
                    document.querySelector('#username').value = '';
                    document.querySelector('#submit').disabled = true;

                    // Stop form from submitting
                    return false;
                };

            });

