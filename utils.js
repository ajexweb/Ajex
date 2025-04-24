// utils.js
function initializeStorage() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('posts')) {
        localStorage.setItem('posts', JSON.stringify([]));
    }
    if (!localStorage.getItem('reels')) {
        localStorage.setItem('reels', JSON.stringify([]));
    }
    if (!localStorage.getItem('messages')) {
        localStorage.setItem('messages', JSON.stringify([]));
    }
    if (!localStorage.getItem('ads')) {
        localStorage.setItem('ads', JSON.stringify([]));
    }
    if (!localStorage.getItem('activity')) {
        localStorage.setItem('activity', JSON.stringify([]));
    }
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function logActivity(userId, action, details) {
    const activity = getData('activity');
    activity.push({
        id: activity.length + 1,
        userId,
        action,
        details,
        timestamp: new Date().toISOString()
    });
    saveData('activity', activity);
}

function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash = ((hash << 5) - hash) + password.charCodeAt(i);
        hash |= 0;
    }
    return hash.toString();
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || { id: null, username: 'guest' };
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

initializeStorage();