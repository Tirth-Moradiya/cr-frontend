# Assignment

## Description
A brief description of the project, including its purpose and functionality.

## Features
- User authentication (Google Sign-In)
- CRUD operations for posts (Add, Update, Delete)
- Responsive dashboard with tab navigation
- Toast notifications for user feedback

## Technologies Used
- React.js
- Tailwind CSS
- Firebase Authentication
- Axios
- React Toastify
- Lucide Icons

## Installation & Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Clone the Repository
```sh
git clone https://github.com/Tirth-Moradiya/cr-frontend.git
cd your-repo-name
```

### Install Dependencies
Using npm:
```sh
npm install
```
Using yarn:
```sh
yarn install
```

### Environment Variables
Create a `.env` file in the root directory and add the following:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Start the Development Server
Using npm:
```sh
npm start
```
Using yarn:
```sh
yarn start
```

### Build for Production
```sh
npm run build
```

## Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one.
3. Enable **Google Authentication** under Authentication → Sign-in method.
4. Add your domain (`capitalrush-assignment.firebaseapp.com`) under **Authorized domains**.
5. Copy your Firebase configuration and add it to the `.env` file as shown above.

## Usage
- Click **Sign in with Google** to authenticate.
- Use the **Add, Update, and Delete** tabs to manage posts.
- View real-time updates with Toast notifications.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any issues or questions, please contact tirthmoradiya02@gmail.com.

