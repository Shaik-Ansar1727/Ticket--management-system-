# Ticket Management System

A full-stack Ticket Management System built to streamline issue tracking, ticket assignment, workflow management, and team collaboration inside an organization.

This project includes:

- Secure JWT Authentication
- Role-Based Access Control (Admin & Employee)
- Ticket Creation and Assignment
- Ticket Status Tracking
- Comments & Activity History
- Profile Management with Image Upload
- Modern React Frontend
- Spring Boot REST API Backend

The application is designed with a scalable layered architecture and follows real-world backend and frontend development practices.

---

# Tech Stack

## Backend

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL
- Maven

## Frontend

- React 19
- Vite
- React Router DOM
- React Query
- Axios
- Ant Design
- Tailwind CSS

---

# Features

## Authentication & Authorization

- User Registration
- Secure Login with JWT
- Stateless Authentication
- Role-Based Access Control
- Admin Approval System

## Admin Features

- View All Users
- Approve or Reject Users
- Delete Users
- Change User Passwords
- Manage Tickets

## Employee Features

- View Assigned Tickets
- Update Ticket Status
- Add Comments
- Manage Profile
- Upload Profile Picture

## Ticket Management

- Create Tickets
- Update Tickets
- Delete Tickets
- Assign Tickets
- Track Ticket Status History
- Add Ticket Comments
- Attachment Support

---

# Project Structure

## Backend Structure

```bash
src/main/java/com/company/ticketing/ticket_management_system_backend
│
├── config
├── controller
├── dto
├── entity
├── enums
├── repository
├── service
├── security
└── bootstrap
```

## Frontend Structure

```bash
src
│
├── components
├── pages
├── services
├── routes
├── hooks
├── utils
└── assets
```

---

# Authentication Flow

1. User registers  
2. Admin approves the account  
3. User logs in  
4. Backend generates JWT token  
5. Frontend stores token  
6. Protected APIs use JWT Authorization Header  

Example:

```http
Authorization: Bearer your_jwt_token
```

---

# API Highlights

## Authentication

```http
POST /auth/register
POST /auth/login
```

## Users

```http
GET /users/me
PUT /users/me
PUT /users/me/password
```

## Admin

```http
GET /admin/users
POST /admin/users/{id}/approve
POST /admin/users/{id}/reject
```

## Tickets

```http
POST /tickets
GET /tickets
PATCH /tickets/{id}/status
POST /tickets/{id}/comments
GET /tickets/{id}/status-history
```

---

# Database Design

## Main Entities

- User
- Ticket
- TicketComment
- TicketStatusHistory

## Relationships

- One User can create many Tickets
- One User can be assigned many Tickets
- One Ticket can have many Comments
- One Ticket can have many Status History records

---

# Screens Included

- Login Page
- Registration Page
- Dashboard
- Ticket Management
- Ticket Details
- Comments Section
- Admin User Management
- Profile Management

---

# Setup Instructions

## Backend Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/ticket-management-system.git
```

### 2. Navigate to Backend

```bash
cd backend/ticket-management-system-backend
```

### 3. Configure Database

Update `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ticket_management
spring.datasource.username=root
spring.datasource.password=your_password

jwt.secret=your_secret_key
jwt.expiration=86400000
```

### 4. Run Backend

```bash
./mvnw spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

## Frontend Setup

### 1. Navigate to Frontend

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Default Admin Account

The system automatically creates a default admin during application startup.

```txt
Email: admin@company.com
Password: admin123
```

Change the default credentials before using in production.

---

# Security Features

- BCrypt Password Encoding
- JWT Authentication
- Stateless Sessions
- Route Protection
- Role-Based Authorization
- Protected API Endpoints

---

# Future Improvements

- Email Notifications
- Docker Support
- Swagger Documentation
- Refresh Token System
- Pagination & Filtering
- WebSocket Notifications
- Audit Logs
- Unit & Integration Testing
- Cloud Deployment

---

# Learning Outcomes

This project helped in understanding:

- Full-Stack Application Development
- Spring Security & JWT
- REST API Design
- Role-Based Access Control
- React State Management
- API Integration
- Database Relationships
- Real-World Project Architecture

---

# Author

**Shaik Ansar Ahmed**  
Final Year B.Tech CSE Student  

Passionate about Full-Stack Development, Backend Engineering, and Scalable Applications.

---

# License

This project is developed for learning and educational purposes.
