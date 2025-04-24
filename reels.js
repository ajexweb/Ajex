// reels.js
document.addEventListener('DOMContentLoaded', () => {
    const reelsContainer = document.getElementById('reelsContainer');
    const currentUser = getCurrentUser();
    let reelCount = 0;

    function renderReels() {
        const reels = getData('reels');
        const ads = getData('ads');
        reelsContainer.innerHTML = '';
 jarvis        reels.forEach(reel => {
            const reelElement = document.createElement('div');
            reelElement.classList.add('reel');
            reelElement.innerHTML = `
                <video src="${reel.content}" controls onplay="incrementView(${reel.id})"></video>
                <p><a href="profile.html?user=${reel.username}">${reel.username}</a>: ${reel.caption}</p>
                <p>Views: ${reel.views}</p>
                <button onclick="likeReel(${reel.id})" ${reel.likedBy?.includes(currentUser.id) ? 'disabled' : ''}>Like (${reel.likes})</button>
                <button onclick="showReelComments(${reel.id})">Comment (${reel.comments.length})</button>
                <div class="comments" id="reel-comments-${reel.id}" style="display: none;">
                    ${reel.comments.map(c => `<p>${c.user}: ${c.text}</p>`).join('')}
                    <input type="text" id="reel-comment-input-${reel.id}" placeholder="Add a comment">
                    <button onclick="addReelComment(${reel.id})">Post</button>
                </div>
            `;
            reelsContainer.appendChild(reelElement);

            reelCount++;
            if (reelCount % 20 === 0 && ads.length > 0) {
                const ad = ads[Math.floor(Math.random() * ads.length)];
                const adElement = document.createElement('div');
                adElement.classList.add('ad');
                adElement.innerHTML = `<img src="${ad.content}"><p>${ad.text}</p>`;
                reelsContainer.appendChild(adElement);
            }
        });
    }

    window.incrementView = (reelId) => {
        const reels = getData('reels');
        const reel = reels.find(r => r.id === reelId);
        reel.views = (reel.views || 0) + 1;
        saveData('reels', reels);
        logActivity(currentUser.id, 'view', `Viewed reel ${reelId}`);
        renderReels();
    };

    window.likeReel = (reelId) => {
        if (!currentUser.id) {
            alert('Please log in to like reels');
            return;
        }
        const reels = getData('reels');
        const reel = reels.find(r => r.id === reelId);
        if (reel && !reel.likedBy?.includes(currentUser.id)) {
            reel.likes = (reel.likes || 0) + 1;
            reel.likedBy = reel.likedBy || [];
            reel.likedBy.push(currentUser.id);
            saveData('reels', reels);
            logActivity(currentUser.id, 'like', `Liked reel ${reelId}`);
            renderReels();
        }
    };

    window.showReelComments = (reelId) => {
        const commentsDiv = document.getElementById(`reel-comments-${reelId}`);
        commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';
    };

    window.addReelComment = (reelId) => {
        if (!currentUser.id) {
            alert('Please log in to comment');
            return;
        }
        const input = document.getElementById(`reel-comment-input-${reelId}`);
        if (input.value) {
            const reels = getData('reels');
            const reel = reels.find(r => r.id === reelId);
            reel.comments.push({ user: currentUser.username, text: input.value });
            saveData('reels', reels);
            logActivity(currentUser.id, 'comment', `Commented on reel ${reelId}: ${input.value}`);
            input.value = '';
            renderReels();
        }
    };

    renderReels();
});