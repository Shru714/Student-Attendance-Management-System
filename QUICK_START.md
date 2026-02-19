# ⚡ Quick Start Guide - 5 Minutes Setup

## Step 1: Import Database (1 minute)
```bash
import-database-with-data.bat
```
Enter MySQL password when prompted (empty for XAMPP)

## Step 2: Install Dependencies (2 minutes)
```bash
cd server
npm install
```

## Step 3: Start Server (30 seconds)
```bash
npm start
```
Server runs on: http://localhost:3000

## Step 4: Open Application (30 seconds)
Open in browser: `client/index.html`

## Step 5: Login (30 seconds)

### Try Admin:
- Email: `admin@example.com`
- Password: `Admin@143`

### Try Teacher:
- Email: `shrutiteli571@gmail.com`
- Password: `Teacher@143`

### Try Student:
- Roll: `BCA1A001`
- Name: `Rahul Verma`
- Password: `Student@143`

---

## ✅ What You Get

- **1 Admin** - Full system access
- **4 Teachers** - Mark attendance, view reports
- **40 Students** - Across 10 classes
- **10 Classes** - BCA, MCA, B.Tech CS
- **10 Subjects** - Programming, Database, etc.
- **Sample Data** - Attendance records for testing

---

## 🔧 Troubleshooting

### MySQL not running?
- Open XAMPP/WAMP Control Panel
- Click "Start" next to MySQL

### Port 3000 in use?
Edit `server/.env`:
```
PORT=3001
```

### Database import failed?
Check MySQL password in import command

---

## 📚 Full Documentation

- `CREDENTIALS.md` - All login credentials
- `SETUP_GUIDE.md` - Detailed setup instructions
- `readme.md` - Complete documentation

---

## 🎯 Next Steps

1. **Explore Admin Dashboard**
   - View all classes and students
   - Check teacher assignments
   - View attendance reports

2. **Test Teacher Features**
   - Login as teacher
   - Mark attendance for your class
   - View attendance history

3. **Test Student Features**
   - Login as student
   - View personal attendance
   - Check attendance percentage

---

**You're ready to go! 🚀**
