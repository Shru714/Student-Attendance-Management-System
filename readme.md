# Student Attendance Management System - Complete Documentation

## 📚 Table of Contents
1. [Quick Start](#quick-start)
2. [Login Credentials](#login-credentials)
3. [System Features](#system-features)
4. [Installation & Setup](#installation--setup)
5. [Database Management](#database-management)
6. [User Guide](#user-guide)
7. [Recent Fixes & Updates](#recent-fixes--updates)
8. [Troubleshooting](#troubleshooting)
9. [API Documentation](#api-documentation)

---

## 🚀 Quick Start

### Start the Server
```bash
cd server
node server.js
```

### Open the Application
Open `client/index.html` in your browser

### Management Tools
```bash
manage.bat  # Complete management console with 21 options
```

**Available Options in manage.bat:**
- Database Management (Setup, Reimport, Create Admin, Test Connection, Check Data)
- Server Management (Start, Restart, Force Restart, Stop)
- Database Fixes (Fix Class Time, Fix Phone Column, Diagnostics, Fix Passwords)
- Testing Tools (Test Login, Test APIs, Check Teachers, Check Schema)
- Application (Open App, Open Fix Tool, Open Connection Test)

---

## 🔑 Login Credentials

### Admin
- **Email:** admin@example.com
- **Password:** Admin@143

### Teachers
- **sunny@gmail.com** / Teacher@143
- **booby@gmail.com** / Teacher@143
- **roc@gmail.com** / Teacher@143
- **shrutiteli571@gmail.com** / Teacher@143

### Students
- **Roll Number:** STU001, STU002, etc.
- **Password:** Student@143

---

## ✨ System Features

### Admin Panel
- ✅ Manage Classes (Create, Edit, Delete)
- ✅ Manage Teachers (Create, Edit, Delete, Assign Classes)
- ✅ Manage Students (Create, Edit, Delete)
- ✅ Manage Subjects
- ✅ View Attendance Reports
- ✅ Dashboard with Statistics

### Teacher Panel
- ✅ View Assigned Classes
- ✅ Mark Attendance
- ✅ View Attendance History
- ✅ Dashboard with Class Overview

### Student Panel
- ✅ View Personal Attendance
- ✅ View Attendance Percentage
- ✅ View Class Schedule
- ✅ Notifications

---

## 💾 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- Web Browser

### Step 1: Install Dependencies
```bash
cd server
npm install
```

### Step 2: Configure Database
1. Create `.env` file in `server` folder:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=attendance_system
JWT_SECRET=your_secret_key_here
PORT=3000
```

### Step 3: Setup Database
```bash
# Option 1: Using manage.bat
manage.bat
# Select option 1: Setup Database

# Option 2: Manual MySQL
mysql -u root -p
source server/database/complete-setup-with-data.sql
```

### Step 4: Start Server
```bash
cd server
node server.js
```

### Step 5: Open Application
Open `client/index.html` in your browser

---

## 🗄️ Database Management

### Using manage.bat (Recommended)
```bash
manage.bat
```

**Complete Menu with 21 Options:**

**DATABASE MANAGEMENT**
1. Setup Database (Complete with Data)
2. Reimport Database (Fresh Start)
3. Create Admin User
4. Test Database Connection
5. Check Data Counts

**SERVER MANAGEMENT**
6. Start Server
7. Restart Server
8. Force Restart Server
9. Stop Server

**DATABASE FIXES**
10. Fix Class Time Column
11. Fix Phone Column
12. Run Full Diagnostics
13. Fix Passwords

**TESTING TOOLS**
14. Test Login
15. Test Teacher API
16. Test Classes API
17. Check Teachers
18. Check Schema

**APPLICATION**
19. Open Application
20. Open Fix Tool
21. Open Connection Test

### Manual Database Commands
```bash
# Import database
mysql -u root -p < server/database/complete-setup-with-data.sql

# Check teachers
mysql -u root -p -e "source check-teachers.sql"

# Add class time column (if needed)
mysql -u root -p attendance_system < add-class-time-column.sql

# Add phone column (if needed)
mysql -u root -p < add-phone-column.sql
```

---

## 📖 User Guide

### Admin: How to Manage Teachers

#### Add New Teacher
1. Login as admin
2. Click "Manage Teachers"
3. Click "Add New Teacher"
4. Fill in the form:
   - Name (required)
   - Email (required)
   - Teacher ID (auto-generated, e.g., TCH001)
   - Contact No (required, 10 digits)
   - Password (optional, default: Teacher@143)
5. Select Years (1, 2, 3, 4)
6. Select Classes to assign
7. Click "Save Teacher"

#### Edit Teacher
1. Click "Edit" button on teacher row
2. Modify details
3. Check/uncheck classes to assign/unassign
4. Click "Save Teacher"

#### Assign Classes to Teachers
1. Go to "Manage Teachers"
2. Click "Edit" on the teacher
3. Check the classes you want to assign
4. Set class times (optional, default: 09:00)
5. Click "Save Teacher"

**Important:** Teachers can only see classes assigned to them in "Mark Attendance"

### Admin: How to Manage Students

#### Add New Student
1. Click "Manage Students"
2. Click "Add New Student"
3. Fill in the form:
   - Name (required)
   - Email (optional)
   - Roll Number (auto-generated)
   - Class (required)
   - Address (optional)
   - Student Contact (optional)
   - Parent Contact (optional)
   - Class Time (default: 09:00)
   - Password (optional, default: Student@143)
4. Click "Save Student"

### Admin: How to Manage Classes

#### Add New Class
1. Click "Manage Classes"
2. Click "Add New Class"
3. Fill in:
   - Class Name (e.g., BCA, MCA, B.Tech CS)
   - Section (e.g., A, B)
   - Year (1-4)
4. Click "Save Class"

### Teacher: How to Mark Attendance

1. Login as teacher
2. Go to "Mark Attendance"
3. Select Class from dropdown (only shows assigned classes)
4. Select Date
5. Mark each student as Present/Absent
6. Click "Submit Attendance"

**Note:** Attendance can only be marked within the allowed time window (class time + 30 minutes grace period)

### Teacher: View Attendance History

1. Go to "Attendance History"
2. Select Class
3. Select Date Range
4. View attendance records

### Student: View Attendance

1. Login with roll number
2. Dashboard shows:
   - Total attendance percentage
   - Recent attendance records
   - Class schedule
3. Click "View Details" for detailed attendance

---

## 🔧 Recent Fixes & Updates

### Fix 1: Teacher Creation Error (Phone Column)
**Problem:** Error when adding teachers: "Unknown column 'phone' in 'field list'"

**Solution:**
- Removed `phone` parameter from UserModel.create()
- Removed `phone` parameter from TeacherModel.create()
- Updated AdminController to not pass phone
- Removed phone input field from frontend
- Teachers now only use `contact_no` field

**Files Modified:**
- server/models/userModel.js
- server/models/teacherModel.js
- server/controllers/adminController.js
- client/script.js (v38)
- client/index.html

**Status:** ✅ Fixed - Restart server required

### Fix 2: Teacher Dashboard Empty
**Problem:** Teacher dashboard showed "Total teachers: 0"

**Solution:**
- Changed from admin endpoint to teacher-specific endpoint
- Updated to use `/api/teacher/my-classes`
- Backend returns full class details in response

**Files Modified:**
- server/controllers/teacherController.js
- client/script.js

**Status:** ✅ Fixed

### Fix 3: Mark Attendance Dropdown Empty
**Problem:** Teachers couldn't see classes in "Mark Attendance" dropdown

**Solution:**
- Updated loadTeacherMarkSection() to use teacher-specific endpoint
- Backend getMyClasses() returns full class details
- Teachers now see only their assigned classes (security feature)

**Files Modified:**
- server/controllers/teacherController.js
- client/script.js

**Status:** ✅ Fixed - Classes must be assigned to teachers via admin panel

### Fix 4: Student Class Time Column
**Problem:** Students showed "Not set" for class time

**Solution:**
- Added class_time column to students table
- Updated StudentModel to include class_time
- Set default value to '09:00:00'
- Created fix-class-time.bat for easy migration

**Files Modified:**
- server/models/studentModel.js
- server/controllers/adminController.js
- client/script.js
- add-class-time-column.sql

**Status:** ✅ Fixed

### Fix 5: Edit Buttons Not Working
**Problem:** Edit buttons for teachers, students, and classes didn't work

**Solution:**
- Made all edit modal functions async
- Added proper error handling
- Fixed field name handling (camelCase vs snake_case)

**Files Modified:**
- client/script.js (showEditTeacherModal, showEditStudentModal, showEditClassModal)

**Status:** ✅ Fixed

### Fix 6: Student Creation Error
**Problem:** Error when creating students: "Column 'name' cannot be null"

**Solution:**
- Fixed createStudent to use StudentModel.create() directly
- Removed incorrect user creation logic
- Students authenticate with roll number (no users table entry)

**Files Modified:**
- server/controllers/adminController.js

**Status:** ✅ Fixed

### Fix 7: Notification Foreign Key Error
**Problem:** Error when creating teachers due to notification system

**Solution:**
- Disabled notification creation for teachers
- Notifications table only supports students (FK to students table)
- Wrapped student notifications in try-catch

**Files Modified:**
- server/controllers/adminController.js

**Status:** ✅ Fixed

### Fix 8: Teacher 403 Forbidden Error When Marking Attendance
**Problem:** Teachers got "403 Forbidden" error when trying to mark attendance

**Root Cause:** Frontend was calling `/api/admin/students` which requires admin authorization

**Solution:**
- Created new `/api/teacher/students` endpoint for teachers
- Updated APIService to use correct endpoint based on user role
- Teachers now only see students from their assigned classes
- Implemented proper role-based access control (RBAC)

**Files Modified:**
- server/routes/router.js
- server/controllers/teacherController.js (added getStudents method)
- client/apiService.js (updated getAllStudents)
- client/index.html (v43)

**Security Features:**
- Teachers can only access students from assigned classes
- Endpoint validates teacher has access to requested class
- Proper JWT token verification
- Role-based authorization

**Status:** ✅ Fixed - Restart server and hard refresh browser required

**Testing:**
1. Restart server: `node server/server.js`
2. Hard refresh: Ctrl+Shift+R
3. Login as teacher
4. Go to "Mark Attendance"
5. Select class - students should load without errors

### Fix 9: Mark Attendance Not Saving
**Problem:** Teachers could see students but clicking "Save Attendance" didn't work

**Root Causes:**
- Frontend sending records one by one instead of batch
- Data format mismatch between frontend and backend
- Backend expecting methods that don't exist in AttendanceModel

**Solution:**
- Simplified TeacherController.markAttendance to use existing AttendanceModel.create
- Updated frontend to send all records in single batch request
- Removed unnecessary fields (subjectId, endTime)
- Used simple payload: `{ classId, date, startTime, records: [...] }`

**Files Modified:**
- server/controllers/teacherController.js (simplified markAttendance)
- client/script.js (updated saveAttendance)
- client/index.html (v45)

**How It Works:**
1. Teacher marks students as present/absent
2. Frontend collects all marks in `attendanceData` object
3. Single API call with all records
4. Backend saves each record using AttendanceModel.create
5. Database handles duplicates with ON DUPLICATE KEY UPDATE

**Status:** ✅ Fixed - Restart server and hard refresh browser required

**Testing:**
1. Restart server
2. Hard refresh browser (Ctrl+Shift+R)
3. Login as teacher
4. Select class and mark attendance
5. Click "Save Attendance"
6. Should see: "✅ Attendance saved successfully! (X students)"

---

## 🐛 Troubleshooting

### Server Won't Start

**Problem:** Server fails to start or shows connection errors

**Solutions:**
1. Check if MySQL is running
2. Verify `.env` file has correct credentials
3. Check if port 3000 is available
4. Run: `node server/utilities.js testConnection`

### Can't Login

**Problem:** Login fails with incorrect credentials

**Solutions:**
1. Verify credentials (see Login Credentials section)
2. Reset admin password: `manage.bat` → Option 3
3. Check database: `manage.bat` → Option 10

### Teacher Can't See Classes in Mark Attendance

**Problem:** Dropdown is empty or shows only ONE class

**Solutions:**

**If dropdown is empty:**
1. Classes must be assigned to teacher via admin panel
2. Login as admin → Manage Teachers → Edit teacher → Check classes → Save
3. This is correct behavior - teachers only see assigned classes

**If dropdown shows only ONE class:**
1. This means the teacher only has ONE class assigned in the database
2. To assign more classes:
   - Login as admin (admin@example.com / Admin@143)
   - Go to "Manage Teachers"
   - Click "Edit" on the teacher
   - Check multiple classes (BCA A Year 1, BCA B Year 1, etc.)
   - Click "Save Teacher"
   - Logout and login again as teacher
3. Quick SQL fix: Run `assign-multiple-classes-to-sunny.sql` in phpMyAdmin
4. Diagnostic tool: Open `check-teacher-classes.html` to verify API response

### Add Teacher Button Doesn't Save

**Problem:** Error when saving teacher

**Solutions:**
1. Restart server (Ctrl+C, then `node server.js`)
2. Refresh browser (Ctrl+Shift+R)
3. Check contact number is exactly 10 digits
4. Ensure teacher ID is unique

### Student Shows "Not set" for Class Time

**Problem:** Class time not displaying

**Solutions:**
1. Run: `fix-class-time.bat`
2. Or manually: `mysql -u root -p < add-class-time-column.sql`
3. Restart server

### Edit Button Doesn't Work

**Problem:** Edit modal doesn't open or shows errors

**Solutions:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Check browser console for errors (F12)
3. Verify script version is v38 or higher

### Database Connection Failed

**Problem:** Can't connect to database

**Solutions:**
1. Check MySQL is running
2. Verify credentials in `server/.env`
3. Test connection: `manage.bat` → Option 7
4. Check database exists: `SHOW DATABASES;`

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Auth Endpoints

#### POST /auth/login
Login with email/password or roll number
```json
// Admin/Teacher Login
{
  "email": "admin@example.com",
  "password": "Admin@143"
}

// Student Login
{
  "rollNumber": "STU001",
  "password": "Student@143"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Admin Endpoints

#### GET /admin/classes
Get all classes
```
Authorization: Bearer <admin_token>
```

#### POST /admin/classes
Create new class
```json
{
  "class_name": "BCA",
  "class_section": "A",
  "year": 1
}
```

#### PUT /admin/classes/:id
Update class

#### DELETE /admin/classes/:id
Delete class

#### GET /admin/teachers
Get all teachers

#### POST /admin/teachers
Create new teacher
```json
{
  "name": "Teacher Name",
  "email": "teacher@example.com",
  "teacherId": "TCH001",
  "contactNo": "9876543210",
  "password": "Teacher@143",
  "years": [1, 2, 3],
  "classIds": [1, 2, 3]
}
```

#### PUT /admin/teachers/:id
Update teacher

#### DELETE /admin/teachers/:id
Delete teacher

#### GET /admin/students
Get all students

#### POST /admin/students
Create new student
```json
{
  "student_name": "Student Name",
  "email": "student@example.com",
  "roll_number": "STU001",
  "class_id": 1,
  "address": "Address",
  "student_contact": "9876543210",
  "parent_contact": "9876543211",
  "class_time": "09:00:00",
  "password": "Student@143"
}
```

#### PUT /admin/students/:id
Update student

#### DELETE /admin/students/:id
Delete student

### Teacher Endpoints

#### GET /teacher/my-classes
Get teacher's assigned classes
```
Authorization: Bearer <teacher_token>
```

**Response:**
```json
{
  "assignments": [...],
  "classes": [
    {
      "id": 1,
      "class_name": "BCA",
      "class_section": "A",
      "year": 1,
      "class_time": "09:00:00"
    }
  ]
}
```

#### POST /teacher/mark-attendance
Mark attendance for a class
```json
{
  "classId": 1,
  "subjectId": 1,
  "date": "2025-02-17",
  "startTime": "09:00",
  "endTime": "10:00",
  "records": [
    {
      "studentId": 1,
      "status": "present"
    }
  ]
}
```

#### GET /teacher/history/:classId/:subjectId
Get attendance history

### Student Endpoints

#### GET /student/my-attendance
Get student's attendance records
```
Authorization: Bearer <student_token>
```

---

## 🎓 Database Schema

### Tables

#### users
- id (PK)
- name
- email (unique)
- password (hashed)
- role (admin/teacher/student)
- created_at
- updated_at

#### teachers
- id (PK)
- user_id (FK → users)
- teacher_id (unique)
- contact_no
- created_at
- updated_at

#### students
- id (PK)
- student_name
- email (unique)
- roll_number (unique)
- class_id (FK → classes)
- address
- student_contact
- parent_contact
- class_time
- password (hashed)
- created_at
- updated_at

#### classes
- id (PK)
- class_name
- class_section
- year
- academic_year
- created_at
- updated_at

#### subjects
- id (PK)
- subject_name
- subject_code (unique)
- created_at
- updated_at

#### teacher_classes
- id (PK)
- teacher_id (FK → teachers)
- class_id (FK → classes)
- class_time

#### teacher_years
- id (PK)
- teacher_id (FK → teachers)
- year

#### teacher_subjects
- id (PK)
- teacher_id (FK → teachers)
- subject_id (FK → subjects)

#### teacher_assignments
- id (PK)
- teacher_id (FK → teachers)
- class_id (FK → classes)
- subject_id (FK → subjects)
- academic_year

#### attendance
- id (PK)
- class_id (FK → classes)
- student_id (FK → students)
- date
- time
- status (present/absent)
- marked_at

#### notifications
- id (PK)
- student_id (FK → students)
- message
- type (info/warning/success/error)
- is_read
- created_at

---

## 🛠️ Development

### Project Structure
```
Student-Attendance-Management-System/
├── client/
│   ├── index.html          # Main application
│   ├── script.js           # Frontend logic (v38)
│   ├── style.css           # Styles
│   ├── apiService.js       # API calls
│   └── databaseIntegration.js
├── server/
│   ├── server.js           # Express server
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   └── teacherController.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── teacherModel.js
│   │   ├── studentModel.js
│   │   ├── classModel.js
│   │   ├── subjectModel.js
│   │   ├── attendanceModel.js
│   │   └── notificationModel.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   ├── database/
│   │   └── complete-setup-with-data.sql
│   └── utilities.js        # Utility functions
├── manage.bat              # Management tool
└── README.md               # This file
```

### Technologies Used
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt

---

## 📝 Notes

### Important Information

1. **Teacher Security:** Teachers can only see classes assigned to them. This is intentional for security and data privacy.

2. **Student Authentication:** Students authenticate with roll number (not email). They don't have entries in the users table.

3. **Notifications:** The notifications table only supports students (has FK to students table). Teacher notifications are disabled.

4. **Default Passwords:**
   - Admin: Admin@143
   - Teachers: Teacher@143
   - Students: Student@143

5. **Contact Fields:** Teachers use `contact_no` field (not phone). The phone field was removed to match database schema.

6. **Class Time:** Default class time is 09:00:00. Can be customized per teacher-class assignment.

7. **Academic Year:** Auto-generated based on current date (June-May cycle).

### Server Restart Required

After making these changes, restart your server:
```bash
# Stop server: Ctrl+C
# Start server:
cd server
node server.js
```

### Browser Cache

If changes don't appear, hard refresh:
```bash
Ctrl+Shift+R  (Windows/Linux)
Cmd+Shift+R   (Mac)
```

---

## 🎯 Current System Status

### Teachers in System
1. **Shruti Sudheer Teli** (S1) - shrutiteli571@gmail.com
2. **sunny** (TCH002) - sunny@gmail.com
3. **Booby** (TCH003) - booby@gmail.com
4. **Rocky** (TCH004) - roc@gmail.com

All teachers use password: **Teacher@143**

### Classes in System
- BCA (A/B) - Years 1, 2, 3
- MCA (A/B) - Year 1
- B.Tech CS (A/B) - Year 1
- Plus any custom classes you've added (python, java, etc.)

### System Status
✅ Backend: Working
✅ Frontend: Working (v38)
✅ Database: Connected
✅ Authentication: Working
✅ Teacher Management: Working
✅ Student Management: Working
✅ Class Management: Working
✅ Attendance System: Working

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Run diagnostics: `manage.bat` → Option 8
3. Check browser console (F12) for errors
4. Verify server logs

---

## 📄 License

This is a student project for educational purposes.

---

**Last Updated:** February 17, 2025
**Version:** 1.0
**Script Version:** v38
