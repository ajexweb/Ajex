// home.js
document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('postContainer');
    const currentUser = getCurrentUser();

    function renderPosts() {
        const posts = getData('posts');
        postContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <div class="post-header">
                    <a href="profile.html?user=${post.username}" class="username">${post.username}</a>
                    <span class="time">${post.time}</span>
                </div>
                ${post.type === 'photo' ? `<img src="${post.content}" alt="Post">` : `<video src="${post.content}" controls></video>`}
                <p>${post.caption}</p>
                <div class="post-actions">
                    <button onclick="likePost(${post.id})" ${post.likedBy?.includes(currentUser.id) ? 'disabled' : ''}>Like (${post.likes})</button>
                    <button onclick="showComments(${post.id})">Comment (${post.comments.length})</button>
                    ${post.type === 'video' ? `<span>Views: ${post.views}</span>` : ''}
                </div>
                <div class="comments" id="comments-${post.id}" style="display: none;">
                    ${post.comments.map(c => `<p>${c.user}: ${c.text}</p>`).join('')}
                    <input type="text" id="comment-input-${post.id}" placeholder="Add a comment">
                    <button onclick="addComment(${post.id})">Post</button>
                </div>
            `;
            postContainer.appendChild(postElement);
        });
    }

    window.likePost = (postId) => {
        if (!currentUser.id) {
            alert('Please log in to like posts');
            return;
        }
        const posts = getData('posts');
        const post = posts.find(p => p.id === postId);
        if (post && !post.likedBy?.includes(currentUser.id)) {
            post.likes = (post.likes || 0) + 1;
            post.likedBy = post.likedBy || [];
            post.likedBy.push(currentUser.id);
            saveData('posts', posts);
            logActivity(currentUser.id, 'like', `Liked post ${postId}`);
            renderPosts();
        }
    };

    window.showComments = (postId) => {
        const commentsDiv = document.getElementById(`comments-${postId}`);
        commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';
    };

    window.addComment = (postId) => {
        if (!currentUser.id) {
            alert('Please log in to comment');
            return;
        }
        const input = document.getElementById(`comment-input-${postId}`);
        if (input.value) {
            const posts = getData('posts');
            const post = posts.find(p => p.id === postId);
            post.comments.push({ user: currentUser.username, text: input.value });
            saveData('posts', posts);
            logActivity(currentUser.id, 'comment', `Commented on post ${postId}: ${input.value}`);
            input.value = '';
            renderPosts();
        }
    };

    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            const posts = getData('posts');
            posts.unshift({
                id: posts.length + 1,
                username: currentUser.username || 'guest',
                type: 'photo',
                content: 'default.jpg',
                caption: 'New post!',
                time: new Date().toISOString(),
                likes: 0,
                comments: [],
                views: 0
            });
            saveData('posts', posts);
            logActivity(currentUser.id, 'refresh', 'Refreshed home page');
            renderPosts();
        }
    });

    renderPosts();
});