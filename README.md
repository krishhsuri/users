# Simple User Management App (Java Backend + React Frontend)

This project demonstrates a basic web application featuring a Java Spring Boot backend, a React frontend, and configurations for running locally with Docker Compose or deploying to Kubernetes.

## Overview

The application provides simple user management functionality:

* **Backend:** A RESTful API built with Java and Spring Boot to create and retrieve user information stored in a PostgreSQL database.
* **Frontend:** A basic React UI allowing users to view the list of users and add new users via the backend API.

## Backend Details

* **Framework:** Spring Boot
* **Language:** Java
* **Database:** PostgreSQL
* **Key Libraries:** Spring Web, Spring Data JPA, Hibernate
* **API Endpoints:**
    * `POST /users`: Create a new user.
    * `GET /users`: Retrieve all users.
    * `GET /users/{id}`: Retrieve a specific user by ID.
* **Configuration:** Database connection and JPA settings are managed in `src/main/resources/application.properties`. Includes CORS configuration (`WebConfig.java`) to allow requests from the frontend (requires manual creation based on provided examples).

## Frontend Details

* **Framework:** React.js
* **Functionality:**
    * Displays a list of users fetched from the backend (`/users` endpoint).
    * Provides a form to add a new user, sending data to the backend (`POST /users`).
* **API Interaction:** Uses `axios` to communicate with the backend API.

## Running the Application

You can run this application using either Docker Compose for local development or deploy it using the provided Kubernetes manifests.

### 1. Using Docker Compose (Local Development)

* Requires Docker and Docker Compose installed.
* The `docker-compose.yml` file defines two services: `app` (the Java backend) and `postgres` (the database).
* Navigate to the `user/` directory containing `docker-compose.yml`.
* Run the following command:
    ```bash
    docker-compose up --build -d
    ```
* The backend API will be available at `http://localhost:8080`.

### 2. Using Kubernetes

* Requires a running Kubernetes cluster (e.g., Minikube, Kind, Docker Desktop Kubernetes).
* Requires `kubectl` configured to interact with your cluster.
* The `k8s/` directory contains manifests for:
    * PostgreSQL database (Deployment, PersistentVolumeClaim, PersistentVolume, ConfigMap, Service).
    * Java application (Deployment, Service of type `NodePort`).
* **Steps:**
    1.  Build the backend Java application (e.g., using Gradle wrapper):
        ```bash
        ./gradlew bootJar
        ```
    2.  Build the Docker image for the backend (ensure your Dockerfile is in the `user/` directory):
        ```bash
        docker build -t user-app:latest .
        ```
    3.  *(If using Minikube/Kind)* Load the image into your cluster:
        ```bash
        minikube image load user-app:latest
        # or kind load docker-image user-app:latest --name <your-cluster-name>
        ```
    4.  Apply the Kubernetes manifests from the `k8s/` directory:
        ```bash
        kubectl apply -f k8s/
        ```
    5.  Find your Node's IP address (`minikube ip`, check cloud provider, etc.) or use `localhost` if using Docker Desktop Kubernetes.
    6.  The backend API will be accessible at `http://<NodeIP-or-localhost>:<NodePort>`. The default NodePort is `30007`.

### 3. Running the Frontend

* Requires Node.js and npm/yarn installed.
* Navigate to the `user-frontend/` directory (assuming you created it separately).
* Install dependencies:
    ```bash
    npm install
    # or yarn install
    ```
* **Important:** Ensure the `API_URL` constant in `src/App.js` points to the correct running backend URL (e.g., `http://localhost:8080` for Docker Compose, `http://localhost:30007` for Kubernetes on Docker Desktop).
* Start the development server:
    ```bash
    npm start
    # or yarn start
    ```
* Access the UI in your browser, typically at `http://localhost:3000`.

---
