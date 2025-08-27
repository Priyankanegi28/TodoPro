# Todo App

The **Mini-Todo App** is a modern task management application built using **React.js** for the frontend and **Firebase** for authentication and backend data storage. It allows users to **sign up, log in, manage their todos**, and securely log out. Users can **add tasks with a title, description, priority, and due date, edit tasks, mark them as completed, and delete tasks**.

![Todo Preview](https://github.com/Priyankanegi28/TodoPro/blob/main/src/screenshots/main.png)
![Todo Preview](https://github.com/Priyankanegi28/TodoPro/blob/main/src/screenshots/todo.png)

---

## ✨ Features

✔️ **User Authentication** – Sign up and log in securely using Firebase Authentication.

📝 **Add Todos** – Create tasks with title, description, priority, and due date.

📌 **View Todos** – All added todos are displayed with real-time updates.

✏️ **Edit Todos** – Update task details directly in the app.

✅ **Complete Tasks** – Mark tasks as completed.

🗑️ **Delete Todos** – Remove tasks when no longer needed.

👤 **Logout** – Securely log out from your account.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, JavaScript, CSS
* **Backend & Database:** Firebase Firestore
* **Authentication:** Firebase Authentication
* **Hosting:** GitHub Pages or Firebase Hosting

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Priyankanegi28/TodoPro.git
cd TodoPro
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Firebase

* Create a Firebase project in [Firebase Console](https://console.firebase.google.com/).
* Enable **Email/Password Authentication**.
* Create a **Firestore database**.
* Copy your Firebase config and replace it in `src/firebase.js`.

### 4️⃣ Run the App Locally

```bash
npm start
```

* The app will open at `http://localhost:3000`.
* Sign up or log in to start managing your todos.

### 5️⃣ Deploy

```bash
npm run deploy
```

* This uses `gh-pages` to publish your React app to GitHub Pages.
* Your live app URL: `https://Priyankanegi28.github.io/TodoPro/`

---

## 🔄 Workflow

1. **Sign up** with your email and password.
2. **Log in** to access your personal todo list.
3. **Add todos** with title, description, priority, and due date.
4. **Edit, complete, or delete** tasks as needed.
5. **Log out** securely when done.

---

