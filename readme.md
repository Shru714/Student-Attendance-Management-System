# Student Attendance Management System

A comprehensive web-based attendance management system for educational institutions with separate dashboards for Admin, Teachers, and Students.

## 🚀 Quick Start

### Option 1: Using START_APP.bat (Recommended for Windows)
1. Double-click `START_APP.bat`
2. Select option 3 to import database with demo data
3. Select option 1 to open the application
4. Login with credentials below

### Option 2: Manual Setup
1. Import database: `mysql -u root -p < server/database/schema_with_data.sql`
2. Start backend: `cd server && npm start`
3. Open `app/index.html` in browser

## 🔑 Login Credentials

### Admin
- **Email:** admin@example.com
- **Password:** Admin@143

### Teacher
- **Email:** shrutiteli571@gmail.com
- **Password:** Teacher@143
- Other teachers: rajesh@example.com, priya@example.com, amit@example.com

### Student
- **Name:** Rahul Verma
- **Roll Number:** PHP25001
- **Password:** Student@143

**All students use password:** Student@143
- Roll Numbers: PHP25001, PHP25002, PHP25003, Java25001, Java25002, Rprog25001, C25001, Python25001

## 📋 Features

### Admin Dashboard
- **Manage Classes** - Add, edit, delete classes with sections and academic years
- **Manage Teachers** - Teacher profiles with auto-generated IDs (TCH001, TCH002...)
- **Manage Students** - Student records with roll numbers and contact details
- **Leave Management** - Approve/reject leave requests for teachers and students
- **Attendance Reports** - View and download attendance by student or date
- **Statistics** - Real-time dashboard with total counts

### Teacher Dashboard
- **Mark Attendance** - Quick attendance marking for assigned classes
- **View History** - Check past attendance records
- **Class Management** - View assigned classes and students
- **Leave Requests** - Submit leave applications

### Student Dashboard
- **View Attendance** - Personal attendance records and statistics
- **Attendance Percentage** - Track attendance performance
- **Leave History** - View submitted leave requests and status

## 🆕 Recent Updates

### Leave Management System
- Added "Leave" button in Manage Teachers and Manage Students
- Submit leave requests with date range and reason
- Approve/reject functionality with status tracking
- Color-coded status: 🟢 Approved, 🔴 Rejected, 🟠 Pending
- Complete leave history for each person

### Attendance Reports Fix
- Fixed class filter in Date Report tab
- Now correctly filters by selected class
- Visual indicator shows selected class in stats
- Enhanced debugging for troubleshooting

### Teacher ID Auto-Generation
- Automatic Teacher ID generation (TCH001, TCH002, etc.)
- Auto-fixes existing teachers without IDs
- Sequential numbering system

### UI Improvements
- Fixed table alignment in Manage Teachers
- Fixed email and contact overflow issues
- Action buttons properly aligned
- Responsive design for all screen sizes

## 🛠️ Technical Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- LocalStorage for data persistence
- Responsive design with gradient UI

### Backend
- Node.js with Express
- MySQL database
- RESTful API architecture

### Database
- MySQL 8.0+
- Tables: users, classes, teachers, students, attendance, leaves

## 📁 Project Structure

```
├── app/                    # Frontend application
│   ├── index.html         # Main HTML file
│   ├── script.js          # JavaScript logic
│   └── style.css          # Styling
├── client/                # Alternative frontend
│   ├── index.html
│   ├── script.js
│   └── style.css
├── server/                # Backend server
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication middleware
│   ├── database/         # SQL schema files
│   └── server.js         # Main server file
└── START_APP.bat         # Windows launcher script
```

## 🔧 Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm (comes with Node.js)

### Step 1: Clone Repository
```bash
git clone https://github.com/Shru714/Student-Attendance-Management-System.git
cd Student-Attendance-Management-System
```

### Step 2: Install Dependencies
```bash
cd server
npm install
```

### Step 3: Configure Database
1. Create `.env` file in `server/` directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=attendance_system
PORT=3001
JWT_SECRET=your_secret_key
```

### Step 4: Import Database
```bash
mysql -u root -p < server/database/schema_with_data.sql
```

### Step 5: Start Backend Server
```bash
cd server
npm start
```

### Step 6: Open Frontend
Open `app/index.html` in your browser or use a local server:
```bash
cd app
npx http-server . -p 8080
```

## 📊 Demo Data

The system includes demo data:
- **5 Classes:** PHP-B, Java-B, R programming-A, C-A, Python-A
- **3 Teachers:** Dr. Rajesh Kumar, Prof. Priya Sharma, Dr. Amit Patel
- **8 Students:** Across different classes
- **Sample Attendance:** Records for the last 3 days

## 🎯 Usage Guide

### Marking Attendance (Teacher)
1. Login as teacher
2. Select class from dropdown
3. Select date and time
4. Mark Present/Absent for each student
5. Click "Save Attendance"

### Viewing Reports (Admin)
1. Login as admin
2. Go to "Attendance Reports"
3. Choose "Student Report" or "Date Report"
4. Apply filters (student, date range, class)
5. Download as CSV or PDF

### Managing Leaves (Admin)
1. Go to "Manage Teachers" or "Manage Students"
2. Click "Leave" button for any person
3. View leave history
4. Submit new leave request or approve/reject existing ones

## 🔐 Security Features

- Password validation with specific format requirements
- Role-based access control (Admin, Teacher, Student)
- Session management with localStorage
- Input validation and sanitization
- SQL injection prevention

## 🐛 Troubleshooting

### Database Connection Failed
- Check MySQL is running: `mysql -u root -p`
- Verify credentials in `.env` file
- Ensure database exists: `SHOW DATABASES;`

### Frontend Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Ensure all files are in correct directories

### Attendance Not Saving
- Check browser console for errors
- Verify localStorage is enabled
- Try clearing localStorage and reloading demo data

### Leave Button Not Visible
- Clear browser cache
- Refresh page (Ctrl+F5)
- Check that you're logged in as Admin

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Classes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Create class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

### Teachers
- `GET /api/teachers` - Get all teachers
- `POST /api/teachers` - Create teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/student/:id` - Get student attendance
- `GET /api/attendance/date/:date` - Get date-wise attendance

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👥 Authors

- **Shruti** - Initial work - [Shru714](https://github.com/Shru714)

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern attendance management needs
- Built with ❤️ for educational institutions

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review troubleshooting section above

## 🔄 Version History

### v2.0 (Current)
- ✅ Added Leave Management System
- ✅ Fixed Attendance Reports class filtering
- ✅ Auto-generate Teacher IDs
- ✅ Fixed table alignment issues
- ✅ Improved UI/UX
- ✅ Enhanced error handling

### v1.0
- Initial release
- Basic attendance management
- Admin, Teacher, Student dashboards
- Database integration

---

**Made with ❤️ for better education management**
