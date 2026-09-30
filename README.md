
# TaskFlow — MERN Todo Manager

A full-stack Todo Manager built with the MERN stack, featuring secure authentication, task management, status filtering, and interactive analytics in a responsive dark-themed UI.

## ✨ Features

- User registration, login, and logout
- Protected dashboard and user-specific tasks
- Create, edit, delete, and complete tasks
- Filter tasks by All, Pending, and Completed
- Interactive pie chart for task analytics
- Responsive dark-themed interface

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios, Recharts

**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/TheEarlyCoder/TaskFlow.git
cd TaskFlow
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend (open a new terminal at the project root)
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Use the exact variable names required by your code. Never commit your `.env` file or secrets to GitHub.

### 4. Run the application

Start the backend:

```bash
npm run dev
```

Start the frontend from the project root in a second terminal:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:8000`

## 📸 Screenshot

```markdown
![TaskFlow Dashboard](screenshots/image.png)
```

## 🔮 Future Improvements

- Task priorities and due dates
- Search and sorting
- Improved loading and error states
- Deployment and automated testing

## 👨‍💻 Author

TheEarlyCoder

GitHub: [@TheEarlyCoder](https://github.com/TheEarlyCoder)
