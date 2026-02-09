# 🚀 Quick Start Guide

## Get Your Enhanced Attendance System Running in 5 Minutes!

---

## ⚡ Prerequisites

- ✅ Node.js installed
- ✅ MySQL installed and running
- ✅ Git (already have the code)

---

## 📝 Step-by-Step Setup

### 1️⃣ **Setup Database** (2 minutes)

```bash
# Login to MySQL
mysql -u root -p

# Run the schema
mysql -u root -p < server/database/schema.sql

# Exit MySQL
exit
```

---

### 2️⃣ **Configure Environment** (1 minute)

Edit `server/.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_ACTUAL_MYSQL_PASSWORD_HERE
DB_NAME=attendance_system
JWT_SECRET=change_this_to_random_string_in_production
JWT_EXPIRE=7d
```

**⚠️ IMPORTANT**: Change `DB_PASSWORD` to your actual MySQL password!

---

### 3️⃣ **Install & Start Backend** (1 minute)

```bash
cd server
npm install
node setup-test-data.js
npm start
```

✅ Backend running on: `http://localhost:5000`

---

### 4️⃣ **Start Frontend** (1 minute)

Open a new terminal:

```bash
cd client
npm start
```

✅ Frontend running on: `http://localhost:8080`

---

## 🎉 You're Ready!

### Test Credentials:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@example.com | admin123 |
| **Teacher** | rajesh@example.com | teacher123 |
| **Student** | rahul@example.com | student123 |

---

## 🧪 Quick Test

### 1. **Login as Admin**
- Go to: `http://localhost:8080`
- Click "Login as Admin"
- You'll see the dashboard with test data

### 2. **Test Auto Roll Number**
- Go to "Manage Students"
- Click "Add Student"
- Fill in details (don't enter roll number)
- **Result**: Roll number auto-generates (e.g., BCA25001)

### 3. **Test Time-Restricted Attendance**
- Login as Teacher
- Go to "Mark Attendance"
- Try marking attendance
- **Result**: Works only between 9:00 AM - 10:30 AM

### 4. **Test Low Attendance Alert**
- Login as Admin
- Go to Dashboard
- Click "Check Low Attendance"
- **Result**: Notifications sent to students below 50%

---

## 📊 What You Get

### ✅ **All Features Working:**

1. **Auto Academic Year** - Automatically calculated
2. **Multi-Teacher Assignment** - Assign multiple subjects/classes
3. **Auto Roll Numbers** - Format: BCA25001, BCA25002...
4. **Auto Passwords** - Random 8-character passwords
5. **Time-Restricted Attendance** - 9:00-10:30 AM window
6. **Low Attendance Alerts** - Automatic notifications
7. **Notification System** - In-app notifications
8. **Advanced Reports** - Filter by student/date/subject

---

## 🔧 Troubleshooting

### Problem: "Cannot connect to database"
**Solution**: Check MySQL is running and password in `.env` is correct

### Problem: "Port 5000 already in use"
**Solution**: Change PORT in `.env` to 5001 or kill the process using port 5000

### Problem: "npm install fails"
**Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Problem: "Test data not loading"
**Solution**: Make sure database schema is created first, then run `node setup-test-data.js`

---

## 📚 Next Steps

1. **Explore Features**: Try all admin, teacher, and student features
2. **Read Documentation**: Check `ENHANCEMENTS.md` for detailed features
3. **Test APIs**: Use `TEST_API.md` for API testing examples
4. **Customize**: Modify code to fit your specific needs

---

## 🎯 Key Files to Know

| File | Purpose |
|------|---------|
| `server/.env` | Database & JWT configuration |
| `server/database/schema.sql` | Database structure |
| `server/setup-test-data.js` | Generate test data |
| `TEST_API.md` | API testing guide |
| `ENHANCEMENTS.md` | Feature documentation |

---

## 💡 Pro Tips

1. **Use Test Data**: Run `setup-test-data.js` to get started quickly
2. **Check Logs**: Server logs show all operations
3. **Use Postman**: Test APIs easily with Postman
4. **Read Notifications**: Check notification table for all system messages

---

## 🆘 Need Help?

1. Check `README.md` for detailed setup
2. Check `TEST_API.md` for API examples
3. Check `ENHANCEMENTS.md` for feature details
4. Check server logs for error messages

---

## ✅ Success Checklist

- [ ] MySQL running
- [ ] Database created
- [ ] `.env` configured
- [ ] Dependencies installed
- [ ] Test data loaded
- [ ] Backend running (port 5000)
- [ ] Frontend running (port 8080)
- [ ] Can login as admin
- [ ] Can see test data

---

**🎉 Congratulations! Your Enhanced Attendance System is Ready!**

**Time to Complete**: ~5 minutes  
**Status**: ✅ All features working  
**Next**: Start exploring and testing!
