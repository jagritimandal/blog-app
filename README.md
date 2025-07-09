# 📝 Blog App

A modern full-stack blog application built with **MongoDB**, **Express**, and **React**/**Next.js**. Features include post creation, comments, authentication, categories, tags, and media uploads.

---

## 🚀 Features

* 🔐 User Authentication (JWT)
* 📝 Rich Text Blog Posts
* 💬 Nested Comments & Reactions
* 🏷 Tags & Categories
* 📷 Image Upload Support
* 📡 RESTful API with Express
* 📊 Admin Dashboard (optional)
* ⚙️ Fully configurable via `.env`
* 📦 Docker & MongoDB-ready

---

## 📁 Project Structure

```
blog-app/
├── client/         # Frontend (React or Next.js)
├── server/         # Backend (Express + MongoDB)
├── .env            # Environment configuration
└── docker-compose.yml (optional)
```

---

## 🧰 Tech Stack

| Frontend                | Backend      | Database |
| ----------------------- | ------------ | -------- |
| React / Next.js         | Express.js   | MongoDB  |
| Tailwind CSS (optional) | Mongoose ORM |          |
| Axios / Fetch           | JWT Auth     |          |

---

## ⚙️ Installation

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
```

---

### 2. Setup Environment Variables

Create two `.env` files — one in `server/` and optionally one in `client/`:

#### `.env` (server)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

---

### 3. Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

---

### 4. Run the App

#### Development (with concurrently)

From root:

```bash
npm run dev
```

Or run separately:

```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

---

## 🐳 Docker Setup (Optional)

```bash
docker-compose up --build
```

This will run the backend and MongoDB in containers.

---

## 🧪 API Endpoints (Backend)

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | User login        |
| GET    | `/api/posts/`        | Get all posts     |
| POST   | `/api/posts/`        | Create new post   |
| GET    | `/api/posts/:id`     | Get post by ID    |
| POST   | `/api/comments/`     | Add comment       |

More endpoints in `/server/routes/`.

---

## 🛠 Available Scripts

In `client/` or `server/`:

```bash
npm run dev       # Start dev server
npm run build     # Build project
npm run start     # Start production
```

---

## 📸 Screenshots

> *Add screenshots here for UI preview*

---

