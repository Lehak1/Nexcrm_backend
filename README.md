# Backend Setup - Campaign Management System

This repository contains the backend for the Campaign Management System built with **Node.js**, **Express.js**, **MongoDB**. It also integrates **Auth0** for authentication and **GEMINI API** for generating personalized campaign messages.

## Table of Contents

1. [Local Setup Instructions](#local-setup-instructions)
2. [Architecture Diagram](#architecture-diagram)
3. [AI Tools and Other Tech Used](#ai-tools-and-other-tech-used)
4. [Known Limitations or Assumptions](#known-limitations-or-assumptions)

---

# Local Setup Instructions

1. **Clone the Repository**  
   Clone the backend repository to your local machine:

   ```bash
   git clone <repository-url>

2. **Install Dependencies** 
    ```bash 
    npm install

2. **Set Up Environment Variables** 

MONGO_URI=<your-mongo-db-uri>

AUTH0_CLIENT_ID=<your-auth0-client-id>

AUTH0_CLIENT_SECRET=<your-auth0-client-secret>

OPENAI_API_KEY=<your-openai-api-key>

3. **Start the Development Server** 
    ```bash 
    npm run dev

4. **Database Setup** 
  ```bash 
     npm run migrate




---
# Architecture Diagram
The system follows a Model-View-Controller (MVC) architecture where:

Model: Handles the data (MongoDB database and Prisma ORM).

View: The frontend is responsible for the user interface (React).

Controller: Express.js routes that handle business logic, API endpoints, and communication with external services like OpenAI.

Here is a basic architecture diagram of how the system works:


+-------------------+        +-------------------+        +-----------------+
|   Frontend (React)| <----> | Backend (Express) | <----> |  GEMINI API     |
+-------------------+        +-------------------+        +-----------------+
                               |                       |
                               v                       v
                       +-------------------+    +--------------------------+
                       |     MongoDB       |    | Auth0 (Authentication)   |
                       +-------------------+    +--------------------------+




##  AI Tools and Other Tech Used

AI Integration:
GEMINI API: The backend communicates with Gemini models to generate personalized campaign messages. This integration provides the AI-powered content for campaigns based on user input.


##  Other Technologies:

Node.js: JavaScript runtime environment used for building the server-side logic.

Express.js: Web framework used to build the RESTful API for campaign management.

MongoDB: NoSQL database used for storing campaign and customer data.

Auth0: Authentication service used for secure user login and access control.

Axios: HTTP client used to make API requests to the frontend and OpenAI.




## Known Limitations or Assumptions

1. The backend includes minimal error handling. Better structured and descriptive error messages (including HTTP status codes) should be implemented to improve debugging and user feedback.

2.  APIs do not have rate limiting or throttling mechanisms, making them vulnerable to abuse. Implement tools like `express-rate-limit` to prevent denial-of-service attacks or excessive usage.

3.  User permissions and access roles (e.g., admin, user) are not enforced. For production, implement RBAC to secure critical endpoints.

4.  User input is minimally validated and not sanitized in some routes, which can expose the system to security risks like NoSQL injection or XSS.

5. There are limited or no automated tests for backend or frontend modules. Adding testing using tools like Jest (for backend) and React Testing Library (for frontend) is essential for maintainability.





