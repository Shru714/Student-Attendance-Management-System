CREATE DATABASE IF NOT EXISTS attendance_system;
USE attendance_system;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'teacher', 'student') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    className VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    teacherId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacherId) REFERENCES users(id) ON DELETE SET NULL
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    classId INT NOT NULL,
    rollNumber VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (classId) REFERENCES classes(id) ON DELETE CASCADE
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    classId INT NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (classId) REFERENCES classes(id) ON DELETE CASCADE
);

-- Attendance records table
CREATE TABLE IF NOT EXISTS attendance_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    attendanceId INT NOT NULL,
    studentId INT NOT NULL,
    status ENUM('Present', 'Absent') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (attendanceId) REFERENCES attendance(id) ON DELETE CASCADE,
    FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE KEY unique_attendance (attendanceId, studentId)
);

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', '$2a$10$YourHashedPasswordHere', 'admin')
ON DUPLICATE KEY UPDATE name=name;
