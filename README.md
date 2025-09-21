# Sweet Shop Management System

A full-stack web application for managing the inventory and sales of a sweet shop. This project includes a complete backend API with user authentication and a responsive frontend built with React.

---
## Screenshots
<img width="1878" height="903" alt="image" src="https://github.com/user-attachments/assets/1d20b941-208e-4090-b707-2ea082f60676" />
<img width="1897" height="905" alt="image" src="https://github.com/user-attachments/assets/64416cdf-8f39-4fbf-923e-4204b5d372c3" />
<img width="1897" height="572" alt="image" src="https://github.com/user-attachments/assets/c79a3125-dcba-4cc7-9874-e712b9ba3391" />

<img width="1557" height="846" alt="image" src="https://github.com/user-attachments/assets/98e763ce-2b3f-4fbe-a643-1156424851f8" />





---
## Features

* **User Authentication**: Secure user registration and login with JWT.
* **Sweets Management**: Full CRUD (Create, Read, Update, Delete) functionality for sweets.
* **Inventory Control**: Purchase and restock sweets to manage stock levels.
* **Role-Based Access**: Admin-only access for sensitive actions like deleting or restocking items.
* **Search & Filter**: A dynamic search feature to find sweets by name or category.
* **Responsive UI**: A clean and modern user interface built with React.

---
## Tech Stack

* **Frontend**: React, TypeScript, Vite, Axios, React Router
* **Backend**: Node.js, Express, TypeScript
* **Database**: MongoDB with Mongoose
* **Testing**: Jest, Supertest

---
## Setup and Run Locally

To get this project up and running on your local machine, follow these steps.

### Prerequisites

* Node.js (v18 or later)
* MongoDB (either a local instance or a free cloud instance from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/YourRepositoryName.git](https://github.com/YourUsername/YourRepositoryName.git)
    cd YourRepositoryName/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `backend` root and add your environment variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    PORT=5001
    ```
4.  **Run the server:**
    ```bash
    npm run dev
    ```
    The backend will be running on `http://localhost:5001`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the React app:**
    ```bash
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173` (or another port if 5173 is busy).

---
## My AI Usage

### Tools Used
* **Gemini**: I worked with Gemini as a pair-programming assistant throughout the development process.

### How I Used It
I integrated Gemini as a pair-programming assistant to accelerate development and improve code quality. My usage focused on the following areas:

* **Boilerplate Generation**: Leveraged Gemini to rapidly scaffold standard code structures, including Express controllers, Mongoose schemas, and React functional components. This allowed me to focus on implementing the core business logic rather than on repetitive setup tasks.

* **Advanced Debugging**: Used Gemini as a rapid debugging tool by providing it with complex error logs. It was particularly effective in diagnosing and providing solutions for challenging configuration issues related to TypeScript (`tsconfig.json`), CORS, and Git authentication (SSH).

* **Code Refactoring & Implementation**: Collaborated with Gemini to refactor existing code for improved readability and efficiency. For features like the JWT authentication middleware and the dynamic search query, I used it to explore and suggest optimal implementation patterns.

* **Brainstorming & API Design**: During the initial planning phase, I used Gemini to brainstorm and validate the structure of the RESTful API endpoints and the database models, ensuring a logical and scalable design.

