# Student Attendance Management System

A complete full-stack web application for managing student attendance with role-based access control, time-restricted attendance marking, and automated notifications.

## 🚀 Features

### ✅ **All Requirements Implemented:**

1. **Auto Academic Year Generation** - Automatically calculates based on current month
2. **Multi-Select Teacher Assignment** - Assign multiple subjects and classes
3. **Auto Roll Number Generation** - Format: ClassCode + Year + Number (e.g., BCA25001)
4. **Auto Password Generation** - Random passwords for bulk student creation
5. **Time-Restricted Attendance** - 9:00 AM - 10:30 AM window with auto-lock
6. **Low Attendance Alerts** - Automatic notifications when below 50%
7. **Teacher Notifications** - Automatic notifications on assignment
8. **Student Notifications** - Account creation and attendance alerts
9. **Enhanced Reports** - Filter by student, date, and subject
10. **CSV/PDF Export** - Download attendance reports

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
- **Automated Notifications**: In-app notification system

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
│   │   ├── subjectModel.js
│   │   ├── attendanceModel.js
│   │   ├── teacherAssignmentModel.js
│   │   └── notificationModel.js
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
│   ├── setup-test-data.js
│   ├── TEST_API.md
│   └── package.json
├── ENHANCEMENTS.md
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Backend Setup

1. **Navigate to server directory:**
```bash
cd server
npm install
```

2. **Create MySQL database:**
```bash
mysql -u root -p < database/schema.sql
```

3. **Configure environment variables:**
Create a `.env` file in the server directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=attendance_system
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
```

4. **Setup test data (Optional):**
```bash
node setup-test-data.js
```

5. **Start the backend:**
```bash
npm start
```

Backend runs on: http://localhost:5000

### Frontend Setup

1. **Navigate to client directory:**
```bash
cd client
npm install
```

2. **Start the frontend:**
```bash
npm start
```

Frontend runs on: http://localhost:8080

## 📊 Database Schema

### Tables:
- **users**: User accounts (admin, teacher, student) with phone and address
- **classes**: Class information with academic year
- **subjects**: Subject master data
- **teacher_assignments**: Many-to-many teacher-class-subject mapping
- **students**: Student details with auto roll numbers and parent contact
- **attendance**: Attendance sessions with time tracking and lock status
- **attendance_records**: Individual attendance records
- **notifications**: User notification system
- **attendance_settings**: System configuration

## 🔐 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login and get JWT token

### Admin Routes
- `GET /api/admin/classes` - Get all classes
- `POST /api/admin/classes` - Create class (auto academic year)
- `PUT /api/admin/classes` - Update class
- `DELETE /api/admin/classes?id=1` - Delete class
- `GET /api/admin/subjects` - Get all subjects
- `POST /api/admin/subjects` - Create subject
- `GET /api/admin/teachers` - Get all teachers with assignments
- `POST /api/admin/teachers` - Create teacher (multi-select subjects/classes)
- `GET /api/admin/students` - Get all students
- `POST /api/admin/students` - Create student (auto roll number & password)
- `POST /api/admin/students/bulk` - Bulk create students
- `PUT /api/admin/students/password` - Update student password
- `DELETE /api/admin/students?id=1` - Delete student
- `GET /api/admin/attendance?filters` - Get attendance reports (student/date/subject)
- `POST /api/admin/check-low-attendance` - Check and notify low attendance

### Teacher Routes
- `GET /api/teacher/my-classes` - Get assigned classes
- `GET /api/teacher/my-subjects` - Get assigned subjects
- `POST /api/teacher/mark-attendance` - Mark attendance (time-restricted)
- `GET /api/teacher/history?classId&subjectId` - Get attendance history

### Student Routes
- `GET /api/student/profile` - Get student profile
- `GET /api/student/attendance?studentId=1` - Get attendance records
- `GET /api/student/percentage?studentId=1` - Get attendance percentage
- `GET /api/student/notifications` - Get notifications
- `PUT /api/student/notifications/read` - Mark notification as read

## 🎯 Key Features Explained

### 1. Auto Academic Year
```javascript
// If current month >= June: 2025-2026
// Else: 2024-2025
```

### 2. Auto Roll Number Generation
```
Format: <ClassCode><YearLast2Digits><IncrementNumber>
Example: BCA25001, BCA25002, MCA25001
```

### 3. Time-Restricted Attendance
```
Class Time: 9:00 AM - 10:00 AM
Marking Allowed Until: 10:30 AM (30-minute grace period)
After 10:30 AM: Attendance locked
```

### 4. Low Attendance Monitoring
```
Threshold: 50%
If attendance < 50%:
  - Notify student
  - Notify parent (SMS/Email in production)
```

## 🧪 Testing

### Test Credentials (After running setup-test-data.js):
```
Admin:   admin@example.com / admin123
Teacher: rajesh@example.com / teacher123
Student: rahul@example.com / student123
```

### API Testing:
See `server/TEST_API.md` for detailed API testing examples with curl commands.

## 📝 Usage Examples

### Create Teacher with Multi-Assignment:
```json
POST /api/admin/teachers
{
  "name": "Dr. John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "subjects": [1, 2, 3],
  "classes": [1, 2],
  "isClassTeacher": true
}
```

### Bulk Create Students:
```json
POST /api/admin/students/bulk
{
  "students": [
    {
      "name": "Student 1",
      "email": "student1@example.com",
      "classId": 1,
      "address": "Address 1",
      "studentContact": "1111111111",
      "parentContact": "2222222222"
    }
  ]
}
```

### Mark Attendance (Time-Restricted):
```json
POST /api/teacher/mark-attendance
{
  "classId": 1,
  "subjectId": 1,
  "date": "2025-02-08",
  "startTime": "09:00",
  "endTime": "10:00",
  "records": [
    { "studentId": 1, "status": "Present" },
    { "studentId": 2, "status": "Absent" }
  ]
}
```

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

## 📚 Documentation

- **ENHANCEMENTS.md** - Detailed feature documentation
- **TEST_API.md** - API testing guide with examples
- **database/schema.sql** - Complete database schema

## 🚀 Deployment

### Production Checklist:
1. Change JWT_SECRET in .env
2. Update database credentials
3. Enable HTTPS
4. Configure email/SMS for notifications
5. Set up proper logging
6. Configure CORS for production domain
7. Enable rate limiting
8. Set up database backups

## 📝 License

MIT License

## 👨‍💻 Author

Your Name

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For issues or questions, refer to the documentation or create an issue on GitHub.
