-- Compatible MySQL Schema for Attendance System
-- Works with MySQL 5.7+

CREATE DATABASE IF NOT EXISTS attendance_system;
USE attendance_system;

-- Drop tables if they exist (for clean install)
-- Uncomment these lines if you want to recreate tables
-- DROP TABLE IF EXISTS attendance_records;
-- DROP TABLE IF EXISTS attendance;
-- DROP TABLE IF EXISTS notifications;
-- DROP TABLE IF EXISTS teacher_assignments;
-- DROP TABLE IF EXISTS teacher_subjects;
-- DROP TABLE IF EXISTS teacher_classes;
-- DROP TABLE IF EXISTS teacher_years;
-- DROP TABLE IF EXISTS students;
-- DROP TABLE IF EXISTS teachers;
-- DROP TABLE IF EXISTS classes;
-- DROP TABLE IF EXISTS subjects;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS attendance_settings;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'teacher', 'student') NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subjectName VARCHAR(100) NOT NULL,
    subjectCode VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    className VARCHAR(100) NOT NULL,
    class_section VARCHAR(50),
    year INT NOT NULL,
    academic_year VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    teacherId VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    contactNo VARCHAR(20) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
);

-- Teacher years table
CREATE TABLE IF NOT EXISTS teacher_years (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacherId INT NOT NULL,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacherId) REFERENCES teachers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_year (teacherId, year)
);

-- Teacher classes table
CREATE TABLE IF NOT EXISTS teacher_classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacherId INT NOT NULL,
    classId INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacherId) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (classId) REFERENCES classes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_class (teacherId, classId)
);

-- Teacher subjects table
CREATE TABLE IF NOT EXISTS teacher_subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacherId INT NOT NULL,
    subjectId INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacherId) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (subjectId) REFERENCES subjects(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_subject (teacherId, subjectId)
);

-- Teacher assignments table
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

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    classId INT NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    rollNumber VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100),
    address TEXT,
    student_contact VARCHAR(20),
    parent_contact VARCHAR(20),
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
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
    FOREIGN KEY (classId) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (subjectId) REFERENCES subjects(id) ON DELETE CASCADE
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
    UNIQUE KEY unique_attendance (attendanceId, studentId)
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

-- Attendance settings table
CREATE TABLE IF NOT EXISTS attendance_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    attendanceWindow INT DEFAULT 30,
    lowAttendanceThreshold DECIMAL(5,2) DEFAULT 50.00,
    autoLockAfterMinutes INT DEFAULT 30
);

-- Insert default settings
INSERT INTO attendance_settings (attendanceWindow, lowAttendanceThreshold, autoLockAfterMinutes) 
VALUES (30, 50.00, 30) 
ON DUPLICATE KEY UPDATE id=id;

-- Insert default admin user (password: admin123)
-- Note: Replace $2a$10$YourHashedPasswordHere with actual bcrypt hash
INSERT INTO users (name, email, password, role) 
VALUES ('Admin User', 'admin@example.com', '$2a$10$YourHashedPasswordHere', 'admin')
ON DUPLICATE KEY UPDATE name=name;

-- Create indexes for better performance
CREATE INDEX idx_attendance_records_student ON attendance_records(studentId);
CREATE INDEX idx_attendance_records_attendance ON attendance_records(attendanceId);
CREATE INDEX idx_attendance_class ON attendance(classId);
CREATE INDEX idx_attendance_subject ON attendance(subjectId);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_teacher_classes_teacher ON teacher_classes(teacherId);
CREATE INDEX idx_teacher_classes_class ON teacher_classes(classId);
CREATE INDEX idx_teacher_subjects_teacher ON teacher_subjects(teacherId);
CREATE INDEX idx_teacher_subjects_subject ON teacher_subjects(subjectId);
CREATE INDEX idx_students_class ON students(classId);
CREATE INDEX idx_students_user ON students(userId);

-- Success message
SELECT 'Database schema created successfully!' AS message;
