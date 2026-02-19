# 🎓 Student Attendance Management System

## 🚀 Complete Setup with Mock Data

This system comes pre-configured with:
- ✅ 1 Admin account
- ✅ 4 Teacher accounts  
- ✅ 40 Student accounts
- ✅ 10 Classes (BCA, MCA, B.Tech CS)
- ✅ 10 Subjects
- ✅ Sample attendance records

---

## ⚡ Quick Setup (5 Minutes)

### 1️⃣ Import Database
```bash
import-database-with-data.bat
```

### 2️⃣ Install Dependencies
```bash
cd server
npm install
```

### 3️⃣ Start Server
```bash
npm start
```

### 4️⃣ Open Application
Open `client/index.html` in your browser

### 5️⃣ Login
- **Admin:** admin@example.com / Admin@143
- **Teacher:** shrutiteli571@gmail.com / Teacher@143
- **Student:** BCA1A001 (Rahul Verma) / Student@143

---

## 📁 Project Structure

```
├── client/                          # Frontend
│   ├── index.html                  # Main application
│   ├── script.js                   # JavaScript logic
│   └── style.css                   # Styles
│
├── server/                          # Backend
│   ├── server.js                   # Main server
│   ├── .env                        # Configuration
│   ├── config/                     # Database config
│   ├── controllers/                # Business logic
│   ├── models/                     # Data models
│   ├── routes/                     # API routes
│   └── database/
│       ├── schema.sql              # Original schema
│       └── schema_with_data.sql    # Schema + Mock Data ⭐
│
├── QUICK_START.md                  # 5-minute setup guide
├── CREDENTIALS.md                  # All login credentials
├── SETUP_GUIDE.md                  # Detailed setup
├── readme.md                       # Full documentation
│
└── import-database-with-data.bat   # Database import script ⭐
```

---

## 🔐 Login Credentials

### Admin Access
```
Email: admin@example.com
Password: Admin@143
```

### Teacher Access (4 teachers available)
```
Email: shrutiteli571@gmail.com
Password: Teacher@143
```

### Student Access (40 students available)
```
Roll Number: BCA1A001
Name: Rahul Verma
Password: Student@143
```

**See `CREDENTIALS.md` for complete list**

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `START_HERE.md` | This file - Quick overview |
| `QUICK_START.md` | 5-minute setup guide |
| `CREDENTIALS.md` | All 45 login credentials |
| `SETUP_GUIDE.md` | Detailed setup instructions |
| `readme.md` | Complete system documentation |

---

## 🎯 Features

### Admin Dashboard
- ✅ Manage Classes
- ✅ Manage Teachers
- ✅ Manage Students
- ✅ View Reports
- ✅ System Settings

### Teacher Dashboard
- ✅ Mark Attendance
- ✅ View History
- ✅ Export Reports
- ✅ Time-restricted marking (9 AM - 10:30 AM)

### Student Dashboard
- ✅ View Personal Attendance
- ✅ Check Percentage
- ✅ View Notifications
- ✅ Monthly Reports

---

## 🛠️ Technology Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- LocalStorage API
- Responsive Design

**Backend:**
- Node.js (Pure HTTP, no Express)
- MySQL Database
- JWT Authentication
- bcrypt Password Hashing

---

## 🔧 Configuration

The `.env` file is already configured:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=attendance_system
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
```

**For XAMPP:** Password is empty (default)  
**For custom MySQL:** Update `DB_PASSWORD`

---

## 🧪 Testing

### Test Files Available:
- `TEST_LOGIN_COMPLETE.html` - Test all login types
- `TEST_STUDENT_LOGIN.html` - Test student login
- `test-api-endpoints.html` - Test API endpoints

### Test Database Connection:
```bash
cd server
node test-connection.js
```

Or use:
```bash
check-database.bat
```

---

## 📊 Mock Data Summary

| Category | Count |
|----------|-------|
| Admin | 1 |
| Teachers | 4 |
| Students | 40 |
| Classes | 10 |
| Subjects | 10 |
| Attendance Records | Sample data for 3 days |

### Classes Available:
- BCA Year 1, 2, 3 (Sections A & B)
- MCA Year 1 (Sections A & B)
- B.Tech CS Year 1 (Sections A & B)

### Subjects Available:
- Programming in C
- Data Structures
- Database Management
- Web Development
- Java Programming
- Python Programming
- Machine Learning
- Software Engineering
- Computer Networks
- Operating Systems

---

## 🚨 Troubleshooting

### Issue: MySQL not running
**Solution:** Start XAMPP/WAMP Control Panel → Start MySQL

### Issue: Port 3000 in use
**Solution:** Edit `server/.env` and change `PORT=3001`

### Issue: Database import failed
**Solution:** 
1. Check MySQL is running
2. Verify password (empty for XAMPP)
3. Run: `check-database.bat`

### Issue: Can't login
**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check console for errors (F12)
4. Verify credentials from `CREDENTIALS.md`

---

## 🎓 Learning Resources

1. **Admin Guide:** See `readme.md` → User Guide → For Admin Users
2. **Teacher Guide:** See `readme.md` → User Guide → For Teacher Users
3. **Student Guide:** See `readme.md` → User Guide → For Student Users
4. **API Documentation:** See `readme.md` → API Endpoints

---

## 🔒 Security Notes

⚠️ **IMPORTANT:** Current credentials are for development only!

**For Production:**
- [ ] Change all default passwords
- [ ] Use strong passwords (min 12 characters)
- [ ] Update JWT_SECRET in .env
- [ ] Enable HTTPS
- [ ] Implement rate limiting
- [ ] Add CORS configuration
- [ ] Set up database backups

---

## 🎉 You're All Set!

The system is ready with complete mock data. Start exploring:

1. **Login as Admin** → Explore all features
2. **Login as Teacher** → Mark attendance
3. **Login as Student** → View your records

**Need help?** Check the documentation files listed above.

---

**Happy Coding! 🚀**

*Version: 2.0 with Mock Data*  
*Last Updated: February 2026*
