// search.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const currentUser = getCurrentUser();

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';

        const posts = getData('posts');
        const postResults = posts.filter(p => p.caption.toLowerCase().includes(query) || p.username.toLowerCase().includes(query));
        postResults.forEach(post => {
            const div = document.createElement('div');
            div.classList.add('search-result');
            div.innerHTML = `<a href="home.html#post-${post.id}">${post.username}: ${post.caption}</a>`;
            searchResults.appendChild(div);
        });

        const users = getData('users');
        const userResults = users.filter(u => u.username.toLowerCase().includes(query));
        userResults.forEach(user => {
            const div = document.createElement('div');
            div.classList.add('search-result');
            div.innerHTML = `<a href="profile.html?user=${user.username}">${user.username}</a>`;
            searchResults.appendChild(div);
        });

        logActivity(currentUser.id, 'search', `Searched for: ${query}`);
    });
});