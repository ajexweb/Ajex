// admin.js
document.addEventListener('DOMContentLoaded', () => {
    const adminContent = document.getElementById('adminContent');
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';

    if (!isAuthenticated) {
        adminContent.innerHTML = `
            <h3>Admin Login</h3>
            <input type="text" id="adminUsername" placeholder="Username">
            <input type="password" id="adminPassword" placeholder="Password">
            <button onclick="adminLogin()">Login</button>
        `;
        return;
    }

    adminContent.innerHTML = `
        <input type="file" id="adFile" accept="image/*,video/*">
        <textarea id="adText" placeholder="Ad description..."></textarea>
        <button onclick="uploadAd()">Upload Ad</button>
        <button onclick="adminLogout()">Logout</button>
        <div id="adList"></div>
    `;

    renderAds();
});

window.adminLogin = () => {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    if (username === '2006' && password === '2006') {
        localStorage.setItem('adminAuthenticated', 'true');
        logActivity(null, 'admin_login', 'Admin logged in');
        window.location.reload();
    } else {
        alert('Invalid admin credentials');
    }
};

window.adminLogout = () => {
    localStorage.setItem('adminAuthenticated', 'false');
    logActivity(null, 'admin_logout', 'Admin logged out');
    window.location.reload();
};

function renderAds() {
    const adList = document.getElementById('adList');
    const ads = getData('ads');
    adList.innerHTML = ads.map(ad => `<div class="ad"><img src="${ad.content}"><p>${ad.text}</p></div>`).join('');
}

window.uploadAd = () => {
    const fileInput = document.getElementById('adFile');
    const text = document.getElementById('adText').value;
    if (fileInput.files[0]) {
        const ads = getData('ads');
        ads.push({
            id: ads.length + 1,
            content: URL.createObjectURL(fileInput.files[0]),
            text
        });
        saveData('ads', ads);
        logActivity(null, 'upload_ad', `Uploaded ad: ${text}`);
        renderAds();
    }
};