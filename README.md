Project Title: Simple User Management App (Java Backend + React Frontend)
This project demonstrates a basic web application with a Java Spring Boot backend, a React frontend, and configurations for running with Docker Compose and Kubernetes.

Overview
The application provides simple user management functionality:

Backend: A RESTful API built with Java and Spring Boot to create and retrieve user information stored in a PostgreSQL database .
Frontend: A basic React UI allowing users to view the list of users and add new users via the backend API.
Backend Details
Framework: Spring Boot
Language: Java
Database: PostgreSQL 
Key Libraries: Spring Web, Spring Data JPA , Hibernate
API Endpoints:
POST /users: Create a new user.
GET /users: Retrieve all users.
GET /users/{id}: Retrieve a specific user by ID .
Configuration: Database connection and JPA settings are managed in application.properties . Includes CORS configuration (WebConfig.java) to allow requests from the frontend.
Frontend Details
Framework: React.js
Functionality:
Displays a list of users fetched from the backend (/users endpoint).
Provides a form to add a new user, sending data to the backend (POST /users).
API Interaction: Uses axios to communicate with the backend API.
Running the Application
You can run this application using either Docker Compose for local development or deploy it using the provided Kubernetes manifests.

1. Using Docker Compose (Local Development)

Requires Docker and Docker Compose installed.
The docker-compose.yml file defines two services: app (the Java backend) and postgres (the database) .
Navigate to the user/ directory.
Run: docker-compose up --build -d
The backend API will be available at http://localhost:8080.
2. Using Kubernetes

Requires a running Kubernetes cluster (e.g., Minikube, Kind, Docker Desktop Kubernetes).
Requires kubectl configured to interact with your cluster.
The k8s/ directory contains manifests for:
PostgreSQL database deployment (postgres-deployment.yaml), persistent storage (postgres-pv.yaml, postgres-pvc.yaml), configuration (postgres-configmap.yaml), and internal service (postgres-service).
Java application deployment (app-deployment.yaml) and an external service (user-app-service) of type NodePort .
Steps:
Build the backend Java code (e.g., ./gradlew bootJar).
Build the Docker image for the backend (e.g., docker build -t user-app:latest . in the user/ directory). If using Minikube/Kind, load the image into the cluster (e.g., minikube image load user-app:latest).
Apply the Kubernetes manifests: kubectl apply -f k8s/
Find your Node's IP address (e.g., minikube ip) or use localhost if using Docker Desktop.
The backend API will be accessible at http://<NodeIP-or-localhost>:<NodePort> (the default NodePort is 30007).
3. Running the Frontend

Requires Node.js and npm/yarn installed.
Navigate to the user-frontend/ directory.
Install dependencies: npm install (or yarn install).
Important: Ensure the API_URL constant in src/App.js points to the correct backend URL (either the Docker Compose one or the Kubernetes NodePort one).
Start the development server: npm start (or yarn start).
Access the UI in your browser, usually at http://localhost:3000.
