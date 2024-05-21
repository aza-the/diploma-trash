let chat_history = []

document.getElementById('send-btn').addEventListener('click', sendMessage);

document.getElementById('message-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); 
        sendMessage();
    }
});

function sendMessage() {
    var input = document.getElementById('message-input');
    var message = input.value;
    input.value = ''; 

    if (message.trim() !== '') {
        displayMessage('User: ' + message);
        sendToServer(message);
    }
}

function displayMessage(message) {
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    document.getElementById('message-container').appendChild(messageDiv);
}

function sendToServer(message) {
    const user_chat_message = {
        role: 'user',
        content: message
    };
    chat_history.push(user_chat_message);

    fetch(document.URL + 'chat', {
        method: 'POST',
        body: JSON.stringify(chat_history),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then((response) => response.json())
        .then((json) => {
            const bot_chat_message = {
                role: 'assistant',
                content: json['response'] 
            };
            chat_history.push(bot_chat_message);
            displayMessage('Bot: ' + bot_chat_message.content);
        });

    console.log(chat_history)
}
