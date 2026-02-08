# Student Attendance Management System

A complete full-stack web application for managing student attendance with role-based access control.

## 🚀 Features

### Frontend (Vanilla JavaScript)
- **Admin Dashboard**: Manage classes, teachers, students, and view attendance reports
- **Teacher Dashboard**: Mark attendance and view history
- **Student Dashboard**: View personal attendance records and statistics
- **LocalStorage Support**: Works offline without backend
- **Responsive Design**: Mobile-friendly interface

### Backend (Node.js + MySQL)
- **Pure Node.js HTTP**: No Express framework
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Admin, Teacher, and Student roles
- **MySQL Database**: Relational database with proper schema
- **RESTful API**: Clean API endpoints

## 📁 Project Structure

```
Student-Attendance-Management-System/
├── client/                 # Frontend application
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── package.json
├── server/                 # Backend application
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── classModel.js
│   │   ├── studentModel.js
│   │   └── attendanceModel.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── teacherController.js
│   │   └── studentController.js
│   ├── routes/
│   │   └── router.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── database/
│   │   └── schema.sql
│   └── package.json
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
npm install
```

2. Start the frontend:
```bash
npm start
```

Frontend runs on: http://localhost:8080

### Backend Setup

1. Navigate to server directory:
```bash
cd server
npm install
```

2. Create MySQL database:
```bash
mysql -u root -p < database/schema.sql
```

3. Configure environment variables:
Create a `.env` file in the server directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=attendance_system
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

4. Start the backend:
```bash
npm start
```

Backend runs on: http://localhost:5000

## 📊 Database Schema

- **users**: User accounts (admin, teacher, student)
- **classes**: Class information
- **students**: Student details and class assignments
- **attendance**: Attendance sessions
- **attendance_records**: Individual attendance records

## 🔐 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login and get JWT token

### Admin Routes
- `GET /api/admin/classes` - Get all classes
- `POST /api/admin/classes` - Create class
- `PUT /api/admin/classes` - Update class
- `DELETE /api/admin/classes?id=1` - Delete class
- `GET /api/admin/teachers` - Get all teachers
- `POST /api/admin/teachers` - Create teacher
- `GET /api/admin/students` - Get all students
- `POST /api/admin/students` - Create student
- `DELETE /api/admin/students?id=1` - Delete student
- `GET /api/admin/attendance` - Get attendance reports

### Teacher Routes
- `GET /api/teacher/my-class` - Get assigned class
- `POST /api/teacher/mark-attendance` - Mark attendance
- `GET /api/teacher/history?classId=1` - Get attendance history

### Student Routes
- `GET /api/student/profile` - Get student profile
- `GET /api/student/attendance?studentId=1` - Get attendance records
- `GET /api/student/percentage?studentId=1` - Get attendance percentage

## 🎯 Usage

### Demo Data
1. Login as Admin
2. Click "Load Demo Data" to populate sample data
3. Test all features with pre-loaded classes, teachers, and students

### Test Credentials
After loading demo data, you can login with:
- **Admin**: admin@example.com / admin123
- **Teacher**: Use any teacher email from demo data
- **Student**: Use roll numbers (BCA001, BCA002, etc.)

## 🔧 Technologies Used

### Frontend
- HTML5
- CSS3 (Flexbox, Grid)
- Vanilla JavaScript
- LocalStorage API

### Backend
- Node.js (HTTP module)
- MySQL2
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

## 📝 License

MIT License

## 👨‍💻 Author

Your Name

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
