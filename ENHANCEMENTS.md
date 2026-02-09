# System Enhancements - Student Attendance Management System

## 🚀 New Features Implemented

### 1. **Auto Academic Year Generation**
- Automatically calculates academic year based on current date
- Logic: If month >= June → Current Year - Next Year, else Previous Year - Current Year
- Example: In July 2025 → "2025-2026", In March 2025 → "2024-2025"

### 2. **Enhanced Teacher Management**
- **Multi-Subject Assignment**: Teachers can be assigned multiple subjects
- **Multi-Class Assignment**: Teachers can teach multiple classes
- **Subject-Class Mapping**: Each teacher can teach different subjects to different classes
- **Checkbox for Class Teacher**: Mark if teacher is a class teacher
- **Automatic Notifications**: Teachers receive notifications when assigned

### 3. **Advanced Student Management**
- **Auto Roll Number Generation**: Format `<ClassCode><YearLast2Digits><IncrementNumber>`
  - Example: BCA25001, BCA25002, etc.
- **Bulk Student Creation**: Add multiple students at once
- **Auto Password Generation**: Random 8-character passwords generated
- **Enhanced Fields**:
  - Name
  - Email
  - Address
  - Student Contact Number
  - Parent Contact Number
  - Auto-generated Roll Number
- **Password Management**: Admin can reset individual student passwords
- **Automatic Notifications**: Students receive credentials via notification

### 4. **Time-Restricted Attendance**
- **Time Window Enforcement**: Attendance can only be marked during specified time slots
- **Example**: 9:00 AM - 10:00 AM class
  - Attendance marking allowed until 10:30 AM (30-minute grace period)
  - After 10:30 AM, attendance is locked
- **Auto-Lock Feature**: Attendance automatically locks after grace period expires
- **Subject-Based Attendance**: Track attendance per subject, not just per class

### 5. **Low Attendance Alert System**
- **Automatic Monitoring**: System checks attendance percentage for all students
- **Threshold**: Default 50% (configurable in database)
- **Multi-Level Notifications**:
  - Student receives notification
  - Parent receives notification (via phone/email in production)
- **Warning Type**: Marked as "warning" level notification

### 6. **Enhanced Attendance Reports**
- **Student Report**: Filter by specific student
- **Date Report**: Filter by specific date
- **Subject Report**: Filter by specific subject
- **Combined Filters**: Mix and match filters
- **Export Options**:
  - CSV Download
  - PDF Download (ready for implementation)

### 7. **Notification System**
- **User Notifications**: Each user has a notification inbox
- **Notification Types**: info, warning, alert
- **Read/Unread Status**: Track which notifications have been read
- **Automatic Triggers**:
  - Teacher assignment
  - Student account creation
  - Low attendance warnings
  - Password changes

## 📊 Database Schema Updates

### New Tables:
1. **subjects** - Store subject information
2. **teacher_assignments** - Many-to-many relationship for teacher-class-subject
3. **notifications** - User notification system
4. **attendance_settings** - Configurable system settings

### Enhanced Tables:
1. **users** - Added phone and address fields
2. **students** - Added parentPhone field
3. **attendance** - Added subjectId, startTime, endTime, isLocked fields
4. **classes** - Removed teacherId (moved to teacher_assignments)

## 🔌 New API Endpoints

### Admin Endpoints:
```
POST   /api/admin/subjects              - Create subject
GET    /api/admin/subjects              - Get all subjects
POST   /api/admin/students/bulk         - Bulk create students
PUT    /api/admin/students/password     - Update student password
POST   /api/admin/check-low-attendance  - Check and notify low attendance
GET    /api/admin/attendance?filters    - Get filtered attendance reports
```

### Teacher Endpoints:
```
GET    /api/teacher/my-classes          - Get assigned classes
GET    /api/teacher/my-subjects         - Get assigned subjects
POST   /api/teacher/mark-attendance     - Mark attendance (time-restricted)
GET    /api/teacher/history?classId&subjectId - Get attendance history
```

### Student Endpoints:
```
GET    /api/student/notifications       - Get user notifications
PUT    /api/student/notifications/read  - Mark notification as read
```

## 🎯 Key Features Summary

| Feature | Status | Description |
|---------|--------|-------------|
| Auto Academic Year | ✅ | Automatically calculated based on date |
| Multi-Subject Teachers | ✅ | Teachers can teach multiple subjects |
| Multi-Class Teachers | ✅ | Teachers can teach multiple classes |
| Auto Roll Number | ✅ | Format: ClassCode + Year + Number |
| Bulk Student Creation | ✅ | Add multiple students at once |
| Auto Password Generation | ✅ | Random 8-char passwords |
| Time-Restricted Attendance | ✅ | Enforced time windows with grace period |
| Auto-Lock Attendance | ✅ | Locks after grace period |
| Low Attendance Alerts | ✅ | Automatic notifications below 50% |
| Notification System | ✅ | In-app notification inbox |
| Enhanced Reports | ✅ | Filter by student/date/subject |
| CSV Export | ✅ | Download attendance reports |

## 🔧 Configuration

### Attendance Settings (in database):
```sql
attendanceWindow: 30 minutes (grace period)
lowAttendanceThreshold: 50.00%
autoLockAfterMinutes: 30
```

### Time Window Example:
```
Class Time: 9:00 AM - 10:00 AM
Marking Allowed Until: 10:30 AM
Auto-Lock At: 10:30 AM
```

## 📝 Usage Examples

### 1. Create Teacher with Multiple Assignments:
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

### 2. Bulk Create Students:
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
}
```

### 3. Mark Attendance (Time-Restricted):
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

### 4. Get Filtered Reports:
```
GET /api/admin/attendance?studentId=1&date=2025-02-08&subjectId=1
```

## 🚀 Next Steps

1. **Frontend Integration**: Update frontend to use new API endpoints
2. **Email/SMS Integration**: Implement actual email/SMS for notifications
3. **PDF Export**: Implement PDF generation for reports
4. **Dashboard Analytics**: Add charts and graphs for attendance trends
5. **Mobile App**: Consider mobile app for easier attendance marking

## 📞 Support

For issues or questions, refer to the API documentation or contact the development team.
