// profile.js
document.addEventListener('DOMContentLoaded', () => {
    const profileContent = document.getElementById('profileContent');
    const currentUser = getCurrentUser();
    const urlParams = new URLSearchParams(window.location.search);
    const viewUser = urlParams.get('user');

    function renderProfile(user) {
        const posts = getData('posts').filter(p => p.username === user.username);
        profileContent.innerHTML = `
            <img src="${user.photo || 'default.jpg'}" id="profilePhoto" alt="Profile Photo">
            <h2>${user.username}</h2>
            ${user.id === currentUser.id ? `
                <input type="file" id="profilePhotoInput" accept="image/*">
                <input type="text" id="usernameInput" placeholder="Change username">
                <button onclick="updateProfile()">Update Profile</button>
                <button onclick="logout()">Logout</button>
            ` : `
                <button onclick="messageUser('${user.username}')">Message</button>
            `}
            <div class="user-posts">
                ${posts.map(post => `<div class="post"><img src="${post.content}"><p>${post.caption}</p></div>`).join('')}
            </div>
        `;
    }

    if (!currentUser.id && !viewUser) {
        profileContent.innerHTML = `
            <h3>Login or Sign Up</h3>
            <input type="text" id="loginUsername" placeholder="Username">
            <input type="password" id="loginPassword" placeholder="Password">
            <button onclick="login()">Login</button>
            <button onclick="signup()">Sign Up</button>
        `;
        return;
    }

    if (viewUser) {
        const users = getData('users');
        const user = users.find(u => u.username === viewUser);
        if (user) {
            renderProfile(user);
            logActivity(currentUser.id, 'view_profile', `Viewed profile: ${viewUser}`);
        } else {
            profileContent.innerHTML = '<p>User not found</p>';
        }
        return;
    }

    const users = getData('users');
    const user = users.find(u => u.id === currentUser.id);
    if (user) {
        renderProfile(user);
    }
});

window.updateProfile = () => {
    const photoInput = document.getElementById('profilePhotoInput');
    const usernameInput = document.getElementById('usernameInput');
    const currentUser = getCurrentUser();
    const users = getData('users');
    const user = users.find(u => u.id === currentUser.id);

    if (photoInput.files[0]) {
        user.photo = URL.createObjectURL(photoInput.files[0]);
    }
    if (usernameInput.value && !users.find(u => u.username === usernameInput.value)) {
        user.username = usernameInput.value;
        setCurrentUser({ id: user.id, username: user.username });
    } else if (usernameInput.value) {
        alert('Username taken');
        return;
    }
    saveData('users', users);
    logActivity(currentUser.id, 'update_profile', `Updated profile: ${usernameInput.value || 'photo'}`);
    window.location.reload();
};

window.login = () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = getData('users');
    const user = users.find(u => u.username === username && u.password === hashPassword(password));
    if (user) {
        setCurrentUser({ id: user.id, username: user.username });
        logActivity(user.id, 'login', 'Logged in');
        window.location.reload();
    } else {
        alert('Invalid credentials');
    }
};

window.signup = () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = getData('users');
    if (users.find(u => u.username === username)) {
        alert('Username taken');
        return;
    }
    const newUser = {
        id: users.length + 1,
        username,
        password: hashPassword(password),
        photo: 'default.jpg'
    };
    users.push(newUser);
    saveData('users', users);
    setCurrentUser({ id: newUser.id, username: newUser.username });
    logActivity(newUser.id, 'signup', 'Signed up');
    window.location.reload();
};

window.logout = () => {
    const currentUser = getCurrentUser();
    logActivity(currentUser.id, 'logout', 'Logged out');
    setCurrentUser({ id: null, username: 'guest' });
    window.location.reload();
};

window.messageUser = (username) => {
    window.location.href = `message.html?to=${username}`;
};