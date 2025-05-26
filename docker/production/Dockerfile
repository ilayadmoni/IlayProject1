# Stage 1: Build frontend
# This stage builds the React frontend and embeds the backend URL for API calls
FROM node:22.6.0 as frontend-build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
ENV REACT_APP_BACKEND_URL=http://10.100.102.2:80
RUN npm run build

# Stage 2: Backend
# This stage sets up the Flask backend and copies the built frontend for static serving
FROM python:3.12
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install -r requirements.txt
COPY backend ./
COPY --from=frontend-build /app/build ./frontend/build
ENV PYTHONUNBUFFERED=1
EXPOSE 80
CMD ["python", "Server.py"]