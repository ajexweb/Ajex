// message.js
document.addEventListener('DOMContentLoaded', () => {
    const searchUser = document.getElementById('searchUser');
    const messageList = document.getElementById('messageList');
    const messageInput = document.getElementById('messageInput');
    const currentUser = getCurrentUser();
    const urlParams = new URLSearchParams(window.location.search);
    const toUser = urlParams.get('to');

    if (toUser) {
        searchUser.value = toUser;
    }

    function renderMessages() {
        const messages = getData('messages').filter(m => m.from === currentUser.username || m.to === currentUser.username);
        messageList.innerHTML = '';
        messages.sort((a, b) => new Date(b.time) - new Date(a.time));
        messages.forEach(msg => {
            const div = document.createElement('div');
            div.classList.add('message');
            div.innerHTML = `<p>${msg.from} to ${msg.to}: ${msg.text} (${msg.time})</p>`;
            messageList.appendChild(div);
        });
    }

    window.sendMessage = () => {
        if (!currentUser.id) {
            alert('Please log in to send messages');
            return;
        }
        const text = messageInput.value;
        const toUser = searchUser.value;
        const users = getData('users');
        if (text && toUser && users.find(u => u.username === toUser)) {
            const messages = getData('messages');
            messages.push({
                id: messages.length + 1,
                from: currentUser.username,
                to: toUser,
                text,
                time: new Date().toISOString()
            });
            saveData('messages', messages);
            logActivity(currentUser.id, 'message', `Sent message to ${toUser}: ${text}`);
            messageInput.value = '';
            renderMessages();
            showNotification(`Message sent to ${toUser}`);
        } else {
            alert('User not found');
        }
    };

    function showNotification(text) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = text;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    renderMessages();
});