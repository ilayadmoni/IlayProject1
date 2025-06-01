# 🍲 Recipe Sharing App

Welcome! This is a full-stack recipe-sharing web application built out of curiosity and passion for web development by **Ilay Admoni**.  
The app allows users to **create**, **edit**, and **delete** their own recipes, including ingredients, preparation steps, and an image for illustration.

---

## 🚀 Live Demo  
👉 [https://ilayproject1.onrender.com](https://ilayproject1.onrender.com)

---

## 🛠️ Technologies Used

### Frontend:
- React.js
- Axios
- React Router

### Backend:
- Python
- Flask
- Flask-CORS
- PyMongo

### Database:
- MongoDB Atlas

### DevOps & Deployment:
- Docker (multi-stage build)
- Render (for hosting)
- Git & GitHub (for version control)

---

## 🐳 Docker Architecture

The project is fully containerized using a custom **multi-stage Dockerfile**:

1. **Stage 1 – Frontend Build**  
   Builds the React app with the backend API URL injected via an environment variable.

2. **Stage 2 – Backend Setup**  
   Installs Python dependencies, sets up Flask, and copies the built React frontend to serve as static files.

### Example `Dockerfile` Highlights:
```Dockerfile
ENV REACT_APP_BACKEND_URL=https://ilayproject1.onrender.com
COPY --from=frontend-build /app/build ./frontend/build
ENV STATIC_FOLDER="frontend/build"

