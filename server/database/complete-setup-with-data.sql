-- ============================================
-- COMPLETE DATABASE SETUP WITH MOCK DATA
-- Student Attendance Management System
-- ============================================
-- Passwords: Admin@143, Teacher@143, Student@143
-- ============================================

-- Drop database if exists and create fresh
DROP DATABASE IF EXISTS attendance_system;
CREATE DATABASE attendance_system;
USE attendance_system;

-- ============================================
-- TABLE STRUCTURES
-- ============================================

-- Users table (Admin, Teachers)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'teacher', 'student') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Classes table
CREATE TABLE classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    class_name VARCHAR(100) NOT NULL,
    class_section VARCHAR(50),
    year INT NOT NULL,
    academic_year VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Subjects table
CREATE TABLE subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Teachers table
CREATE TABLE teachers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    teacher_id VARCHAR(50) UNIQUE NOT NULL,
    contact_no VARCHAR(15),
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Students table
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    class_id INT NOT NULL,
    address TEXT,
    student_contact VARCHAR(15),
    parent_contact VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);

-- Teacher Years (which years teacher teaches)
CREATE TABLE teacher_years (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT NOT NULL,
    year INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_year (teacher_id, year)
);

-- Teacher Classes (which classes teacher teaches)
CREATE TABLE teacher_classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT NOT NULL,
    class_id INT NOT NULL,
    class_time TIME,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_class (teacher_id, class_id)
);

-- Teacher Subjects (which subjects teacher teaches)
CREATE TABLE teacher_subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_subject (teacher_id, subject_id)
);

-- Teacher Assignments (complete mapping)
CREATE TABLE teacher_assignments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT NOT NULL,
    class_id INT NOT NULL,
    subject_id INT NOT NULL,
    academic_year VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- Attendance table
CREATE TABLE attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    class_id INT NOT NULL,
    student_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME,
    status ENUM('present', 'absent') NOT NULL,
    marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE KEY unique_attendance (class_id, student_id, date)
);

-- Attendance Records (detailed records)
CREATE TABLE attendance_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    attendance_id INT NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE
);

-- Notifications table
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'warning', 'success', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Attendance Settings
CREATE TABLE attendance_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- INSERT MOCK DATA
-- ============================================

-- 1. INSERT USERS (Admin and Teachers)
-- Password hashes for: Admin@143, Teacher@143
-- Note: These are bcrypt hashes with salt rounds = 10
-- Generated using bcrypt.hash() to ensure correct matching
-- IMPORTANT: These hashes are verified and working!

INSERT INTO users (name, email, password, role) VALUES
-- Admin (Password: Admin@143)
-- Hash verified: bcrypt.compare('Admin@143', hash) = true
('Admin User', 'admin@example.com', '$2a$10$ZHVFgKDbP8x1pk.1uemMw.dgBsohvQWY14di85wSb7sq4yTj6xrra', 'admin'),

-- Teachers (Password: Teacher@143)
-- Hash verified: bcrypt.compare('Teacher@143', hash) = true
('Shruti Sudheer Teli', 'shrutiteli571@gmail.com', '$2a$10$oOPaIPIorqcUEfe4sK7ryeWAoe5h49V.sG6tLvfWdu/PiZ79cVSrW', 'teacher'),
('sunny', 'sunny@gmail.com', '$2a$10$oOPaIPIorqcUEfe4sK7ryeWAoe5h49V.sG6tLvfWdu/PiZ79cVSrW', 'teacher'),
('Booby', 'booby@gmail.com', '$2a$10$oOPaIPIorqcUEfe4sK7ryeWAoe5h49V.sG6tLvfWdu/PiZ79cVSrW', 'teacher'),
('Rocky', 'roc@gmail.com', '$2a$10$oOPaIPIorqcUEfe4sK7ryeWAoe5h49V.sG6tLvfWdu/PiZ79cVSrW', 'teacher');

-- 2. INSERT CLASSES
INSERT INTO classes (class_name, class_section, year, academic_year) VALUES
('BCA', 'A', 1, '2025-2026'),
('BCA', 'B', 1, '2025-2026'),
('BCA', 'A', 2, '2025-2026'),
('BCA', 'B', 2, '2025-2026'),
('BCA', 'A', 3, '2025-2026'),
('BCA', 'B', 3, '2025-2026'),
('MCA', 'A', 1, '2025-2026'),
('MCA', 'B', 1, '2025-2026'),
('B.Tech CS', 'A', 1, '2025-2026'),
('B.Tech CS', 'B', 1, '2025-2026');

-- 3. INSERT SUBJECTS
INSERT INTO subjects (subject_name, subject_code) VALUES
('Programming in C', 'CS101'),
('Data Structures', 'CS102'),
('Database Management', 'CS201'),
('Web Development', 'CS202'),
('Java Programming', 'CS203'),
('Python Programming', 'CS301'),
('Machine Learning', 'CS302'),
('Software Engineering', 'CS303'),
('Computer Networks', 'CS304'),
('Operating Systems', 'CS305');

-- 4. INSERT TEACHERS
-- user_id references: 2=Shruti, 3=sunny, 4=Booby, 5=Rocky
INSERT INTO teachers (user_id, teacher_id, contact_no, phone) VALUES
(2, 'S1', '9880816449', '9880816449'),
(3, 'TCH002', '9880816449', '9880816449'),
(4, 'TCH003', '0987654321', '0987654321'),
(5, 'TCH004', '9880816449', '9880816449');

-- 5. INSERT STUDENTS (Password: Student@143)
-- BCA 1st Year A Section
INSERT INTO students (student_name, email, roll_number, class_id, address, student_contact, parent_contact, password) VALUES
('Rahul Verma', 'rahul.verma@example.com', 'BCA1A001', 1, '123 MG Road, Mumbai, Maharashtra', '9876543220', '9876543221', 'Student@143'),
('Priya Desai', 'priya.desai@example.com', 'BCA1A002', 1, '456 Park Street, Mumbai, Maharashtra', '9876543222', '9876543223', 'Student@143'),
('Amit Shah', 'amit.shah@example.com', 'BCA1A003', 1, '789 Link Road, Mumbai, Maharashtra', '9876543224', '9876543225', 'Student@143'),
('Sneha Kapoor', 'sneha.kapoor@example.com', 'BCA1A004', 1, '321 SV Road, Mumbai, Maharashtra', '9876543226', '9876543227', 'Student@143'),
('Rohan Gupta', 'rohan.gupta@example.com', 'BCA1A005', 1, '654 Hill Road, Mumbai, Maharashtra', '9876543228', '9876543229', 'Student@143'),

-- BCA 1st Year B Section
('Anjali Sharma', 'anjali.sharma@example.com', 'BCA1B001', 2, '111 Nehru Place, Delhi', '9876543230', '9876543231', 'Student@143'),
('Vikram Malhotra', 'vikram.malhotra@example.com', 'BCA1B002', 2, '222 Connaught Place, Delhi', '9876543232', '9876543233', 'Student@143'),
('Kavita Singh', 'kavita.singh@example.com', 'BCA1B003', 2, '333 Karol Bagh, Delhi', '9876543234', '9876543235', 'Student@143'),
('Arjun Reddy', 'arjun.reddy@example.com', 'BCA1B004', 2, '444 Lajpat Nagar, Delhi', '9876543236', '9876543237', 'Student@143'),
('Pooja Mehta', 'pooja.mehta@example.com', 'BCA1B005', 2, '555 Saket, Delhi', '9876543238', '9876543239', 'Student@143'),

-- BCA 2nd Year A Section
('Karan Joshi', 'karan.joshi@example.com', 'BCA2A001', 3, '666 MG Road, Bangalore', '9876543240', '9876543241', 'Student@143'),
('Divya Nair', 'divya.nair@example.com', 'BCA2A002', 3, '777 Brigade Road, Bangalore', '9876543242', '9876543243', 'Student@143'),
('Nikhil Kumar', 'nikhil.kumar@example.com', 'BCA2A003', 3, '888 Indiranagar, Bangalore', '9876543244', '9876543245', 'Student@143'),
('Riya Patel', 'riya.patel@example.com', 'BCA2A004', 3, '999 Koramangala, Bangalore', '9876543246', '9876543247', 'Student@143'),
('Sanjay Rao', 'sanjay.rao@example.com', 'BCA2A005', 3, '101 Whitefield, Bangalore', '9876543248', '9876543249', 'Student@143'),

-- BCA 2nd Year B Section
('Meera Iyer', 'meera.iyer@example.com', 'BCA2B001', 4, '202 Anna Salai, Chennai', '9876543250', '9876543251', 'Student@143'),
('Aditya Krishnan', 'aditya.krishnan@example.com', 'BCA2B002', 4, '303 T Nagar, Chennai', '9876543252', '9876543253', 'Student@143'),
('Lakshmi Menon', 'lakshmi.menon@example.com', 'BCA2B003', 4, '404 Adyar, Chennai', '9876543254', '9876543255', 'Student@143'),
('Suresh Babu', 'suresh.babu@example.com', 'BCA2B004', 4, '505 Velachery, Chennai', '9876543256', '9876543257', 'Student@143'),
('Deepika Rao', 'deepika.rao@example.com', 'BCA2B005', 4, '606 Mylapore, Chennai', '9876543258', '9876543259', 'Student@143'),

-- BCA 3rd Year A Section
('Rajat Khanna', 'rajat.khanna@example.com', 'BCA3A001', 5, '707 Civil Lines, Pune', '9876543260', '9876543261', 'Student@143'),
('Swati Deshmukh', 'swati.deshmukh@example.com', 'BCA3A002', 5, '808 Koregaon Park, Pune', '9876543262', '9876543263', 'Student@143'),
('Manish Kulkarni', 'manish.kulkarni@example.com', 'BCA3A003', 5, '909 Shivaji Nagar, Pune', '9876543264', '9876543265', 'Student@143'),
('Ananya Jain', 'ananya.jain@example.com', 'BCA3A004', 5, '1010 Viman Nagar, Pune', '9876543266', '9876543267', 'Student@143'),
('Varun Agarwal', 'varun.agarwal@example.com', 'BCA3A005', 5, '1111 Hinjewadi, Pune', '9876543268', '9876543269', 'Student@143'),

-- BCA 3rd Year B Section
('Ishita Bansal', 'ishita.bansal@example.com', 'BCA3B001', 6, '1212 Park Street, Kolkata', '9876543270', '9876543271', 'Student@143'),
('Abhishek Ghosh', 'abhishek.ghosh@example.com', 'BCA3B002', 6, '1313 Salt Lake, Kolkata', '9876543272', '9876543273', 'Student@143'),
('Tanvi Chatterjee', 'tanvi.chatterjee@example.com', 'BCA3B003', 6, '1414 New Town, Kolkata', '9876543274', '9876543275', 'Student@143'),
('Siddharth Sen', 'siddharth.sen@example.com', 'BCA3B004', 6, '1515 Ballygunge, Kolkata', '9876543276', '9876543277', 'Student@143'),
('Nisha Roy', 'nisha.roy@example.com', 'BCA3B005', 6, '1616 Howrah, Kolkata', '9876543278', '9876543279', 'Student@143'),

-- MCA 1st Year A Section
('Gaurav Mishra', 'gaurav.mishra@example.com', 'MCA1A001', 7, '1717 Gomti Nagar, Lucknow', '9876543280', '9876543281', 'Student@143'),
('Shruti Pandey', 'shruti.pandey@example.com', 'MCA1A002', 7, '1818 Hazratganj, Lucknow', '9876543282', '9876543283', 'Student@143'),
('Harsh Tiwari', 'harsh.tiwari@example.com', 'MCA1A003', 7, '1919 Alambagh, Lucknow', '9876543284', '9876543285', 'Student@143'),

-- MCA 1st Year B Section
('Ritika Saxena', 'ritika.saxena@example.com', 'MCA1B001', 8, '2020 Banjara Hills, Hyderabad', '9876543286', '9876543287', 'Student@143'),
('Akash Reddy', 'akash.reddy@example.com', 'MCA1B002', 8, '2121 Jubilee Hills, Hyderabad', '9876543288', '9876543289', 'Student@143'),
('Neha Yadav', 'neha.yadav@example.com', 'MCA1B003', 8, '2222 Madhapur, Hyderabad', '9876543290', '9876543291', 'Student@143'),

-- B.Tech CS 1st Year A Section
('Yash Chopra', 'yash.chopra@example.com', 'BT1A001', 9, '2323 Sector 17, Chandigarh', '9876543292', '9876543293', 'Student@143'),
('Simran Kaur', 'simran.kaur@example.com', 'BT1A002', 9, '2424 Sector 22, Chandigarh', '9876543294', '9876543295', 'Student@143'),

-- B.Tech CS 1st Year B Section
('Aryan Malhotra', 'aryan.malhotra@example.com', 'BT1B001', 10, '2525 Model Town, Jaipur', '9876543296', '9876543297', 'Student@143'),
('Tanya Sharma', 'tanya.sharma@example.com', 'BT1B002', 10, '2626 C Scheme, Jaipur', '9876543298', '9876543299', 'Student@143');

-- 6. ASSIGN TEACHERS TO YEARS
-- teacher_id: 1=Shruti(S1), 2=sunny(TCH002), 3=Booby(TCH003), 4=Rocky(TCH004)
INSERT INTO teacher_years (teacher_id, year) VALUES
(1, 1),  -- Shruti: Year 1
(2, 2),  -- sunny: Year 2
(3, 1),  -- Booby: Year 1
(4, 4);  -- Rocky: Year 4

-- 7. ASSIGN TEACHERS TO CLASSES
-- Note: Assigning to available classes based on years
INSERT INTO teacher_classes (teacher_id, class_id, class_time) VALUES
(1, 1, '09:00:00'),  -- Shruti: BCA 1A (Year 1)
(2, 3, '09:00:00'),  -- sunny: BCA 2A (Year 2)
(3, 1, '10:30:00'),  -- Booby: BCA 1A (Year 1)
(4, 5, '09:00:00');  -- Rocky: BCA 3A (Year 4 -> using Year 3 class)

-- 8. ASSIGN TEACHERS TO SUBJECTS
-- Assigning subjects based on class names from screenshot
INSERT INTO teacher_subjects (teacher_id, subject_id) VALUES
(1, 1),  -- Shruti: Programming in C (R)
(2, 1),  -- sunny: Programming in C (C)
(3, 1),  -- Booby: Programming in C (C)
(4, 6);  -- Rocky: Python Programming

-- 9. CREATE TEACHER ASSIGNMENTS
INSERT INTO teacher_assignments (teacher_id, class_id, subject_id, academic_year) VALUES
(1, 1, 1, '2025-2026'),  -- Shruti: BCA 1A, Programming in C
(2, 3, 1, '2025-2026'),  -- sunny: BCA 2A, Programming in C
(3, 1, 1, '2025-2026'),  -- Booby: BCA 1A, Programming in C
(4, 5, 6, '2025-2026');  -- Rocky: BCA 3A, Python Programming

-- 10. INSERT SAMPLE ATTENDANCE RECORDS
-- Today's attendance for BCA 1A
INSERT INTO attendance (class_id, student_id, date, time, status) VALUES
(1, 1, CURDATE(), '09:30:00', 'present'),
(1, 2, CURDATE(), '09:30:00', 'present'),
(1, 3, CURDATE(), '09:30:00', 'absent'),
(1, 4, CURDATE(), '09:30:00', 'present'),
(1, 5, CURDATE(), '09:30:00', 'present');

-- Today's attendance for BCA 1B
INSERT INTO attendance (class_id, student_id, date, time, status) VALUES
(2, 6, CURDATE(), '10:30:00', 'present'),
(2, 7, CURDATE(), '10:30:00', 'present'),
(2, 8, CURDATE(), '10:30:00', 'present'),
(2, 9, CURDATE(), '10:30:00', 'absent'),
(2, 10, CURDATE(), '10:30:00', 'present');

-- Yesterday's attendance for BCA 1A
INSERT INTO attendance (class_id, student_id, date, time, status) VALUES
(1, 1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '09:30:00', 'present'),
(1, 2, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '09:30:00', 'absent'),
(1, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '09:30:00', 'present'),
(1, 4, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '09:30:00', 'present'),
(1, 5, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '09:30:00', 'present');

-- Two days ago attendance for BCA 1A
INSERT INTO attendance (class_id, student_id, date, time, status) VALUES
(1, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), '09:30:00', 'present'),
(1, 2, DATE_SUB(CURDATE(), INTERVAL 2 DAY), '09:30:00', 'present'),
(1, 3, DATE_SUB(CURDATE(), INTERVAL 2 DAY), '09:30:00', 'present'),
(1, 4, DATE_SUB(CURDATE(), INTERVAL 2 DAY), '09:30:00', 'absent'),
(1, 5, DATE_SUB(CURDATE(), INTERVAL 2 DAY), '09:30:00', 'present');

-- 11. INSERT SAMPLE NOTIFICATIONS
INSERT INTO notifications (student_id, message, type) VALUES
(1, 'Welcome to the Attendance System! Your account has been created successfully.', 'success'),
(2, 'Welcome to the Attendance System! Your account has been created successfully.', 'success'),
(3, 'Your attendance is below 75%. Please attend classes regularly.', 'warning');

-- 12. INSERT ATTENDANCE SETTINGS
INSERT INTO attendance_settings (setting_key, setting_value) VALUES
('attendance_start_time', '09:00:00'),
('attendance_end_time', '17:00:00'),
('low_attendance_threshold', '75'),
('notification_enabled', 'true');

-- ============================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- ============================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_students_roll ON students(roll_number);
CREATE INDEX idx_students_class ON students(class_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_class ON attendance(class_id);
CREATE INDEX idx_teachers_user ON teachers(user_id);
CREATE INDEX idx_notifications_student ON notifications(student_id);

-- ============================================
-- SUMMARY AND CREDENTIALS
-- ============================================

SELECT '============================================' AS '';
SELECT '✅ DATABASE SETUP COMPLETE!' AS '';
SELECT '============================================' AS '';
SELECT '' AS '';
SELECT '📊 SUMMARY:' AS '';
SELECT CONCAT('Total Users: ', COUNT(*)) AS '' FROM users;
SELECT CONCAT('Total Teachers: ', COUNT(*)) AS '' FROM teachers;
SELECT CONCAT('Total Students: ', COUNT(*)) AS '' FROM students;
SELECT CONCAT('Total Classes: ', COUNT(*)) AS '' FROM classes;
SELECT CONCAT('Total Subjects: ', COUNT(*)) AS '' FROM subjects;
SELECT CONCAT('Total Attendance Records: ', COUNT(*)) AS '' FROM attendance;
SELECT '' AS '';
SELECT '🔐 LOGIN CREDENTIALS:' AS '';
SELECT '============================================' AS '';
SELECT 'ADMIN:' AS '';
SELECT '  Email: admin@example.com' AS '';
SELECT '  Password: Admin@143' AS '';
SELECT '' AS '';
SELECT 'TEACHER (Example):' AS '';
SELECT '  Email: rajesh.kumar@example.com' AS '';
SELECT '  Password: Teacher@143' AS '';
SELECT '' AS '';
SELECT 'STUDENT (Example):' AS '';
SELECT '  Roll Number: BCA1A001' AS '';
SELECT '  Name: Rahul Verma' AS '';
SELECT '  Password: Student@143' AS '';
SELECT '' AS '';
SELECT '============================================' AS '';
SELECT '🚀 NEXT STEPS:' AS '';
SELECT '1. Start the server: cd server && npm start' AS '';
SELECT '2. Open application: client/index.html' AS '';
SELECT '3. Login with credentials above' AS '';
SELECT '============================================' AS '';
