# Student Attendance Management System

A full-stack web application for managing student attendance with role-based access control.

## Tech Stack

- **Frontend**: React.js, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)

## Features

- Role-based authentication (Admin, Teacher, Student)
- Attendance marking and tracking
- Real-time attendance reports
- Dashboard for each user role
- Export reports (PDF/Excel)

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MySQL (v8+)
- npm or yarn

### Backend Setup
```bash
cd server
npm install
# Configure .env file
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

### Database Setup
```bash
# Import the database schema
mysql -u root -p < server/database/schema.sql
```

## User Roles

- **Admin**: Manage users, courses, and view reports
- **Teacher**: Mark attendance and view class reports
- **Student**: View personal attendance summary

## API Documentation

See `/server/README.md` for detailed API documentation.
