# 🔐 Login Credentials - Student Attendance System

## Database Import

To import the database with all mock data, run:
```bash
import-database-with-data.bat
```

Or manually:
```bash
mysql -u root -p < server/database/schema_with_data.sql
```

---

## 👨‍💼 Admin Login

**Email:** `admin@example.com`  
**Password:** `Admin@143`

**Access:**
- Manage Classes
- Manage Teachers
- Manage Students
- View All Reports
- System Settings

---

## 👨‍🏫 Teacher Logins

### Teacher 1: Shruti Sudheer Teli
- **Email:** `shrutiteli571@gmail.com`
- **Password:** `Teacher@143`
- **Teacher ID:** S1
- **Teaches:** BCA 1A - Programming in C

### Teacher 2: Sunny
- **Email:** `sunny@gmail.com`
- **Password:** `Teacher@143`
- **Teacher ID:** TCH002
- **Teaches:** BCA 2A - Programming in C

### Teacher 3: Booby
- **Email:** `booby@gmail.com`
- **Password:** `Teacher@143`
- **Teacher ID:** TCH003
- **Teaches:** BCA 1A - Programming in C

### Teacher 4: Rocky
- **Email:** `roc@gmail.com`
- **Password:** `Teacher@143`
- **Teacher ID:** TCH004
- **Teaches:** BCA 3A - Python Programming

---

## 👨‍🎓 Student Logins

**All students use password:** `Student@143`

### BCA 1st Year - Section A

| Name | Roll Number | Email |
|------|-------------|-------|
| Rahul Verma | BCA1A001 | rahul.verma@example.com |
| Priya Desai | BCA1A002 | priya.desai@example.com |
| Amit Shah | BCA1A003 | amit.shah@example.com |
| Sneha Kapoor | BCA1A004 | sneha.kapoor@example.com |
| Rohan Gupta | BCA1A005 | rohan.gupta@example.com |

### BCA 1st Year - Section B

| Name | Roll Number | Email |
|------|-------------|-------|
| Anjali Sharma | BCA1B001 | anjali.sharma@example.com |
| Vikram Malhotra | BCA1B002 | vikram.malhotra@example.com |
| Kavita Singh | BCA1B003 | kavita.singh@example.com |
| Arjun Reddy | BCA1B004 | arjun.reddy@example.com |
| Pooja Mehta | BCA1B005 | pooja.mehta@example.com |

### BCA 2nd Year - Section A

| Name | Roll Number | Email |
|------|-------------|-------|
| Karan Joshi | BCA2A001 | karan.joshi@example.com |
| Divya Nair | BCA2A002 | divya.nair@example.com |
| Nikhil Kumar | BCA2A003 | nikhil.kumar@example.com |
| Riya Patel | BCA2A004 | riya.patel@example.com |
| Sanjay Rao | BCA2A005 | sanjay.rao@example.com |

### BCA 2nd Year - Section B

| Name | Roll Number | Email |
|------|-------------|-------|
| Meera Iyer | BCA2B001 | meera.iyer@example.com |
| Aditya Krishnan | BCA2B002 | aditya.krishnan@example.com |
| Lakshmi Menon | BCA2B003 | lakshmi.menon@example.com |
| Suresh Babu | BCA2B004 | suresh.babu@example.com |
| Deepika Rao | BCA2B005 | deepika.rao@example.com |

### BCA 3rd Year - Section A

| Name | Roll Number | Email |
|------|-------------|-------|
| Rajat Khanna | BCA3A001 | rajat.khanna@example.com |
| Swati Deshmukh | BCA3A002 | swati.deshmukh@example.com |
| Manish Kulkarni | BCA3A003 | manish.kulkarni@example.com |
| Ananya Jain | BCA3A004 | ananya.jain@example.com |
| Varun Agarwal | BCA3A005 | varun.agarwal@example.com |

### BCA 3rd Year - Section B

| Name | Roll Number | Email |
|------|-------------|-------|
| Ishita Bansal | BCA3B001 | ishita.bansal@example.com |
| Abhishek Ghosh | BCA3B002 | abhishek.ghosh@example.com |
| Tanvi Chatterjee | BCA3B003 | tanvi.chatterjee@example.com |
| Siddharth Sen | BCA3B004 | siddharth.sen@example.com |
| Nisha Roy | BCA3B005 | nisha.roy@example.com |

### MCA 1st Year - Section A

| Name | Roll Number | Email |
|------|-------------|-------|
| Gaurav Mishra | MCA1A001 | gaurav.mishra@example.com |
| Shruti Pandey | MCA1A002 | shruti.pandey@example.com |
| Harsh Tiwari | MCA1A003 | harsh.tiwari@example.com |

### MCA 1st Year - Section B

| Name | Roll Number | Email |
|------|-------------|-------|
| Ritika Saxena | MCA1B001 | ritika.saxena@example.com |
| Akash Reddy | MCA1B002 | akash.reddy@example.com |
| Neha Yadav | MCA1B003 | neha.yadav@example.com |

### B.Tech CS 1st Year - Section A

| Name | Roll Number | Email |
|------|-------------|-------|
| Yash Chopra | BT1A001 | yash.chopra@example.com |
| Simran Kaur | BT1A002 | simran.kaur@example.com |

### B.Tech CS 1st Year - Section B

| Name | Roll Number | Email |
|------|-------------|-------|
| Aryan Malhotra | BT1B001 | aryan.malhotra@example.com |
| Tanya Sharma | BT1B002 | tanya.sharma@example.com |

---

## 📊 Database Summary

- **Total Users:** 5 (1 Admin + 4 Teachers)
- **Total Teachers:** 4
- **Total Students:** 40
- **Total Classes:** 10
- **Total Subjects:** 10
- **Sample Attendance Records:** Included for last 3 days

---

## 🚀 Quick Start

1. **Import Database:**
   ```bash
   import-database-with-data.bat
   ```

2. **Install Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Start Server:**
   ```bash
   npm start
   ```

4. **Open Application:**
   - Open `client/index.html` in browser
   - Or use test files: `TEST_LOGIN_COMPLETE.html`

5. **Login:**
   - Admin: `admin@example.com` / `Admin@143`
   - Teacher: `shrutiteli571@gmail.com` / `Teacher@143`
   - Student: Roll `BCA1A001` / Password `Student@143`

---

## 🔒 Security Notes

⚠️ **IMPORTANT:** These are development credentials only!

For production:
- Change all passwords immediately
- Use strong passwords (min 12 characters)
- Enable two-factor authentication
- Implement password complexity rules
- Regular password rotation

---

## 📝 Notes

- All passwords are bcrypt hashed in the database
- Student login requires: Name + Roll Number + Password
- Teacher/Admin login requires: Email + Password
- Academic year: 2025-2026
- Sample attendance data included for testing
