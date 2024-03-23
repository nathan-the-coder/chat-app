const messageInput = document.getElementById('message-input');
const chatForm = document.getElementById('chat-form');
const messages = document.getElementById('messages');

function addMessage(message, user) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  if (user === 'user') {
    msgDiv.classList.add('user');
  }
  const p = document.createElement('p');
  p.textContent = message;
  msgDiv.appendChild(p);
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight; // Scroll to bottom
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  addMessage(message, 'user');  // Simulate user message
  messageInput.value = '';  // Clear input after sending
  // In a real app, you would send the message to a server here
});

