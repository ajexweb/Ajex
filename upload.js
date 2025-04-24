// upload.js
function uploadItem() {
    const fileInput = document.getElementById('uploadFile');
    const caption = document.getElementById('caption').value;
    const currentUser = getCurrentUser();

    if (!currentUser.id) {
        alert('Please log in to upload');
        return;
    }

    if (fileInput.files[0]) {
        const file = fileInput.files[0];
        const type = file.type.startsWith('image') ? 'photo' : 'video';
        const content = URL.createObjectURL(file);
        const posts = getData('posts');
        const reels = type === 'video' ? getData('reels') : [];

        const item = {
            id: posts.length + 1,
            username: currentUser.username,
            type,
            content,
            caption,
            time: new Date().toISOString(),
            likes: 0,
            comments: [],
            views: 0
        };

        posts.push(item);
        saveData('posts', posts);

        if (type === 'video') {
            reels.push({ ...item, id: reels.length + 1 });
            saveData('reels', reels);
        }

        logActivity(currentUser.id, 'upload', `Uploaded ${type}: ${caption}`);
        window.location.href = 'home.html';
    }
}