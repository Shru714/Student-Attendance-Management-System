# Student Attendance Management System - Setup Guide

## 🎯 Quick Setup (5 Minutes)

### Prerequisites
- Node.js installed (v14+)
- MySQL/XAMPP/WAMP installed
- Modern web browser

### Step 1: Database Setup WITH MOCK DATA (Choose One Method)

#### Method A: Using Batch File (Easiest - Windows)
```bash
import-database-with-data.bat
```
This imports the database with:
- 1 Admin, 4 Teachers, 40 Students
- 10 Classes, 10 Subjects
- Sample attendance records

#### Method B: Using XAMPP/WAMP phpMyAdmin
1. Start XAMPP/WAMP Control Panel
2. Click "Start" for Apache and MySQL
3. Open phpMyAdmin: http://localhost/phpmyadmin
4. Click "Import" tab
5. Choose file: `server/database/schema_with_data.sql`
6. Click "Go"

#### Method C: Using Command Line
```bash
mysql -u root -p < server/database/schema_with_data.sql
```

### Step 2: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 3: Configure Environment
The `.env` file has been created with default settings:
- Database: `attendance_system`
- Port: `3000`
- Password: Empty (for XAMPP)

If you have a MySQL password, edit `server/.env` and update `DB_PASSWORD`

### Step 4: Start the Server
```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:3000
✅ Database connected successfully!
```

### Step 5: Open the Application
Open in your browser:
- Main app: `client/index.html`
- Test login: `TEST_LOGIN_COMPLETE.html`
- Student test: `TEST_STUDENT_LOGIN.html`

## 🔑 Default Login Credentials

### Admin
- Email: `admin@example.com`
- Password: `Admin@143`

### Teacher (Example)
- Email: `shrutiteli571@gmail.com`
- Password: `Teacher@143`

### Student (Example)
- Roll Number: `BCA1A001`
- Name: `Rahul Verma`
- Password: `Student@143`

**See CREDENTIALS.md for complete list of all 40 students and 4 teachers**

## 🧪 Testing the Setup

### Test 1: Check Database Connection
```bash
cd server
node test-connection.js
```

### Test 2: Check Database via Batch File
```bash
check-database.bat
```

### Test 3: Open Test Files
1. Open `TEST_LOGIN_COMPLETE.html` in browser
2. Try logging in with admin credentials
3. Try student login with demo credentials

## 📁 Project Structure

```
├── client/                 # Frontend
│   ├── index.html         # Main application
│   ├── script.js          # JavaScript logic
│   └── style.css          # Styles
├── server/                # Backend
│   ├── server.js          # Main server
│   ├── .env              # Configuration (created)
│   ├── config/           # Database config
│   ├── controllers/      # Business logic
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   └── database/         # SQL schemas
└── Test files            # For testing

```

## 🔧 Troubleshooting

### Issue: "ECONNREFUSED"
**Solution:** MySQL is not running
- Open XAMPP/WAMP Control Panel
- Click "Start" next to MySQL

### Issue: "Access denied"
**Solution:** Wrong password
- For XAMPP: Set `DB_PASSWORD=` (empty)
- For custom MySQL: Use your actual password in `.env`

### Issue: "Unknown database"
**Solution:** Database not imported
- Run: `mysql -u root -p < server/database/schema.sql`
- Or use phpMyAdmin import

### Issue: Port 3000 already in use
**Solution:** Change port in `.env`
```
PORT=3001
```

## 🚀 Next Steps

1. **Explore Admin Dashboard**
   - Add classes
   - Add teachers
   - Add students

2. **Test Teacher Features**
   - Mark attendance
   - View history

3. **Test Student Features**
   - View attendance
   - Check percentage

4. **Customize**
   - Change time restrictions
   - Modify attendance rules
   - Add new features

## 📚 Key Features

✅ Role-based access (Admin, Teacher, Student)
✅ Time-restricted attendance (9 AM - 10:30 AM)
✅ Auto roll number generation
✅ JWT authentication
✅ Notifications system
✅ CSV/PDF export
✅ Responsive design

## 🆘 Need Help?

1. Check `readme.md` for detailed documentation
2. Review browser console (F12) for errors
3. Check server logs in terminal
4. Run diagnostic scripts:
   - `check-database.bat`
   - `node diagnose-save-issue.js`

## 🎉 You're All Set!

The system is ready to use. Start by logging in as admin and exploring the features.

**Happy coding!** 🚀
