// trending.js
document.addEventListener('DOMContentLoaded', () => {
    const trendingContainer = document.getElementById('trendingContainer');
    const currentUser = getCurrentUser();

    function renderTrending() {
        const reels = getData('reels');
        trendingContainer.innerHTML = '';
        reels.sort((a, b) => (b.views || 0) - (a.views || 0));
        reels.slice(0, 10).forEach(reel => {
            const reelElement = document.createElement('div');
            reelElement.classList.add('reel');
            reelElement.innerHTML = `
                <video src="${reel.content}" controls></video>
                <p><a href="profile.html?user=${reel.username}">${reel.username}</a>: ${reel.caption}</p>
                <p>Views: ${reel.views}</p>
            `;
            trendingContainer.appendChild(reelElement);
        });
        logActivity(currentUser.id, 'view_trending', 'Viewed trending reels');
    }

    renderTrending();
});