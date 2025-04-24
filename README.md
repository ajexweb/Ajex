# Futuristic Social Media Web App

A colorful, futuristic, 3D-styled social media web application with a dark/white/black theme, built using HTML, CSS, and JavaScript. All data is stored locally using `localStorage`, with no APIs or third-party dependencies. The app includes features like posting photos/videos, messaging, reels, trending content, and an admin panel for ads, all accessible via a bottom navigation bar.

## Features

- **Layout and Theme**:
  - Colorful, realistic 3D design with gradients, shadows, and animations.
  - Dark, white, black theme for a futuristic look.
  - Bottom navigation with 5 buttons: Home, Search, Upload, Reels, Profile.

- **Home Page**:
  - Displays uploaded photos, videos, and messages (posts) in an Instagram-like format.
  - Shows username, caption, upload time/date, likes, comments, and views (for videos).
  - One user can like a post once; unlimited comments.
  - Scroll to top refreshes and shows new posts.
  - Admin panel access button at top-right.

- **Search Page**:
  - Search posts by caption/username and user profiles by username.
  - Links to posts and profiles.

- **Upload Page**:
  - Upload photos or videos with captions.
  - Items appear on Home, Reels (for videos), and Profile pages.

- **Reels Page**:
  - Displays user-uploaded videos (reels) with views, likes, and comments.
  - Tracks views when videos are played.
  - Shows ads every 20 reels.

- **Profile Page**:
  - Create/edit username, password (hidden), and profile photo.
  - Displays user's uploaded posts.
  - Other users can view profiles (username and posts only).
  - Option to message users from their profile.

- **Message Page**:
  - Search users by username to send messages.
  - Shows sent/received messages, with recent messages at the top.
  - Notifications for new messages.

- **Trending Page**:
  - Displays top-viewed reels.

- **Admin Panel**:
  - Separate page (`admin.html`) for uploading ads.
  - Restricted access with username `2006` and password `2006`.
  - Ads appear every 20 reels.
  - Accessible via a button on the home page (top-right).

- **Data Storage**:
  - All data (users, posts, reels, messages, ads, activity) stored in `localStorage`.
  - Media files use temporary URLs (`URL.createObjectURL`).
  - Activity logs track all user actions (likes, comments, uploads, etc.).

## File Structure

All files are in the root directory (no folders):
- **HTML Files**:
  - `home.html`: Home page with posts and admin panel access.
  - `search.html`: Search page for posts and users.
  - `upload.html`: Upload page for photos/videos.
  - `reels.html`: Reels page with views and ads.
  - `profile.html`: Profile page for user management.
  - `message.html`: Messaging page with notifications.
  - `trending.html`: Trending page for top-viewed reels.
  - `admin.html`: Admin panel for ads.
- **CSS File**:
  - `styles.css`: Futuristic 3D styling with dark/white/black theme.
- **JavaScript Files**:
  - `utils.js`: Common functions for `localStorage` and activity logging.
  - `home.js`: Manages home page posts and refresh.
  - `search.js`: Handles search functionality.
  - `upload.js`: Manages uploads.
  - `reels.js`: Manages reels with views and ads.
  - `profile.js`: Manages user profiles and authentication.
  - `message.js`: Manages messaging and notifications.
  - `trending.js`: Displays trending reels.
  - `admin.js`: Manages admin panel with authentication.

## Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).
- No server or backend required; runs entirely client-side.

## Setup Instructions

1. **Download Files**:
   - Save all files (`home.html`, `search.html`, `upload.html`, `reels.html`, `profile.html`, `message.html`, `trending.html`, `admin.html`, `styles.css`, `utils.js`, `home.js`, `search.js`, `upload.js`, `reels.js`, `profile.js`, `message.js`, `trending.js`, `admin.js`) in a single directory.

2. **Run the App**:
   - Open `home.html` in a web browser.
   - Alternatively, use a local server (e.g., `python -m http.server` or VS Code Live Server) for better file handling.

3. **Initial Setup**:
   - Go to `profile.html` to sign up and create a user account.
   - Log in to access features like uploading, liking, commenting, and messaging.
   - For admin access, go to `admin.html` (via the top-right button on `home.html`) and log in with:
     - Username: `2006`
     - Password: `2006`

## Usage

- **Sign Up/Login**:
  - Visit `profile.html` to create an account or log in.
  - Passwords are hashed client-side and hidden from view.
- **Upload Content**:
  - Use `upload.html` to upload photos or videos with captions.
  - Uploaded items appear on `home.html`, `reels.html` (videos), and `profile.html`.
- **Interact**:
  - Like (once per user) and comment (unlimited) on posts/reels in `home.html` and `reels.html`.
  - Search posts/users in `search.html`.
  - Send messages and view conversations in `message.html`.
- **View Trending**:
  - Check top-viewed reels in `trending.html`.
- **Admin Panel**:
  - Access via the top-right button on `home.html`.
  - Log in with username `2006` and password `2006`.
  - Upload ads, which appear every 20 reels in `reels.html`.

## Data Storage

- All data is stored in the browser's `localStorage`:
  - **Users**: `{ id, username, password (hashed), photo }`
  - **Posts**: `{ id, username, type, content, caption, time, likes, likedBy, comments, views }`
  - **Reels**: Same as posts, for videos.
  - **Messages**: `{ id, from, to, text, time }`
  - **Ads**: `{ id, content, text }`
  - **Activity**: `{ id, userId, action, details, timestamp }`
- Media files use temporary URLs, valid only for the current session.
- To clear data, go to DevTools > Application > Local Storage and clear the site’s data.

## Limitations

- **Media Storage**:
  - Media URLs are temporary and lost on page refresh. Persistent storage requires a backend.
- **Storage Limit**:
  - `localStorage` is limited to 5-10 MB. For larger datasets, use `IndexedDB` or a backend.
- **Security**:
  - `localStorage` is accessible to JavaScript, so sensitive data (e.g., passwords) could be exposed.
  - Admin credentials are hardcoded (username: `2006`, password: `2006`).
- **Scalability**:
  - Not suited for many users or large datasets due to `localStorage` limitations.
- **Multi-Device**:
  - Data is browser-specific and not synced across devices.

## Troubleshooting

- **Media Not Loading**:
  - Ensure files are selected correctly in `upload.html` and `admin.html`.
  - Refresh the page if media URLs expire.
- **Storage Full**:
  - Clear `localStorage` in DevTools or reduce the number of uploads.
- **Admin Access Denied**:
  - Use exact credentials: username `2006`, password `2006`.
- **Features Not Working**:
  - Ensure all files are in the same directory and `utils.js` is loaded before other scripts.

## Future Improvements

- Add a backend (e.g., Node.js, MongoDB) for persistent media storage and scalability.
- Use `IndexedDB` for larger datasets.
- Implement secure authentication with JWT or OAuth.
- Add a page to view activity logs in the UI.
- Enable multi-device data syncing.

## License

This project is for educational purposes and not licensed for commercial use.

## Contact

For questions or suggestions, contact the developer via [email or preferred contact method].
