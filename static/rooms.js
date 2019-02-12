document.addEventListener('DOMContentLoaded', () => {

                // By default, submit button is disabled
                document.querySelector('#submit_channel').disabled = true;

                // Enable button only if there is text in the input field
                document.querySelector('#channel_name').onkeyup = () => {
                    if (document.querySelector('#channel_name').value.length > 2)
                        document.querySelector('#submit_channel').disabled = false;
                    else
                        document.querySelector('#submit_channel').disabled = true;
                };

            });

