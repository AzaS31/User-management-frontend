# Frontend - User Management

This is the frontend for the User Management project, built with **React**, **React Router v7**, **Bootstrap 5**, and **Vite**.

## Installation

#### 1. Clone the repository:

```
git clone https://github.com/AzaS31/user-management-frontend

```

#### 2. Install dependencies:
```
npm install

```
#### 3. Environment Variables

Create a `.env` file in the root of the frontend project with the following content:

```
VITE_API_URL=http://your:localhost/api
```

#### 4. Start the development server:
```
npm run dev

```
## Project Structure

frontend/
├── public/         # Static assets
├── src/
│   ├── components/ # Reusable components (Layout, Header, Footer, PrivateRoute, Toolbar)
│   ├── pages/      # Pages (Login, Register, Home, Admin, ConfirmEmail)
│   ├── utils/      # Helper files (api.js for Axios instance)
│   ├── App.jsx     # Main app with routes
│   └── main.jsx    # Entry point
├── package.json
└── vite.config.js

## Technologies

React 19 - Frontend library
Vite - Dev server and bundler
React Router v7 - Routing
React Bootstrap - UI components
Axios - HTTP client
Bootstrap 5 - CSS framework

## 🧑‍💻 Author

Azamat S.

## 🪪 License

This project is licensed under the MIT License
