const ding = new Audio('./audio/ding.mp3');
const formEl = document.querySelector('form');
const chatEl = document.querySelector('#chat-page');
const inputEl = document.querySelector('.input');
const messagesEl = document.querySelector('.messages');
const buddyEl = document.querySelector('#buddy');
const subjectEl = document.querySelector('#subject');
const connectBtn = document.querySelector('#found-user-modal button');
const reOpenBtn = document.querySelector('#user-left-modal .choices');

const noUserModal = new bootstrap.Modal('#no-user-modal', {
  backdrop: 'static',
  keyboard: false,
});
const foundUserModal = new bootstrap.Modal('#found-user-modal', {
  backdrop: 'static',
  keyboard: false,
});

const socket = io({ autoConnect: false });
const { username, roomStatus } = chatEl.dataset;
const chatId = parseInt(chatEl.dataset.chatId);
const userId = parseInt(chatEl.dataset.userId);
const isActive = chatEl.dataset.isActive == '1';

socket.auth = { chatId, userId, username };

const sendMessage = (event) => {
  event.preventDefault();

  addMessage(inputEl.value, 'self', username);

  socket.emit('chatMessage', {
    message: inputEl.value,
  });

  inputEl.value = '';
  return false;
};

/**
 *
 * @param {string} message Message to display
 * @param {('buddy' | 'self' | 'system', 'System')} sender Who is sending the message
 * @param {string} username Username of sender
 */
const addMessage = (message, sender, username) => {
  const liEl = document.createElement('li');
  const pEl = document.createElement('p');

  liEl.classList.add(sender, 'speech-bubble');
  liEl.innerText = message;

  pEl.innerText = username;
  pEl.classList.add('sender');
  liEl.append(pEl);

  messagesEl.append(liEl);

  liEl.scrollIntoView();
};

const editBuddyCard = (user) => {
  if (user == '') {
    buddyEl.href += user.username;
    buddyEl.dataset.userId = '';
    buddyEl.textContent = '';
  } else {
    buddyEl.href += user.username;
    buddyEl.dataset.userId = user.userId;
    buddyEl.textContent = user.username;
  }
};

socket.on('chatMessage', (data) => {
  addMessage(data.message, 'buddy', data.username);
});

socket.on('userJoin', (data) => {
  editBuddyCard(data);
  addMessage(data.username + ' just joined the chat!', 'system', 'System');
  socket.emit('userJoin', data);
});

socket.on('userLeave', (data) => {
  editBuddyCard('');
  addMessage(data.username + ' has left the chat.', 'system', 'System');
  if (isActive) {
    socket.disconnect();
    addMessage('Page will redirect in a few seconds', 'system', 'System');
    setTimeout(() => {
      document.location.replace('/');
    }, 5000);
  } else {
    addMessage(
      'If you wish to find another user, refresh the page',
      'system',
      'System',
    );
  }
});

socket.connect();
addMessage(
  "You have joined the chat as '" + username + "'.",
  'system',
  'System',
);

if (roomStatus == 'joined') {
  socket.emit('joinRoom');
} else if (roomStatus == 'searching') {
  let searching = true;
  noUserModal.show();

  socket.on('roomCreated', async (data) => {
    if (searching) {
      const response = await fetch('/api/chats/matching');

      if (response.ok) {
        searching = false;
        noUserModal.hide();
        foundUserModal.show();
        ding.play();
      }
    }
  });
} else if (roomStatus == 'created') {
  socket.emit('roomCreated');
}

formEl.addEventListener('submit', sendMessage);
connectBtn.addEventListener('click', () => {
  document.location.replace('/chat');
});
