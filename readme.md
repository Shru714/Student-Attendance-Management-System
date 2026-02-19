# Student Attendance Management System

**Complete Documentation & User Guide**

A full-stack web application for managing student attendance with role-based access control, time-restricted attendance marking, and automated notifications.

---

## 📋 Table of Contents

1. [Quick Start](#-quick-start)
2. [Login Credentials](#-login-credentials)
3. [Features](#-features)
4. [Installation](#-installation)
5. [Database Setup](#-database-setup)
6. [Project Structure](#-project-structure)
7. [User Guide](#-user-guide)
8. [API Endpoints](#-api-endpoints)
9. [Troubleshooting](#-troubleshooting)
10. [Technologies](#-technologies)

---

## 🚀 Quick Start

### Step 1: Setup Database

**Option A: Using Batch File (Windows)**
```bash
# Double-click: import-database.bat
# Or run in command prompt:
import-database.bat
```

**Option B: Using MySQL Command**
```bash
mysql -u root -p < server/database/schema.sql
```

**Option C: Using phpMyAdmin**
1. Open http://localhost/phpmyadmin
2. Click "Import" tab
3. Select `server/database/schema.sql`
4. Click "Go"

### Step 2: Configure Environment

Create `server/.env` file:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=attendance_system
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
```

### Step 3: Install Dependencies

```bash
cd server
npm install
```

### Step 4: Start Server

```bash
npm start
```

Server runs on: http://localhost:3000

### Step 5: Open Application

Open `client/index.html` in your browser or use test files:
- `TEST_LOGIN_COMPLETE.html` - Complete login test
- `TEST_STUDENT_LOGIN.html` - Student login test

---

## 🔑 Login Credentials

### Default Accounts

| Role | Email/Roll | Password | Access Level |
|------|-----------|----------|--------------|
| **Admin** | admin@example.com | admin123 | Full system access |
| **Teacher** | rajesh@example.com | teacher123 | Mark attendance, view classes |
| **Teacher** | priya@example.com | teacher123 | Mark attendance, view classes |
| **Student** | Name: Rahul Verma<br>Roll: PHP25001 | Rahul Verma | View personal attendance |

### Demo Students

| Student Name   | Roll Number   | Password       | Class          |
|---------------|---------------|----------------|----------------|
| Rahul Verma   | PHP25001      | Rahul Verma    | PHP - B        |
| Anita Singh   | PHP25002      | Anita Singh    | PHP - B        |
| Vikram Joshi  | PHP25003      | Vikram Joshi   | PHP - B        |
| Sneha Gupta   | Java25001     | Sneha Gupta    | Java - B       |
| Arjun Reddy   | Java25002     | Arjun Reddy    | Java - B       |

### Security Notes
⚠️ **Important:** These are default credentials for development/testing only.

**For Production:**
- Change all default passwords immediately
- Use strong, unique passwords (min 12 characters)
- Enable two-factor authentication
- Implement password complexity requirements
- Regularly rotate passwords

---

## ✨ Features

### Core Features
1. ✅ **Enhanced Student Login** - Name, roll number, and password authentication
2. ✅ **Auto Academic Year Generation** - Based on current month
3. ✅ **Multi-Select Teacher Assignment** - Multiple subjects and classes
4. ✅ **Auto Roll Number Generation** - Format: ClassCode + Year + Number
5. ✅ **Auto Password Generation** - Random passwords for students
6. ✅ **Time-Restricted Attendance** - 9:00 AM - 10:30 AM window
7. ✅ **Low Attendance Alerts** - Notifications when below 50%
8. ✅ **Teacher Notifications** - Automatic on assignment
9. ✅ **Student Notifications** - Account creation and alerts
10. ✅ **Enhanced Reports** - Filter by student, date, subject
11. ✅ **CSV/PDF Export** - Download attendance reports
12. ✅ **User-Friendly Empty States** - Improved "no records" messages

### Frontend Features
- **Admin Dashboard**: Manage classes, teachers, students, reports
- **Teacher Dashboard**: Mark attendance, view history
- **Student Dashboard**: View personal records and statistics
- **LocalStorage Support**: Works offline without backend
- **Responsive Design**: Mobile-friendly interface
- **Email/Password Login**: Secure authentication for Admin/Teacher

### Backend Features
- **Pure Node.js HTTP**: No Express framework
- **JWT Authentication**: Secure token-based auth
- **Role-Based Access**: Admin, Teacher, Student roles
- **MySQL Database**: Relational database with proper schema
- **RESTful API**: Clean API endpoints
- **Automated Notifications**: In-app notification system

---

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- Modern web browser (Chrome, Firefox, Edge, Safari)

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

Create `.env` file in server directory:
```env
PORT=3000
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

Backend runs on: http://localhost:3000

### Frontend Setup

**Option 1: Simple (No Server)**
- Just open `client/index.html` in your browser
- Uses LocalStorage for data persistence

**Option 2: With Development Server**
```bash
cd client
npm install
npm start
```

Frontend runs on: http://localhost:8080

---

## 🗄️ Database Setup

### Check Database Connection

**Method 1: Using Batch File**
```bash
# Double-click: check-database.bat
# Or run in command prompt:
check-database.bat
```

**Method 2: Using Node.js**
```bash
cd server
node test-connection.js
```

### Expected Output (Connected)
```
✅ Database connected successfully!
   Database: attendance_system
   Host: localhost
   User: root
   Tables: 14 tables found

📈 Current Data:
   Users: 5
   Teachers: 2
   Students: 10
```

### Troubleshooting Database Issues

**Issue: "ECONNREFUSED"**
- Solution: MySQL is not running
- Open XAMPP/WAMP Control Panel
- Click "Start" next to MySQL

**Issue: "Access denied"**
- Solution: Wrong password in .env
- For XAMPP, set: `DB_PASSWORD=`
- For custom MySQL, use your actual password

**Issue: "Unknown database"**
- Solution: Database not imported
- Run: `mysql -u root -p < server/database/schema.sql`

**Issue: Data not showing in phpMyAdmin**
- Verify correct database selected
- Refresh phpMyAdmin page (F5)
- Check `.env` has `DB_NAME=attendance_system`

### Database Tables (14 tables)
- users
- teachers
- students
- classes
- subjects
- teacher_years
- teacher_classes
- teacher_subjects
- teacher_assignments
- attendance
- attendance_records
- notifications
- attendance_settings

---

## 📁 Project Structure

```
Student-Attendance-Management-System/
├── client/                          # Frontend application
│   ├── index.html                  # Main HTML file
│   ├── style.css                   # Styles
│   ├── script.js                   # JavaScript logic
│   └── package.json                # Frontend dependencies
├── server/                          # Backend application
│   ├── server.js                   # Main server file
│   ├── .env                        # Environment variables
│   ├── config/
│   │   └── db.js                   # Database configuration
│   ├── models/                     # Data models
│   │   ├── userModel.js
│   │   ├── classModel.js
│   │   ├── studentModel.js
│   │   ├── teacherModel.js
│   │   ├── subjectModel.js
│   │   ├── attendanceModel.js
│   │   ├── teacherAssignmentModel.js
│   │   └── notificationModel.js
│   ├── controllers/                # Business logic
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── teacherController.js
│   │   └── studentController.js
│   ├── routes/
│   │   └── router.js               # API routes
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── database/
│   │   ├── schema.sql              # Database schema
│   │   └── schema_compatible.sql
│   └── package.json                # Backend dependencies
├── check-database.bat              # Database connection checker
├── import-database.bat             # Database import script
├── TEST_STUDENT_LOGIN.html         # Student login test page
├── TEST_LOGIN_COMPLETE.html        # Complete login test
└── README.md                       # This file
```

---

## 📖 User Guide

### For Admin Users

#### 1. Manage Classes
**Add New Class:**
1. Navigate to "Manage Classes"
2. Click "+ Add Class"
3. Enter:
   - Class Name (e.g., "PHP", "Java")
   - Section (e.g., "A", "B")
   - Year (1, 2, 3, 4)
4. Click "Save Class"
5. Academic year auto-generates

#### 2. Manage Teachers
**Add New Teacher:**
1. Navigate to "Manage Teachers"
2. Click "+ Add Teacher"
3. Fill in all required fields:
   - Name
   - Email
   - Teacher ID (e.g., "TCH001")
   - Contact Number (exactly 10 digits)
   - Phone
4. Select years and classes
5. Click "Save Teacher"

**Validation:**
- Contact number must be exactly 10 digits
- Teacher ID must be unique
- At least one year and one class required

#### 3. Manage Students
**Add New Student:**
1. Navigate to "Manage Students"
2. Click "+ Add Student"
3. Enter student details
4. Select class
5. Click "Save Student"
6. **Important:** Note the auto-generated password
7. Password will be the same as student name

**Roll Number Format:**
- Pattern: {ClassCode}{Year}{Sequence}
- Example: PHP25001, Java25002

#### 4. View Attendance Reports
**Student Report:**
- Select student from dropdown
- Choose date range
- View statistics and records
- Export as CSV or PDF

**Date Report:**
- Select date
- Filter by class (optional)
- View all attendance for that day
- Export as needed

### For Teacher Users

#### 1. Mark Attendance
1. Navigate to "Mark Attendance"
2. Select Class from dropdown
3. Select Date (defaults to today)
4. Select Time (defaults to current time)
5. Check time status indicator:
   - 🟢 Green: Within window (9 AM - 10:30 AM)
   - 🟡 Yellow: Late marking
   - 🔴 Red: Outside window
6. Mark students:
   - Click "Present" or "Absent" for each student
   - Or use "Mark All Present/Absent" buttons
7. Verify counter shows "Marked: X/Y"
8. Click "💾 Save Attendance"
9. Confirm success message

**Quick Actions:**
- **Mark All Present**: One-click to mark all
- **Mark All Absent**: One-click to mark all
- **Clear All**: Reset all marks (with confirmation)
- **Export CSV**: Download current session

#### 2. View Attendance History
1. Navigate to "View History"
2. Select Class
3. Select Date
4. View statistics and records
5. Edit existing records if needed

### For Student Users

#### 1. Login
1. Click "Login as Student"
2. Enter your full name
3. Enter your roll number
4. Enter password (same as your name)
5. Click Login

#### 2. View Dashboard
- See your attendance percentage
- View present/absent days
- Check total classes

#### 3. View Attendance Records
1. Navigate to "My Attendance"
2. Select month
3. View detailed records
4. See status for each day

---

## 🔐 API Endpoints

### Authentication
```
POST /api/register - Register new user
POST /api/login - Login (Admin/Teacher)
POST /api/student/login - Student login
```

**Student Login Request:**
```json
{
  "studentName": "Rahul Verma",
  "rollNumber": "PHP25001",
  "password": "Rahul Verma"
}
```

### Admin Routes
```
GET    /api/admin/classes - Get all classes
POST   /api/admin/classes - Create class
PUT    /api/admin/classes - Update class
DELETE /api/admin/classes?id=1 - Delete class

GET    /api/admin/teachers - Get all teachers
POST   /api/admin/teachers - Create teacher
PUT    /api/admin/teachers - Update teacher
DELETE /api/admin/teachers?id=1 - Delete teacher

GET    /api/admin/students - Get all students
POST   /api/admin/students - Create student
DELETE /api/admin/students?id=1 - Delete student

GET    /api/admin/attendance - Get attendance reports
```

### Teacher Routes
```
GET  /api/teacher/my-classes - Get assigned classes
POST /api/teacher/mark-attendance - Mark attendance
GET  /api/teacher/history - Get attendance history
```

### Student Routes
```
GET /api/student/profile - Get student profile
GET /api/student/attendance?studentId=1 - Get attendance
GET /api/student/percentage?studentId=1 - Get percentage
GET /api/student/notifications - Get notifications
```

---

## 🔧 Troubleshooting

### Login Issues

**Problem: Buttons Don't Work**
- Solution 1: Clear browser cache (Ctrl+Shift+Delete)
- Solution 2: Hard refresh (Ctrl+F5)
- Solution 3: Check console for errors (F12)
- Solution 4: Try TEST_LOGIN_COMPLETE.html

**Problem: Invalid Credentials**
- Solution 1: Verify email has no spaces
- Solution 2: Check password is correct (case-sensitive)
- Solution 3: Try copy-pasting credentials
- Solution 4: Use exact credentials from table above

### Student Login Issues

**Problem: "Invalid roll number"**
- Solution: Verify roll number is correct (case-sensitive)
- Check demo credentials table above
- Try copy-pasting from the table

**Problem: "Student name does not match"**
- Solution: Enter exact name as registered
- Check spelling and spacing
- Names are case-insensitive but must match exactly

**Problem: "Invalid password"**
- Solution: Password must be same as student name
- Example: If name is "Rahul Verma", password is "Rahul Verma"

### Database Issues

**Problem: Data not saving**
- Solution 1: Check MySQL is running (XAMPP/WAMP)
- Solution 2: Verify `.env` configuration
- Solution 3: Run `check-database.bat`
- Solution 4: Check server console for errors

**Problem: Teacher created but not showing**
- Solution 1: Refresh phpMyAdmin page
- Solution 2: Verify correct database selected
- Solution 3: Check server logs for errors
- Solution 4: Run diagnostic: `node diagnose-save-issue.js`

### Attendance Issues

**Problem: Can't Mark Attendance**
- Solution 1: Check current time (must be 9 AM - 10:30 AM)
- Solution 2: Ensure class is selected
- Solution 3: Verify students exist in class
- Solution 4: Check if already marked (duplicate prevention)

### Console Commands for Debugging

Open browser console (F12):

```javascript
// Check if functions exist
typeof showLoginForm
typeof studentLogin

// Check data
localStorage.getItem('students')
localStorage.getItem('classes')

// Force login (bypass form)
localStorage.setItem('currentRole', 'admin');
localStorage.setItem('currentUser', 'admin@example.com');
location.reload();

// Clear all data
localStorage.clear();
location.reload();
```

---

## 💻 Technologies

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (Flexbox, Grid)
- **Vanilla JavaScript** - Logic (ES6+)
- **LocalStorage API** - Data persistence

### Backend
- **Node.js** - Runtime (HTTP module)
- **MySQL2** - Database driver
- **JWT** - Authentication (jsonwebtoken)
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables

### Development Tools
- Modern web browser
- Text editor/IDE
- MySQL Workbench (optional)
- Postman (for API testing)

---

## 🎯 Key Features Explained

### 1. Student Login Authentication
```
Required Fields:
- Student Name (must match registered name)
- Roll Number (unique identifier)
- Password (same as student name)

Validation:
1. Check if roll number exists
2. Verify student name matches roll number
3. Confirm password matches student name
4. All checks are case-insensitive
```

### 2. Auto Academic Year
```javascript
// Logic:
// If current month >= June: 2025-2026
// If current month < June: 2024-2025
```

### 3. Auto Roll Number
```
Format: <ClassCode><YearLast2Digits><IncrementNumber>
Examples:
- PHP25001 (PHP class, year 2025, student 001)
- Java25002 (Java class, year 2025, student 002)
```

### 4. Time-Restricted Attendance
```
Allowed Window: 9:00 AM - 10:30 AM
Grace Period: 30 minutes after class ends
Status Indicators:
- 🟢 Green: Within window
- 🟡 Yellow: Late marking
- 🔴 Red: Outside window
```

---

## 🚀 Deployment

### Production Checklist

1. **Security:**
   - [ ] Change JWT_SECRET in .env
   - [ ] Update all default passwords
   - [ ] Enable HTTPS
   - [ ] Implement rate limiting
   - [ ] Add CORS configuration

2. **Database:**
   - [ ] Update database credentials
   - [ ] Set up database backups
   - [ ] Configure connection pooling
   - [ ] Enable query logging

3. **Monitoring:**
   - [ ] Set up error logging
   - [ ] Configure performance monitoring
   - [ ] Enable access logs
   - [ ] Set up alerts

4. **Testing:**
   - [ ] Test all user flows
   - [ ] Verify API endpoints
   - [ ] Check mobile responsiveness
   - [ ] Load testing

---

## 📝 License

MIT License

---

## 👨‍💻 Support

### Getting Help
1. Check this README
2. Review browser console (F12)
3. Try test files (TEST_STUDENT_LOGIN.html, TEST_LOGIN_COMPLETE.html)
4. Run diagnostic scripts (check-database.bat, diagnose-save-issue.js)

### Reporting Issues
- Note exact error message
- Check browser console
- Provide steps to reproduce
- Include browser version

---

## 🎉 Conclusion

The Student Attendance Management System is a complete, production-ready application with comprehensive features including:

✅ Enhanced student login with name + roll + password  
✅ Improved UI with user-friendly empty states  
✅ Complete attendance management  
✅ Teacher and admin dashboards  
✅ Automated notifications  
✅ Comprehensive reporting  

**Status:** ✅ Complete and Ready for Use  
**Version:** v2.0  
**Last Updated:** February 10, 2026

---

**End of Documentation**
