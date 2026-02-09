CREATE DATABASE IF NOT EXISTS attendance_system;
USE attendance_system;

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

-- Subjects table (create before teachers)
CREATE TABLE IF NOT EXISTS subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    subjectName VARCHAR(100) NOT NULL,
    subjectCode VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes table (enhanced with section and academic year)
CREATE TABLE IF NOT EXISTS classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    className VARCHAR(100) NOT NULL,
    class_section VARCHAR(50),
    year INT NOT NULL,
    academic_year VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teachers table (enhanced with unique teacher ID and contact)
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

-- Teacher years (many-to-many: teachers can teach multiple years)
CREATE TABLE IF NOT EXISTS teacher_years (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacherId INT NOT NULL,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacherId) REFERENCES teachers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_year (teacherId, year)
);

-- Teacher classes (many-to-many: teachers can be assigned to multiple classes)
CREATE TABLE IF NOT EXISTS teacher_classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacherId INT NOT NULL,
    classId INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacherId) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (classId) REFERENCES classes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_class (teacherId, classId)
);

-- Teacher subjects (many-to-many: teachers can teach multiple subjects)
CREATE TABLE IF NOT EXISTS teacher_subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacherId INT NOT NULL,
    subjectId INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacherId) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (subjectId) REFERENCES subjects(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_subject (teacherId, subjectId)
);

-- Teacher assignments (many-to-many: teachers can teach multiple classes/subjects)
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

-- Students table (enhanced with all required fields)
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

-- Attendance table (with subject and time tracking)
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

-- Attendance settings
CREATE TABLE IF NOT EXISTS attendance_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    attendanceWindow INT DEFAULT 30,
    lowAttendanceThreshold DECIMAL(5,2) DEFAULT 50.00,
    autoLockAfterMinutes INT DEFAULT 30
);

-- Insert default settings
INSERT INTO attendance_settings (attendanceWindow, lowAttendanceThreshold, autoLockAfterMinutes) 
VALUES (30, 50.00, 30) ON DUPLICATE KEY UPDATE id=id;

-- Insert default settings
INSERT INTO attendance_settings (attendanceWindow, lowAttendanceThreshold, autoLockAfterMinutes) 
VALUES (30, 50.00, 30) ON DUPLICATE KEY UPDATE id=id;

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password, role) 
VALUES ('Admin User', 'admin@example.com', '$2a$10$YourHashedPasswordHere', 'admin')
ON DUPLICATE KEY UPDATE name=name;

-- ALTER STATEMENTS FOR SCHEMA MODIFICATIONS
-- These ensure all necessary columns and constraints exist

-- Add missing columns to teachers table if they don't exist
ALTER TABLE teachers 
ADD COLUMN IF NOT EXISTS name VARCHAR(100) NOT NULL DEFAULT 'Unknown',
ADD COLUMN IF NOT EXISTS email VARCHAR(100),
ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

-- Add missing columns to students table if they don't exist
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS student_name VARCHAR(100) NOT NULL DEFAULT 'Unknown',
ADD COLUMN IF NOT EXISTS email VARCHAR(100),
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS student_contact VARCHAR(20),
ADD COLUMN IF NOT EXISTS parent_contact VARCHAR(20),
ADD COLUMN IF NOT EXISTS password VARCHAR(255);

-- Add missing columns to classes table if they don't exist
ALTER TABLE classes 
ADD COLUMN IF NOT EXISTS class_section VARCHAR(50),
ADD COLUMN IF NOT EXISTS academic_year VARCHAR(20);

-- Ensure unique constraints on key fields
ALTER TABLE teachers 
ADD UNIQUE KEY IF NOT EXISTS unique_teacher_id (teacherId);

ALTER TABLE students 
ADD UNIQUE KEY IF NOT EXISTS unique_roll_number (rollNumber);

-- Add indexes for better query performance
ALTER TABLE attendance_records 
ADD INDEX IF NOT EXISTS idx_student_id (studentId),
ADD INDEX IF NOT EXISTS idx_attendance_id (attendanceId),
ADD INDEX IF NOT EXISTS idx_date (markedAt);

ALTER TABLE attendance 
ADD INDEX IF NOT EXISTS idx_class_id (classId),
ADD INDEX IF NOT EXISTS idx_subject_id (subjectId),
ADD INDEX IF NOT EXISTS idx_date (date);

ALTER TABLE teacher_classes 
ADD INDEX IF NOT EXISTS idx_teacher_id (teacherId),
ADD INDEX IF NOT EXISTS idx_class_id (classId);

ALTER TABLE teacher_subjects 
ADD INDEX IF NOT EXISTS idx_teacher_id (teacherId),
ADD INDEX IF NOT EXISTS idx_subject_id (subjectId);

ALTER TABLE students 
ADD INDEX IF NOT EXISTS idx_class_id (classId),
ADD INDEX IF NOT EXISTS idx_user_id (userId);
