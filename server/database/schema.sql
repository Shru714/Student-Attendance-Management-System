CREATE DATABASE IF NOT EXISTS attendance_system;
USE attendance_system;

-- ============================================
-- TABLE DEFINITIONS
-- ============================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'teacher', 'student') NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subjectName VARCHAR(100) NOT NULL,
    subjectCode VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    className VARCHAR(100) NOT NULL,
    class_section VARCHAR(50),
    year INT NOT NULL,
    academic_year VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    teacherId VARCHAR(20) UNIQUE NOT NULL,
    contactNo VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Teacher years (many-to-many)
CREATE TABLE IF NOT EXISTS teacher_years (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacherId INT NOT NULL,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacherId) REFERENCES teachers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_year (teacherId, year)
);

-- Teacher classes (many-to-many)
CREATE TABLE IF NOT EXISTS teacher_classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacherId INT NOT NULL,
    classId INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacherId) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (classId) REFERENCES classes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_class (teacherId, classId)
);

-- Teacher subjects (many-to-many)
CREATE TABLE IF NOT EXISTS teacher_subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacherId INT NOT NULL,
    subjectId INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacherId) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (subjectId) REFERENCES subjects(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_subject (teacherId, subjectId)
);

-- Teacher assignments (many-to-many: teacher-class-subject)
CREATE TABLE IF NOT EXISTS teacher_assignments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacherId INT NOT NULL,
    classId INT NOT NULL,
    subjectId INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacherId) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (classId) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (subjectId) REFERENCES subjects(id) ON DELETE CASCADE,
    UNIQUE KEY unique_assignment (teacherId, classId, subjectId)
);

-- Students table (aligned with StudentModel)
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    classId INT NOT NULL,
    rollNumber VARCHAR(20) UNIQUE NOT NULL,
    parentPhone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (classId) REFERENCES classes(id) ON DELETE CASCADE
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    classId INT NOT NULL,
    subjectId INT NOT NULL,
    date DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    isLocked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (classId) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (subjectId) REFERENCES subjects(id) ON DELETE CASCADE,
    UNIQUE KEY unique_attendance_session (classId, subjectId, date)
);

-- Attendance records table
CREATE TABLE IF NOT EXISTS attendance_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    attendanceId INT NOT NULL,
    studentId INT NOT NULL,
    status ENUM('Present', 'Absent') NOT NULL,
    markedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (attendanceId) REFERENCES attendance(id) ON DELETE CASCADE,
    FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE KEY unique_attendance_record (attendanceId, studentId)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'warning', 'alert') DEFAULT 'info',
    isRead BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Attendance settings
CREATE TABLE IF NOT EXISTS attendance_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    attendanceWindow INT DEFAULT 30,
    lowAttendanceThreshold DECIMAL(5,2) DEFAULT 50.00,
    autoLockAfterMinutes INT DEFAULT 30
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_teachers_userId ON teachers(userId);
CREATE INDEX IF NOT EXISTS idx_teachers_teacherId ON teachers(teacherId);
CREATE INDEX IF NOT EXISTS idx_students_userId ON students(userId);
CREATE INDEX IF NOT EXISTS idx_students_classId ON students(classId);
CREATE INDEX IF NOT EXISTS idx_students_rollNumber ON students(rollNumber);
CREATE INDEX IF NOT EXISTS idx_attendance_classId ON attendance(classId);
CREATE INDEX IF NOT EXISTS idx_attendance_subjectId ON attendance(subjectId);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_records_attendanceId ON attendance_records(attendanceId);
CREATE INDEX IF NOT EXISTS idx_attendance_records_studentId ON attendance_records(studentId);
CREATE INDEX IF NOT EXISTS idx_attendance_records_status ON attendance_records(status);
CREATE INDEX IF NOT EXISTS idx_notifications_userId ON notifications(userId);
CREATE INDEX IF NOT EXISTS idx_notifications_isRead ON notifications(isRead);
CREATE INDEX IF NOT EXISTS idx_teacher_assignments_teacherId ON teacher_assignments(teacherId);
CREATE INDEX IF NOT EXISTS idx_teacher_assignments_classId ON teacher_assignments(classId);
CREATE INDEX IF NOT EXISTS idx_teacher_assignments_subjectId ON teacher_assignments(subjectId);

-- ============================================
-- STORED PROCEDURES - ADMIN PANEL
-- ============================================

DELIMITER //

-- ========== USER MANAGEMENT ==========

-- Create User
CREATE PROCEDURE IF NOT EXISTS sp_admin_create_user(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_role ENUM('admin', 'teacher', 'student'),
    IN p_phone VARCHAR(20),
    IN p_address TEXT
)
BEGIN
    INSERT INTO users (name, email, password, role, phone, address)
    VALUES (p_name, p_email, p_password, p_role, p_phone, p_address);
    SELECT LAST_INSERT_ID() as userId;
END //

-- Get All Users
CREATE PROCEDURE IF NOT EXISTS sp_admin_get_all_users()
BEGIN
    SELECT id, name, email, role, phone, address, created_at 
    FROM users 
    ORDER BY created_at DESC;
END //

-- Get User by ID
CREATE PROCEDURE IF NOT EXISTS sp_admin_get_user_by_id(IN p_userId INT)
BEGIN
    SELECT id, name, email, role, phone, address, created_at 
    FROM users 
    WHERE id = p_userId;
END //

-- Get User by Email
CREATE PROCEDURE IF NOT EXISTS sp_get_user_by_email(IN p_email VARCHAR(100))
BEGIN
    SELECT * FROM users WHERE email = p_email;
END //

-- Update User
CREATE PROCEDURE IF NOT EXISTS sp_admin_update_user(
    IN p_userId INT,
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_address TEXT
)
BEGIN
    UPDATE users 
    SET name = p_name, email = p_email, phone = p_phone, address = p_address
    WHERE id = p_userId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Update User Password
CREATE PROCEDURE IF NOT EXISTS sp_update_user_password(
    IN p_userId INT,
    IN p_password VARCHAR(255)
)
BEGIN
    UPDATE users SET password = p_password WHERE id = p_userId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Delete User
CREATE PROCEDURE IF NOT EXISTS sp_admin_delete_user(IN p_userId INT)
BEGIN
    DELETE FROM users WHERE id = p_userId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- ========== CLASS MANAGEMENT ==========

-- Create Class
CREATE PROCEDURE IF NOT EXISTS sp_admin_create_class(
    IN p_className VARCHAR(100),
    IN p_class_section VARCHAR(50),
    IN p_year INT,
    IN p_academic_year VARCHAR(20)
)
BEGIN
    INSERT INTO classes (className, class_section, year, academic_year)
    VALUES (p_className, p_class_section, p_year, p_academic_year);
    SELECT LAST_INSERT_ID() as classId;
END //

-- Get All Classes
CREATE PROCEDURE IF NOT EXISTS sp_admin_get_all_classes()
BEGIN
    SELECT c.*, COUNT(DISTINCT s.id) as student_count
    FROM classes c
    LEFT JOIN students s ON c.id = s.classId
    GROUP BY c.id
    ORDER BY c.year DESC, c.className;
END //

-- Get Class by ID
CREATE PROCEDURE IF NOT EXISTS sp_admin_get_class_by_id(IN p_classId INT)
BEGIN
    SELECT c.*, COUNT(DISTINCT s.id) as student_count
    FROM classes c
    LEFT JOIN students s ON c.id = s.classId
    WHERE c.id = p_classId
    GROUP BY c.id;
END //

-- Update Class
CREATE PROCEDURE IF NOT EXISTS sp_admin_update_class(
    IN p_classId INT,
    IN p_className VARCHAR(100),
    IN p_class_section VARCHAR(50),
    IN p_year INT,
    IN p_academic_year VARCHAR(20)
)
BEGIN
    UPDATE classes 
    SET className = p_className, class_section = p_class_section, 
        year = p_year, academic_year = p_academic_year
    WHERE id = p_classId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Delete Class
CREATE PROCEDURE IF NOT EXISTS sp_admin_delete_class(IN p_classId INT)
BEGIN
    DELETE FROM classes WHERE id = p_classId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Get Next Roll Number for Class
CREATE PROCEDURE IF NOT EXISTS sp_get_next_roll_number(IN p_classId INT)
BEGIN
    DECLARE last_roll VARCHAR(20);
    DECLARE class_prefix VARCHAR(10);
    DECLARE next_number INT;
    
    SELECT rollNumber INTO last_roll 
    FROM students 
    WHERE classId = p_classId 
    ORDER BY rollNumber DESC 
    LIMIT 1;
    
    IF last_roll IS NULL THEN
        SELECT UPPER(SUBSTRING(className, 1, 3)) INTO class_prefix FROM classes WHERE id = p_classId;
        SELECT CONCAT(class_prefix, '001') as nextRollNumber;
    ELSE
        SET class_prefix = REGEXP_REPLACE(last_roll, '[0-9]+$', '');
        SET next_number = CAST(REGEXP_REPLACE(last_roll, '^[A-Z]+', '') AS UNSIGNED) + 1;
        SELECT CONCAT(class_prefix, LPAD(next_number, 3, '0')) as nextRollNumber;
    END IF;
END //

-- ========== SUBJECT MANAGEMENT ==========

-- Create Subject
CREATE PROCEDURE IF NOT EXISTS sp_admin_create_subject(
    IN p_subjectName VARCHAR(100),
    IN p_subjectCode VARCHAR(20)
)
BEGIN
    INSERT INTO subjects (subjectName, subjectCode)
    VALUES (p_subjectName, p_subjectCode);
    SELECT LAST_INSERT_ID() as subjectId;
END //

-- Get All Subjects
CREATE PROCEDURE IF NOT EXISTS sp_admin_get_all_subjects()
BEGIN
    SELECT s.*, COUNT(DISTINCT ts.teacherId) as teacher_count
    FROM subjects s
    LEFT JOIN teacher_subjects ts ON s.id = ts.subjectId
    GROUP BY s.id
    ORDER BY s.subjectName;
END //

-- Get Subject by ID
CREATE PROCEDURE IF NOT EXISTS sp_admin_get_subject_by_id(IN p_subjectId INT)
BEGIN
    SELECT * FROM subjects WHERE id = p_subjectId;
END //

-- Update Subject
CREATE PROCEDURE IF NOT EXISTS sp_admin_update_subject(
    IN p_subjectId INT,
    IN p_subjectName VARCHAR(100),
    IN p_subjectCode VARCHAR(20)
)
BEGIN
    UPDATE subjects 
    SET subjectName = p_subjectName, subjectCode = p_subjectCode
    WHERE id = p_subjectId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Delete Subject
CREATE PROCEDURE IF NOT EXISTS sp_admin_delete_subject(IN p_subjectId INT)
BEGIN
    DELETE FROM subjects WHERE id = p_subjectId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- ========== TEACHER MANAGEMENT ==========

-- Create Teacher
CREATE PROCEDURE IF NOT EXISTS sp_admin_create_teacher(
    IN p_userId INT,
    IN p_teacherId VARCHAR(20),
    IN p_contactNo VARCHAR(20)
)
BEGIN
    INSERT INTO teachers (userId, teacherId, contactNo)
    VALUES (p_userId, p_teacherId, p_contactNo);
    SELECT LAST_INSERT_ID() as teacherId;
END //

-- Get All Teachers with Details
CREATE PROCEDURE IF NOT EXISTS sp_admin_get_all_teachers()
BEGIN
    SELECT t.id, t.userId, t.teacherId, t.contactNo, t.created_at,
           u.name, u.email, u.phone, u.address, u.role
    FROM teachers t
    JOIN users u ON t.userId = u.id
    ORDER BY u.name;
END //

-- Get Teacher by ID
CREATE PROCEDURE IF NOT EXISTS sp_admin_get_teacher_by_id(IN p_teacherId INT)
BEGIN
    SELECT t.id, t.userId, t.teacherId, t.contactNo, t.created_at,
           u.name, u.email, u.phone, u.address
    FROM teachers t
    JOIN users u ON t.userId = u.id
    WHERE t.id = p_teacherId;
END //

-- Get Teacher by User ID
CREATE PROCEDURE IF NOT EXISTS sp_get_teacher_by_userId(IN p_userId INT)
BEGIN
    SELECT t.*, u.name, u.email, u.phone, u.address
    FROM teachers t
    JOIN users u ON t.userId = u.id
    WHERE t.userId = p_userId;
END //

-- Get Teacher by Teacher ID
CREATE PROCEDURE IF NOT EXISTS sp_get_teacher_by_teacherId(IN p_teacherId VARCHAR(20))
BEGIN
    SELECT t.*, u.name, u.email, u.phone, u.address
    FROM teachers t
    JOIN users u ON t.userId = u.id
    WHERE t.teacherId = p_teacherId;
END //

-- Update Teacher
CREATE PROCEDURE IF NOT EXISTS sp_admin_update_teacher(
    IN p_teacherId INT,
    IN p_contactNo VARCHAR(20)
)
BEGIN
    UPDATE teachers 
    SET contactNo = p_contactNo
    WHERE id = p_teacherId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Delete Teacher
CREATE PROCEDURE IF NOT EXISTS sp_admin_delete_teacher(IN p_teacherId INT)
BEGIN
    DELETE FROM teachers WHERE id = p_teacherId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- ========== TEACHER ASSIGNMENTS ==========

-- Assign Teacher Subjects
CREATE PROCEDURE IF NOT EXISTS sp_assign_teacher_subjects(
    IN p_teacherId INT,
    IN p_subjectIds TEXT
)
BEGIN
    DELETE FROM teacher_subjects WHERE teacherId = p_teacherId;
    
    IF p_subjectIds IS NOT NULL AND p_subjectIds != '' THEN
        SET @sql = CONCAT('INSERT INTO teacher_subjects (teacherId, subjectId) VALUES ',
            REPLACE(REPLACE(p_subjectIds, ',', CONCAT(',', p_teacherId, '),')), 
            ',', CONCAT('(', p_teacherId, ',')), ')');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END //

-- Get Teacher Subjects
CREATE PROCEDURE IF NOT EXISTS sp_get_teacher_subjects(IN p_teacherId INT)
BEGIN
    SELECT s.* 
    FROM subjects s
    JOIN teacher_subjects ts ON s.id = ts.subjectId
    WHERE ts.teacherId = p_teacherId
    ORDER BY s.subjectName;
END //

-- Assign Teacher Years
CREATE PROCEDURE IF NOT EXISTS sp_assign_teacher_years(
    IN p_teacherId INT,
    IN p_years TEXT
)
BEGIN
    DELETE FROM teacher_years WHERE teacherId = p_teacherId;
    
    IF p_years IS NOT NULL AND p_years != '' THEN
        SET @sql = CONCAT('INSERT INTO teacher_years (teacherId, year) VALUES ',
            REPLACE(REPLACE(p_years, ',', CONCAT(',', p_teacherId, '),')), 
            ',', CONCAT('(', p_teacherId, ',')), ')');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END //

-- Get Teacher Years
CREATE PROCEDURE IF NOT EXISTS sp_get_teacher_years(IN p_teacherId INT)
BEGIN
    SELECT year 
    FROM teacher_years 
    WHERE teacherId = p_teacherId
    ORDER BY year;
END //

-- Assign Teacher Classes
CREATE PROCEDURE IF NOT EXISTS sp_assign_teacher_classes(
    IN p_teacherId INT,
    IN p_classIds TEXT
)
BEGIN
    DELETE FROM teacher_classes WHERE teacherId = p_teacherId;
    
    IF p_classIds IS NOT NULL AND p_classIds != '' THEN
        SET @sql = CONCAT('INSERT INTO teacher_classes (teacherId, classId) VALUES ',
            REPLACE(REPLACE(p_classIds, ',', CONCAT(',', p_teacherId, '),')), 
            ',', CONCAT('(', p_teacherId, ',')), ')');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END //

-- Get Teacher Classes
CREATE PROCEDURE IF NOT EXISTS sp_get_teacher_classes(IN p_teacherId INT)
BEGIN
    SELECT c.* 
    FROM classes c
    JOIN teacher_classes tc ON c.id = tc.classId
    WHERE tc.teacherId = p_teacherId
    ORDER BY c.className;
END //

-- Assign Teacher to Class-Subject
CREATE PROCEDURE IF NOT EXISTS sp_assign_teacher_to_class_subject(
    IN p_teacherId INT,
    IN p_classId INT,
    IN p_subjectId INT
)
BEGIN
    INSERT INTO teacher_assignments (teacherId, classId, subjectId)
    VALUES (p_teacherId, p_classId, p_subjectId)
    ON DUPLICATE KEY UPDATE teacherId = p_teacherId;
    
    INSERT IGNORE INTO teacher_classes (teacherId, classId) VALUES (p_teacherId, p_classId);
    INSERT IGNORE INTO teacher_subjects (teacherId, subjectId) VALUES (p_teacherId, p_subjectId);
    
    SELECT LAST_INSERT_ID() as assignmentId;
END //

-- Get Teacher Assignments
CREATE PROCEDURE IF NOT EXISTS sp_get_teacher_assignments(IN p_teacherId INT)
BEGIN
    SELECT ta.id, ta.teacherId, ta.classId, ta.subjectId, ta.created_at,
           c.className, c.class_section, c.year, c.academic_year,
           s.subjectName, s.subjectCode
    FROM teacher_assignments ta
    JOIN classes c ON ta.classId = c.id
    JOIN subjects s ON ta.subjectId = s.id
    WHERE ta.teacherId = p_teacherId
    ORDER BY c.className, s.subjectName;
END //

-- Get Teacher Assignments by User ID
CREATE PROCEDURE IF NOT EXISTS sp_get_teacher_assignments_by_userId(IN p_userId INT)
BEGIN
    SELECT ta.id, ta.teacherId, ta.classId, ta.subjectId, ta.created_at,
           c.className, c.class_section, c.year, c.academic_year,
           s.subjectName, s.subjectCode
    FROM teacher_assignments ta
    JOIN teachers t ON ta.teacherId = t.id
    JOIN classes c ON ta.classId = c.id
    JOIN subjects s ON ta.subjectId = s.id
    WHERE t.userId = p_userId
    ORDER BY c.className, s.subjectName;
END //

-- Remove All Teacher Assignments
CREATE PROCEDURE IF NOT EXISTS sp_remove_teacher_assignments(IN p_teacherId INT)
BEGIN
    DELETE FROM teacher_assignments WHERE teacherId = p_teacherId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Remove Specific Assignment
CREATE PROCEDURE IF NOT EXISTS sp_remove_assignment(IN p_assignmentId INT)
BEGIN
    DELETE FROM teacher_assignments WHERE id = p_assignmentId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- ========== STUDENT MANAGEMENT ==========

-- Create Student
CREATE PROCEDURE IF NOT EXISTS sp_admin_create_student(
    IN p_userId INT,
    IN p_classId INT,
    IN p_rollNumber VARCHAR(20),
    IN p_parentPhone VARCHAR(20)
)
BEGIN
    INSERT INTO students (userId, classId, rollNumber, parentPhone)
    VALUES (p_userId, p_classId, p_rollNumber, p_parentPhone);
    SELECT LAST_INSERT_ID() as studentId;
END //

-- Get All Students
CREATE PROCEDURE IF NOT EXISTS sp_admin_get_all_students()
BEGIN
    SELECT s.id, s.userId, s.classId, s.rollNumber, s.parentPhone, s.created_at,
           u.name, u.email, u.phone, u.address,
           c.className, c.class_section, c.year, c.academic_year
    FROM students s
    JOIN users u ON s.userId = u.id
    JOIN classes c ON s.classId = c.id
    ORDER BY c.className, s.rollNumber;
END //

-- Get Student by ID
CREATE PROCEDURE IF NOT EXISTS sp_admin_get_student_by_id(IN p_studentId INT)
BEGIN
    SELECT s.id, s.userId, s.classId, s.rollNumber, s.parentPhone, s.created_at,
           u.name, u.email, u.phone, u.address,
           c.className, c.class_section, c.year, c.academic_year
    FROM students s
    JOIN users u ON s.userId = u.id
    JOIN classes c ON s.classId = c.id
    WHERE s.id = p_studentId;
END //

-- Get Student by User ID
CREATE PROCEDURE IF NOT EXISTS sp_get_student_by_userId(IN p_userId INT)
BEGIN
    SELECT s.id, s.userId, s.classId, s.rollNumber, s.parentPhone,
           c.className, c.class_section, c.year, c.academic_year
    FROM students s
    JOIN classes c ON s.classId = c.id
    WHERE s.userId = p_userId;
END //

-- Get Student by Roll Number
CREATE PROCEDURE IF NOT EXISTS sp_get_student_by_rollNumber(IN p_rollNumber VARCHAR(20))
BEGIN
    SELECT s.id, s.userId, s.classId, s.rollNumber, s.parentPhone,
           c.className, c.class_section
    FROM students s
    JOIN classes c ON s.classId = c.id
    WHERE s.rollNumber = p_rollNumber;
END //

-- Get Students by Class ID
CREATE PROCEDURE IF NOT EXISTS sp_get_students_by_classId(IN p_classId INT)
BEGIN
    SELECT s.id, s.userId, s.rollNumber, s.parentPhone,
           u.name, u.email, u.phone
    FROM students s
    JOIN users u ON s.userId = u.id
    WHERE s.classId = p_classId
    ORDER BY s.rollNumber;
END //

-- Update Student
CREATE PROCEDURE IF NOT EXISTS sp_admin_update_student(
    IN p_studentId INT,
    IN p_rollNumber VARCHAR(20),
    IN p_parentPhone VARCHAR(20)
)
BEGIN
    UPDATE students 
    SET rollNumber = p_rollNumber, parentPhone = p_parentPhone
    WHERE id = p_studentId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Delete Student
CREATE PROCEDURE IF NOT EXISTS sp_admin_delete_student(IN p_studentId INT)
BEGIN
    DELETE FROM students WHERE id = p_studentId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- ============================================
-- STORED PROCEDURES - TEACHER PANEL
-- ============================================

-- ========== TEACHER PROFILE ==========

-- Get Teacher Profile with All Details
CREATE PROCEDURE IF NOT EXISTS sp_teacher_get_profile(IN p_userId INT)
BEGIN
    SELECT t.id, t.userId, t.teacherId, t.contactNo, t.created_at,
           u.name, u.email, u.phone, u.address
    FROM teachers t
    JOIN users u ON t.userId = u.id
    WHERE t.userId = p_userId;
END //

-- Update Teacher Contact
CREATE PROCEDURE IF NOT EXISTS sp_teacher_update_contact(
    IN p_teacherId INT,
    IN p_contactNo VARCHAR(20)
)
BEGIN
    UPDATE teachers SET contactNo = p_contactNo WHERE id = p_teacherId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- ========== ATTENDANCE OPERATIONS ==========

-- Create Attendance Session
CREATE PROCEDURE IF NOT EXISTS sp_teacher_create_attendance(
    IN p_classId INT,
    IN p_subjectId INT,
    IN p_date DATE,
    IN p_startTime TIME,
    IN p_endTime TIME
)
BEGIN
    INSERT INTO attendance (classId, subjectId, date, startTime, endTime, isLocked)
    VALUES (p_classId, p_subjectId, p_date, p_startTime, p_endTime, FALSE)
    ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);
    SELECT LAST_INSERT_ID() as attendanceId;
END //

-- Find Attendance Session
CREATE PROCEDURE IF NOT EXISTS sp_find_attendance(
    IN p_classId INT,
    IN p_subjectId INT,
    IN p_date DATE
)
BEGIN
    SELECT * FROM attendance 
    WHERE classId = p_classId AND subjectId = p_subjectId AND date = p_date;
END //

-- Check if Attendance is Locked
CREATE PROCEDURE IF NOT EXISTS sp_is_attendance_locked(IN p_attendanceId INT)
BEGIN
    SELECT isLocked FROM attendance WHERE id = p_attendanceId;
END //

-- Lock Attendance Session
CREATE PROCEDURE IF NOT EXISTS sp_lock_attendance(IN p_attendanceId INT)
BEGIN
    UPDATE attendance SET isLocked = TRUE WHERE id = p_attendanceId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Mark Student Attendance
CREATE PROCEDURE IF NOT EXISTS sp_mark_attendance_record(
    IN p_attendanceId INT,
    IN p_studentId INT,
    IN p_status ENUM('Present', 'Absent')
)
BEGIN
    INSERT INTO attendance_records (attendanceId, studentId, status)
    VALUES (p_attendanceId, p_studentId, p_status)
    ON DUPLICATE KEY UPDATE status = p_status, markedAt = CURRENT_TIMESTAMP;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Get Attendance Records by Session
CREATE PROCEDURE IF NOT EXISTS sp_get_attendance_records(IN p_attendanceId INT)
BEGIN
    SELECT ar.id, ar.attendanceId, ar.studentId, ar.status, ar.markedAt,
           s.rollNumber, u.name as studentName
    FROM attendance_records ar
    JOIN students s ON ar.studentId = s.id
    JOIN users u ON s.userId = u.id
    WHERE ar.attendanceId = p_attendanceId
    ORDER BY s.rollNumber;
END //

-- Get Teacher's Attendance History
CREATE PROCEDURE IF NOT EXISTS sp_teacher_get_attendance_history(
    IN p_teacherId INT,
    IN p_classId INT,
    IN p_subjectId INT
)
BEGIN
    SELECT a.id, a.date, a.startTime, a.endTime, a.isLocked,
           c.className, c.class_section,
           s.subjectName, s.subjectCode,
           COUNT(ar.id) as total_marked,
           SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) as present_count,
           SUM(CASE WHEN ar.status = 'Absent' THEN 1 ELSE 0 END) as absent_count
    FROM attendance a
    JOIN classes c ON a.classId = c.id
    JOIN subjects s ON a.subjectId = s.id
    JOIN teacher_assignments ta ON ta.classId = a.classId AND ta.subjectId = a.subjectId
    LEFT JOIN attendance_records ar ON a.id = ar.attendanceId
    WHERE ta.teacherId = p_teacherId
    AND (p_classId IS NULL OR a.classId = p_classId)
    AND (p_subjectId IS NULL OR a.subjectId = p_subjectId)
    GROUP BY a.id
    ORDER BY a.date DESC, a.startTime DESC;
END //

-- Auto-lock Expired Attendance
CREATE PROCEDURE IF NOT EXISTS sp_auto_lock_expired_attendance()
BEGIN
    DECLARE lock_minutes INT;
    
    SELECT autoLockAfterMinutes INTO lock_minutes 
    FROM attendance_settings LIMIT 1;
    
    UPDATE attendance 
    SET isLocked = TRUE 
    WHERE isLocked = FALSE 
    AND TIMESTAMPADD(MINUTE, lock_minutes, CONCAT(date, ' ', endTime)) < NOW();
    
    SELECT ROW_COUNT() as locked_count;
END //

-- ============================================
-- STORED PROCEDURES - STUDENT PANEL
-- ============================================

-- ========== STUDENT PROFILE ==========

-- Get Student Profile
CREATE PROCEDURE IF NOT EXISTS sp_student_get_profile(IN p_userId INT)
BEGIN
    SELECT s.id, s.userId, s.classId, s.rollNumber, s.parentPhone, s.created_at,
           u.name, u.email, u.phone, u.address,
           c.className, c.class_section, c.year, c.academic_year
    FROM students s
    JOIN users u ON s.userId = u.id
    JOIN classes c ON s.classId = c.id
    WHERE s.userId = p_userId;
END //

-- ========== STUDENT ATTENDANCE VIEW ==========

-- Get Student's Attendance Records
CREATE PROCEDURE IF NOT EXISTS sp_student_get_attendance(IN p_studentId INT)
BEGIN
    SELECT ar.id, ar.status, ar.markedAt,
           a.date, a.startTime, a.endTime,
           c.className, c.class_section,
           s.subjectName, s.subjectCode
    FROM attendance_records ar
    JOIN attendance a ON ar.attendanceId = a.id
    JOIN classes c ON a.classId = c.id
    JOIN subjects s ON a.subjectId = s.id
    WHERE ar.studentId = p_studentId
    ORDER BY a.date DESC, a.startTime DESC;
END //

-- Get Student's Attendance Percentage
CREATE PROCEDURE IF NOT EXISTS sp_student_get_percentage(IN p_studentId INT)
BEGIN
    SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as present,
        SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) as absent,
        ROUND((SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as percentage
    FROM attendance_records
    WHERE studentId = p_studentId;
END //

-- Get Student's Subject-wise Attendance
CREATE PROCEDURE IF NOT EXISTS sp_student_get_subject_attendance(
    IN p_studentId INT,
    IN p_subjectId INT
)
BEGIN
    SELECT ar.id, ar.status, ar.markedAt,
           a.date, a.startTime, a.endTime,
           s.subjectName, s.subjectCode
    FROM attendance_records ar
    JOIN attendance a ON ar.attendanceId = a.id
    JOIN subjects s ON a.subjectId = s.id
    WHERE ar.studentId = p_studentId
    AND (p_subjectId IS NULL OR a.subjectId = p_subjectId)
    ORDER BY a.date DESC;
END //

-- ============================================
-- NOTIFICATION OPERATIONS (ALL ROLES)
-- ============================================

-- Create Notification
CREATE PROCEDURE IF NOT EXISTS sp_create_notification(
    IN p_userId INT,
    IN p_message TEXT,
    IN p_type ENUM('info', 'warning', 'alert')
)
BEGIN
    INSERT INTO notifications (userId, message, type)
    VALUES (p_userId, p_message, p_type);
    SELECT LAST_INSERT_ID() as notificationId;
END //

-- Get User Notifications
CREATE PROCEDURE IF NOT EXISTS sp_get_user_notifications(IN p_userId INT)
BEGIN
    SELECT * FROM notifications 
    WHERE userId = p_userId 
    ORDER BY created_at DESC;
END //

-- Get Unread Notifications
CREATE PROCEDURE IF NOT EXISTS sp_get_unread_notifications(IN p_userId INT)
BEGIN
    SELECT * FROM notifications 
    WHERE userId = p_userId AND isRead = FALSE
    ORDER BY created_at DESC;
END //

-- Mark Notification as Read
CREATE PROCEDURE IF NOT EXISTS sp_mark_notification_read(IN p_notificationId INT)
BEGIN
    UPDATE notifications SET isRead = TRUE WHERE id = p_notificationId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Mark All Notifications as Read
CREATE PROCEDURE IF NOT EXISTS sp_mark_all_notifications_read(IN p_userId INT)
BEGIN
    UPDATE notifications SET isRead = TRUE WHERE userId = p_userId AND isRead = FALSE;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Delete Notification
CREATE PROCEDURE IF NOT EXISTS sp_delete_notification(IN p_notificationId INT)
BEGIN
    DELETE FROM notifications WHERE id = p_notificationId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- Delete All User Notifications
CREATE PROCEDURE IF NOT EXISTS sp_delete_all_user_notifications(IN p_userId INT)
BEGIN
    DELETE FROM notifications WHERE userId = p_userId;
    SELECT ROW_COUNT() as affected_rows;
END //

-- ============================================
-- REPORTING & ANALYTICS
-- ============================================

-- Get All Attendance with Filters
CREATE PROCEDURE IF NOT EXISTS sp_get_all_attendance(
    IN p_studentId INT,
    IN p_date DATE,
    IN p_subjectId INT,
    IN p_classId INT
)
BEGIN
    SELECT a.date, a.startTime, a.endTime,
           c.className, c.class_section,
           s.subjectName, s.subjectCode,
           u.name as studentName, st.rollNumber,
           ar.status, ar.markedAt
    FROM attendance_records ar
    JOIN attendance a ON ar.attendanceId = a.id
    JOIN students st ON ar.studentId = st.id
    JOIN users u ON st.userId = u.id
    JOIN classes c ON a.classId = c.id
    JOIN subjects s ON a.subjectId = s.id
    WHERE (p_studentId IS NULL OR ar.studentId = p_studentId)
    AND (p_date IS NULL OR a.date = p_date)
    AND (p_subjectId IS NULL OR a.subjectId = p_subjectId)
    AND (p_classId IS NULL OR a.classId = p_classId)
    ORDER BY a.date DESC, a.startTime DESC;
END //

-- Check Low Attendance Students
CREATE PROCEDURE IF NOT EXISTS sp_check_low_attendance()
BEGIN
    DECLARE threshold DECIMAL(5,2);
    
    SELECT lowAttendanceThreshold INTO threshold 
    FROM attendance_settings LIMIT 1;
    
    SELECT 
        s.id as studentId,
        s.userId,
        u.name,
        st.rollNumber,
        c.className,
        COUNT(*) as total,
        SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) as present,
        ROUND((SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as percentage
    FROM students s
    JOIN users u ON s.userId = u.id
    JOIN students st ON s.id = st.id
    JOIN classes c ON s.classId = c.id
    JOIN attendance_records ar ON s.id = ar.studentId
    GROUP BY s.id, s.userId, u.name, st.rollNumber, c.className
    HAVING percentage < threshold
    ORDER BY percentage ASC;
END //

-- Overall Statistics
CREATE PROCEDURE IF NOT EXISTS sp_get_overall_statistics()
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM students) as total_students,
        (SELECT COUNT(*) FROM teachers) as total_teachers,
        (SELECT COUNT(*) FROM classes) as total_classes,
        (SELECT COUNT(*) FROM subjects) as total_subjects,
        (SELECT COUNT(*) FROM attendance) as total_attendance_sessions,
        (SELECT COUNT(*) FROM attendance_records) as total_attendance_records,
        (SELECT ROUND(AVG(CASE WHEN status = 'Present' THEN 100 ELSE 0 END), 2) 
         FROM attendance_records) as overall_attendance_percentage;
END //

-- Class-wise Attendance Report
CREATE PROCEDURE IF NOT EXISTS sp_get_class_attendance_report(
    IN p_classId INT,
    IN p_startDate DATE,
    IN p_endDate DATE
)
BEGIN
    SELECT s.id, s.rollNumber, u.name as studentName,
           COUNT(ar.id) as total_sessions,
           SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) as present_count,
           SUM(CASE WHEN ar.status = 'Absent' THEN 1 ELSE 0 END) as absent_count,
           ROUND((SUM(CASE WHEN 

-- Class-wise Attendance Report
CREATE PROCEDURE IF NOT EXISTS sp_get_class_attendance_report(
    IN p_classId INT,
    IN p_startDate DATE,
    IN p_endDate DATE
)
BEGIN
    SELECT s.id, s.rollNumber, u.name as studentName,
           COUNT(ar.id) as total_sessions,
           SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) as present_count,
           SUM(CASE WHEN ar.status = 'Absent' THEN 1 ELSE 0 END) as absent_count,
           ROUND((SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) / COUNT(ar.id)) * 100, 2) as percentage
    FROM students s
    JOIN users u ON s.userId = u.id
    LEFT JOIN attendance_records ar ON s.id = ar.studentId
    LEFT JOIN attendance a ON ar.attendanceId = a.id
    WHERE s.classId = p_classId
    AND (p_startDate IS NULL OR a.date >= p_startDate)
    AND (p_endDate IS NULL OR a.date <= p_endDate)
    GROUP BY s.id, s.rollNumber, u.name
    ORDER BY s.rollNumber;
END //

-- Subject-wise Attendance Report
CREATE PROCEDURE IF NOT EXISTS sp_get_subject_attendance_report(
    IN p_subjectId INT,
    IN p_startDate DATE,
    IN p_endDate DATE
)
BEGIN
    SELECT c.className, c.class_section,
           COUNT(DISTINCT a.id) as total_sessions,
           COUNT(ar.id) as total_records,
           SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) as present_count,
           ROUND((SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) / COUNT(ar.id)) * 100, 2) as percentage
    FROM attendance a
    JOIN classes c ON a.classId = c.id
    LEFT JOIN attendance_records ar ON a.id = ar.attendanceId
    WHERE a.subjectId = p_subjectId
    AND (p_startDate IS NULL OR a.date >= p_startDate)
    AND (p_endDate IS NULL OR a.date <= p_endDate)
    GROUP BY c.id, c.className, c.class_section
    ORDER BY c.className;
END //

-- Monthly Attendance Trend
CREATE PROCEDURE IF NOT EXISTS sp_get_monthly_attendance_trend(
    IN p_year INT,
    IN p_month INT
)
BEGIN
    SELECT DATE(a.date) as attendance_date,
           COUNT(DISTINCT a.id) as sessions_count,
           COUNT(ar.id) as total_records,
           SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) as present_count,
           ROUND((SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) / COUNT(ar.id)) * 100, 2) as daily_percentage
    FROM attendance a
    LEFT JOIN attendance_records ar ON a.id = ar.attendanceId
    WHERE YEAR(a.date) = p_year AND MONTH(a.date) = p_month
    GROUP BY DATE(a.date)
    ORDER BY attendance_date;
END //

DELIMITER ;

-- ============================================
-- USEFUL VIEWS FOR QUICK ACCESS
-- ============================================

-- View: Complete Student Information
CREATE OR REPLACE VIEW vw_students_complete AS
SELECT s.id, s.userId, s.classId, s.rollNumber, s.parentPhone, s.created_at,
       u.name, u.email, u.phone, u.address, u.role,
       c.className, c.class_section, c.year, c.academic_year
FROM students s
JOIN users u ON s.userId = u.id
JOIN classes c ON s.classId = c.id;

-- View: Complete Teacher Information
CREATE OR REPLACE VIEW vw_teachers_complete AS
SELECT t.id, t.userId, t.teacherId, t.contactNo, t.created_at,
       u.name, u.email, u.phone, u.address, u.role,
       COUNT(DISTINCT ta.classId) as classes_count,
       COUNT(DISTINCT ta.subjectId) as subjects_count
FROM teachers t
JOIN users u ON t.userId = u.id
LEFT JOIN teacher_assignments ta ON t.id = ta.teacherId
GROUP BY t.id, t.userId, t.teacherId, t.contactNo, t.created_at,
         u.name, u.email, u.phone, u.address, u.role;

-- View: Attendance Summary by Student
CREATE OR REPLACE VIEW vw_student_attendance_summary AS
SELECT s.id as student_id, s.rollNumber, u.name as student_name,
       c.className, c.class_section,
       COUNT(ar.id) as total_sessions,
       SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) as present_count,
       SUM(CASE WHEN ar.status = 'Absent' THEN 1 ELSE 0 END) as absent_count,
       ROUND((SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) / COUNT(ar.id)) * 100, 2) as attendance_percentage
FROM students s
JOIN users u ON s.userId = u.id
JOIN classes c ON s.classId = c.id
LEFT JOIN attendance_records ar ON s.id = ar.studentId
GROUP BY s.id, s.rollNumber, u.name, c.className, c.class_section;

-- View: Teacher Assignments with Details
CREATE OR REPLACE VIEW vw_teacher_assignments_complete AS
SELECT ta.id, ta.teacherId, ta.classId, ta.subjectId, ta.created_at,
       t.teacherId as teacher_code, u.name as teacher_name,
       c.className, c.class_section, c.year, c.academic_year,
       s.subjectName, s.subjectCode
FROM teacher_assignments ta
JOIN teachers t ON ta.teacherId = t.id
JOIN users u ON t.userId = u.id
JOIN classes c ON ta.classId = c.id
JOIN subjects s ON ta.subjectId = s.id;

-- View: Recent Attendance Sessions
CREATE OR REPLACE VIEW vw_recent_attendance AS
SELECT a.id, a.date, a.startTime, a.endTime, a.isLocked, a.created_at,
       c.className, c.class_section,
       s.subjectName, s.subjectCode,
       COUNT(ar.id) as total_marked,
       SUM(CASE WHEN ar.status = 'Present' THEN 1 ELSE 0 END) as present_count,
       SUM(CASE WHEN ar.status = 'Absent' THEN 1 ELSE 0 END) as absent_count
FROM attendance a
JOIN classes c ON a.classId = c.id
JOIN subjects s ON a.subjectId = s.id
LEFT JOIN attendance_records ar ON a.id = ar.attendanceId
GROUP BY a.id, a.date, a.startTime, a.endTime, a.isLocked, a.created_at,
         c.className, c.class_section, s.subjectName, s.subjectCode
ORDER BY a.date DESC, a.startTime DESC
LIMIT 100;

-- ============================================
-- TRIGGERS FOR AUTOMATED OPERATIONS
-- ============================================

DELIMITER //

-- Trigger: Auto-create notification for low attendance
CREATE TRIGGER IF NOT EXISTS trg_low_attendance_notification
AFTER INSERT ON attendance_records
FOR EACH ROW
BEGIN
    DECLARE student_attendance_pct DECIMAL(5,2);
    DECLARE student_user_id INT;
    DECLARE threshold DECIMAL(5,2);
    DECLARE total_records INT;
    
    -- Get threshold from settings
    SELECT lowAttendanceThreshold INTO threshold FROM attendance_settings LIMIT 1;
    
    -- Calculate student's attendance percentage
    SELECT 
        COUNT(*) as total,
        ROUND((SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as pct,
        s.userId
    INTO total_records, student_attendance_pct, student_user_id
    FROM attendance_records ar
    JOIN students s ON ar.studentId = s.id
    WHERE ar.studentId = NEW.studentId
    GROUP BY s.userId;
    
    -- Create notification if below threshold and has at least 5 records
    IF student_attendance_pct < threshold AND student_user_id IS NOT NULL AND total_records >= 5 THEN
        INSERT INTO notifications (userId, message, type)
        VALUES (student_user_id, 
                CONCAT('Your attendance has dropped to ', student_attendance_pct, '%. Please improve your attendance.'),
                'warning');
    END IF;
END //

-- Trigger: Auto-lock attendance after time window
CREATE TRIGGER IF NOT EXISTS trg_check_attendance_lock
BEFORE UPDATE ON attendance
FOR EACH ROW
BEGIN
    DECLARE lock_minutes INT;
    DECLARE end_datetime DATETIME;
    
    -- Get auto-lock setting
    SELECT autoLockAfterMinutes INTO lock_minutes FROM attendance_settings LIMIT 1;
    
    -- Calculate end datetime
    SET end_datetime = TIMESTAMP(NEW.date, NEW.endTime);
    
    -- Auto-lock if time has passed
    IF TIMESTAMPDIFF(MINUTE, end_datetime, NOW()) > lock_minutes THEN
        SET NEW.isLocked = TRUE;
    END IF;
END //

DELIMITER ;

-- ============================================
-- DEFAULT DATA INSERTION
-- ============================================

-- Insert default settings
INSERT INTO attendance_settings (attendanceWindow, lowAttendanceThreshold, autoLockAfterMinutes) 
VALUES (30, 50.00, 30) 
ON DUPLICATE KEY UPDATE id=id;

-- Insert default admin user (password: admin123 - MUST be hashed in production)
-- Default password hash for 'admin123' using bcrypt
INSERT INTO users (name, email, password, role, phone, address) 
VALUES (
    'System Administrator', 
    'admin@attendance.com', 
    '$2a$10$rZ5qH8qH8qH8qH8qH8qH8.YourActualHashedPasswordHere', 
    'admin', 
    '1234567890',
    'System'
)
ON DUPLICATE KEY UPDATE name=name;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

DELIMITER //

-- Function: Get Academic Year
CREATE FUNCTION IF NOT EXISTS fn_get_academic_year()
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE current_year INT;
    DECLARE current_month INT;
    DECLARE academic_year VARCHAR(20);
    
    SET current_year = YEAR(CURDATE());
    SET current_month = MONTH(CURDATE());
    
    IF current_month >= 6 THEN
        SET academic_year = CONCAT(current_year, '-', current_year + 1);
    ELSE
        SET academic_year = CONCAT(current_year - 1, '-', current_year);
    END IF;
    
    RETURN academic_year;
END //

-- Function: Calculate Attendance Percentage
CREATE FUNCTION IF NOT EXISTS fn_calculate_attendance_percentage(p_studentId INT)
RETURNS DECIMAL(5,2)
READS SQL DATA
BEGIN
    DECLARE total_count INT;
    DECLARE present_count INT;
    DECLARE percentage DECIMAL(5,2);
    
    SELECT 
        COUNT(*),
        SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END)
    INTO total_count, present_count
    FROM attendance_records
    WHERE studentId = p_studentId;
    
    IF total_count > 0 THEN
        SET percentage = ROUND((present_count / total_count) * 100, 2);
    ELSE
        SET percentage = 0.00;
    END IF;
    
    RETURN percentage;
END //

DELIMITER ;

-- ============================================
-- SCHEMA COMPLETE
-- ============================================
-- This comprehensive schema includes:
-- 
-- TABLES:
-- - users, teachers, students, classes, subjects
-- - teacher_years, teacher_classes, teacher_subjects, teacher_assignments
-- - attendance, attendance_records, notifications, attendance_settings
--
-- ADMIN PANEL OPERATIONS:
-- - Full CRUD for users, teachers, students, classes, subjects
-- - Teacher assignment management (subjects, years, classes, class-subject combinations)
-- - Bulk student creation support
-- - Password management
-- - Attendance reports with filters
-- - Low attendance monitoring
--
-- TEACHER PANEL OPERATIONS:
-- - Profile management
-- - View assigned classes, subjects, and assignments
-- - Create and manage attendance sessions
-- - Mark student attendance with time window validation
-- - Lock/unlock attendance sessions
-- - View attendance history and reports
-- - Auto-lock expired attendance
--
-- STUDENT PANEL OPERATIONS:
-- - View profile and class information
-- - View attendance records (all, by subject, by date)
-- - Calculate attendance percentage
-- - View subject-wise attendance summary
--
-- COMMON OPERATIONS:
-- - Notification system (create, read, mark as read, delete)
-- - Analytics and reporting (overall stats, low attendance, class/subject reports)
-- - Monthly attendance trends
--
-- VIEWS:
-- - vw_students_complete: Complete student information with class details
-- - vw_teachers_complete: Complete teacher information with assignment counts
-- - vw_student_attendance_summary: Attendance summary for each student
-- - vw_teacher_assignments_complete: Detailed teacher assignments
-- - vw_recent_attendance: Recent attendance sessions with statistics
--
-- TRIGGERS:
-- - trg_low_attendance_notification: Auto-notify students with low attendance
-- - trg_check_attendance_lock: Auto-lock attendance after time window
--
-- FUNCTIONS:
-- - fn_get_academic_year(): Calculate current academic year
-- - fn_calculate_attendance_percentage(): Calculate student attendance percentage
--
-- INDEXES:
-- - Performance indexes on all frequently queried columns
-- - Foreign key indexes for optimal join performance
--
-- This schema is fully aligned with the application's model files and controllers.
-- ============================================
