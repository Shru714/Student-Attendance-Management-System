# API Testing Guide - Enhanced Attendance System

## 🚀 Quick Start

1. **Setup Database:**
```bash
mysql -u root -p < server/database/schema.sql
```

2. **Update .env file:**
```env
DB_PASSWORD=your_actual_mysql_password
```

3. **Install & Start Server:**
```bash
cd server
npm install
npm start
```

Server runs on: `http://localhost:5000`

---

## 📋 API Test Examples

### 1️⃣ **Manage Class - Auto Year Save**

**Create Class (Academic Year Auto-Generated):**
```bash
curl -X POST http://localhost:5000/api/admin/classes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "className": "BCA",
    "year": 1
  }'
```

**Response:**
```json
{
  "message": "Class created successfully",
  "id": 1,
  "academicYear": "2025-2026"
}
```

---

### 2️⃣ **Manage Teacher - Enhanced with Unique ID, Contact & Multi-Select**

**Create Subject First:**
```bash
curl -X POST http://localhost:5000/api/admin/subjects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "subjectName": "Mathematics",
    "subjectCode": "MATH101"
  }'
```

**Create Teacher with Enhanced Fields:**
```bash
curl -X POST http://localhost:5000/api/admin/teachers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Dr. John Smith",
    "email": "john@example.com",
    "phone": "1234567890",
    "teacherId": "TCH001",
    "contactNo": "9876543210",
    "subjectIds": [1, 2, 3],
    "years": [1, 2, 3],
    "classIds": [1, 2]
  }'
```

**Response:**
```json
{
  "message": "Teacher created successfully",
  "userId": 2,
  "teacherId": "TCH001"
}
```

**Notification sent to teacher:**
> "Welcome! Your Teacher ID is TCH001. You have been assigned subjects and classes for the academic year 2025-2026."

**Update Teacher:**
```bash
curl -X PUT http://localhost:5000/api/admin/teachers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "id": 1,
    "contactNo": "9999999999",
    "subjectIds": [1, 2],
    "years": [1, 2],
    "classIds": [1]
  }'
```

**Get Teacher Profile:**
```bash
curl "http://localhost:5000/api/teacher/profile" \
  -H "Authorization: Bearer TEACHER_JWT_TOKEN"
```

**Response:**
```json
{
  "id": 1,
  "userId": 2,
  "teacherId": "TCH001",
  "contactNo": "9876543210",
  "name": "Dr. John Smith",
  "email": "john@example.com",
  "subjects": [
    { "id": 1, "subjectName": "Mathematics", "subjectCode": "MATH101" },
    { "id": 2, "subjectName": "Physics", "subjectCode": "PHY101" }
  ],
  "years": [1, 2, 3],
  "classes": [
    { "id": 1, "className": "BCA", "year": 1 },
    { "id": 2, "className": "MCA", "year": 1 }
  ]
}
```

---

### 3️⃣ **Manage Student - Auto Roll Number & Password**

**Create Single Student:**
```bash
curl -X POST http://localhost:5000/api/admin/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "classId": 1,
    "address": "123 Main St, Mumbai",
    "studentContact": "9876543210",
    "parentContact": "9876543211"
  }'
```

**Response:**
```json
{
  "message": "Student created successfully",
  "studentId": 1,
  "rollNumber": "BCA25001",
  "password": "a7x9k2m5"
}
```

**Notification sent to student:**
> "Your account has been created. Roll Number: BCA25001. Password: a7x9k2m5. Please login and change your password."

---

**Bulk Create Students:**
```bash
curl -X POST http://localhost:5000/api/admin/students/bulk \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "students": [
      {
        "name": "Student 1",
        "email": "student1@example.com",
        "classId": 1,
        "address": "Address 1",
        "studentContact": "1111111111",
        "parentContact": "2222222222"
      },
      {
        "name": "Student 2",
        "email": "student2@example.com",
        "classId": 1,
        "address": "Address 2",
        "studentContact": "3333333333",
        "parentContact": "4444444444"
      }
    ]
  }'
```

**Response:**
```json
{
  "message": "Bulk creation completed",
  "results": [
    {
      "success": true,
      "studentId": 2,
      "rollNumber": "BCA25002",
      "password": "x5y8z3a1"
    },
    {
      "success": true,
      "studentId": 3,
      "rollNumber": "BCA25003",
      "password": "m9n2p7q4"
    }
  ]
}
```

---

### 4️⃣ **Live Attendance - Time Restriction (9:00 AM - 10:30 AM)**

**Mark Attendance (Within Time Window):**
```bash
curl -X POST http://localhost:5000/api/teacher/mark-attendance \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TEACHER_JWT_TOKEN" \
  -d '{
    "classId": 1,
    "subjectId": 1,
    "date": "2025-02-08",
    "startTime": "09:00",
    "endTime": "10:00",
    "records": [
      { "studentId": 1, "status": "Present" },
      { "studentId": 2, "status": "Absent" },
      { "studentId": 3, "status": "Present" }
    ]
  }'
```

**Success Response (Before 10:30 AM):**
```json
{
  "message": "Attendance marked successfully"
}
```

**Error Response (After 10:30 AM):**
```json
{
  "message": "Attendance time closed. Attendance for 09:00-10:00 must be marked before 10:30"
}
```

---

### 5️⃣ **Attendance Shortage Notification (<50%)**

**Check Low Attendance:**
```bash
curl -X POST http://localhost:5000/api/admin/check-low-attendance \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "message": "Low attendance notifications sent",
  "count": 2
}
```

**Notifications sent:**
- To Student: "Your attendance is 45.50% which is below 50%. Please improve your attendance."
- To Parent: SMS/Email notification (console log in development)

---

### 6️⃣ **Attendance Reports**

**Student Report:**
```bash
curl "http://localhost:5000/api/admin/attendance?studentId=1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Date Report:**
```bash
curl "http://localhost:5000/api/admin/attendance?date=2025-02-08" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Subject Report:**
```bash
curl "http://localhost:5000/api/admin/attendance?subjectId=1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Combined Filters:**
```bash
curl "http://localhost:5000/api/admin/attendance?studentId=1&date=2025-02-08&subjectId=1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
[
  {
    "date": "2025-02-08",
    "className": "BCA",
    "subjectName": "Mathematics",
    "studentName": "Rahul Sharma",
    "rollNumber": "BCA25001",
    "status": "Present"
  }
]
```

---

### 7️⃣ **Student Notifications**

**Get Notifications:**
```bash
curl "http://localhost:5000/api/student/notifications" \
  -H "Authorization: Bearer STUDENT_JWT_TOKEN"
```

**Response:**
```json
[
  {
    "id": 1,
    "message": "Your account has been created. Roll Number: BCA25001. Password: a7x9k2m5.",
    "type": "info",
    "isRead": false,
    "created_at": "2025-02-08T10:30:00.000Z"
  },
  {
    "id": 2,
    "message": "Your attendance is 45.50% which is below 50%. Please improve your attendance.",
    "type": "warning",
    "isRead": false,
    "created_at": "2025-02-08T11:00:00.000Z"
  }
]
```

---

## 🔐 Authentication Flow

1. **Login:**
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

2. **Use Token:**
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ✅ Feature Checklist

| Feature | Endpoint | Status |
|---------|----------|--------|
| Auto Academic Year | POST /api/admin/classes | ✅ |
| Unique Teacher ID | POST /api/admin/teachers | ✅ |
| Teacher Contact Number | POST /api/admin/teachers | ✅ |
| Multi-Subject Teacher | POST /api/admin/teachers | ✅ |
| Multi-Year Teacher | POST /api/admin/teachers | ✅ |
| Multi-Class Teacher | POST /api/admin/teachers | ✅ |
| Teacher Profile | GET /api/teacher/profile | ✅ |
| Update Teacher | PUT /api/admin/teachers | ✅ |
| Teacher Notification | POST /api/admin/teachers | ✅ |
| Auto Roll Number | POST /api/admin/students | ✅ |
| Auto Password | POST /api/admin/students | ✅ |
| Bulk Students | POST /api/admin/students/bulk | ✅ |
| Student Notification | POST /api/admin/students | ✅ |
| Time-Restricted Attendance | POST /api/teacher/mark-attendance | ✅ |
| Low Attendance Alert | POST /api/admin/check-low-attendance | ✅ |
| Student Report | GET /api/admin/attendance?studentId= | ✅ |
| Date Report | GET /api/admin/attendance?date= | ✅ |
| Subject Report | GET /api/admin/attendance?subjectId= | ✅ |

---

## 📊 Database Verification

**Check Auto-Generated Roll Numbers:**
```sql
SELECT rollNumber, name FROM students ORDER BY rollNumber;
```

**Check Notifications:**
```sql
SELECT u.name, n.message, n.type, n.created_at 
FROM notifications n 
JOIN users u ON n.userId = u.id 
ORDER BY n.created_at DESC;
```

**Check Teacher Assignments:**
```sql
SELECT 
  t.teacherId,
  u.name as teacher,
  t.contactNo,
  GROUP_CONCAT(DISTINCT s.subjectName) as subjects,
  GROUP_CONCAT(DISTINCT ty.year) as years,
  GROUP_CONCAT(DISTINCT c.className) as classes
FROM teachers t
JOIN users u ON t.userId = u.id
LEFT JOIN teacher_subjects ts ON t.id = ts.teacherId
LEFT JOIN subjects s ON ts.subjectId = s.id
LEFT JOIN teacher_years ty ON t.id = ty.teacherId
LEFT JOIN teacher_classes tc ON t.id = tc.teacherId
LEFT JOIN classes c ON tc.classId = c.id
GROUP BY t.id, t.teacherId, u.name, t.contactNo;
```

**Check Low Attendance:**
```sql
SELECT 
  u.name,
  COUNT(*) as total,
  SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) as present,
  (SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) / COUNT(*) * 100) as percentage
FROM students s
JOIN users u ON s.userId = u.id
JOIN attendance_records ar ON s.id = ar.studentId
GROUP BY s.id, u.name
HAVING percentage < 50;
```

---

## 🎯 Success Criteria

All features are implemented and working:
- ✅ Academic year auto-generates based on current month
- ✅ Teachers have unique teacher IDs (e.g., TCH001)
- ✅ Teachers have dedicated contact numbers
- ✅ Teachers can be assigned multiple subjects
- ✅ Teachers can be assigned multiple years
- ✅ Teachers can be assigned multiple classes
- ✅ Roll numbers auto-generate in format: ClassCode + Year + Number
- ✅ Passwords auto-generate for students
- ✅ Attendance marking restricted to time windows
- ✅ Low attendance triggers automatic notifications
- ✅ Reports can be filtered by student, date, and subject
- ✅ All notifications are stored and retrievable

---

## 📞 Support

For issues, check:
1. Database connection in `.env`
2. JWT token validity
3. Server logs for detailed errors
4. MySQL query logs
