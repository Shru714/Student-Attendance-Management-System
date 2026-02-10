-- Run this in phpMyAdmin to check your data
-- Copy and paste into phpMyAdmin SQL tab

-- 1. Show all databases
SHOW DATABASES;

-- 2. Use attendance_system
USE attendance_system;

-- 3. Show all tables
SHOW TABLES;

-- 4. Count records in each table
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'teachers', COUNT(*) FROM teachers
UNION ALL
SELECT 'students', COUNT(*) FROM students
UNION ALL
SELECT 'classes', COUNT(*) FROM classes
UNION ALL
SELECT 'subjects', COUNT(*) FROM subjects
UNION ALL
SELECT 'attendance', COUNT(*) FROM attendance
UNION ALL
SELECT 'attendance_records', COUNT(*) FROM attendance_records
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications;

-- 5. Show all users
SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC;

-- 6. Show all teachers with user info
SELECT 
    t.id as teacher_id,
    t.teacherId as teacher_code,
    t.contactNo,
    u.name,
    u.email,
    u.phone,
    t.created_at
FROM teachers t
JOIN users u ON t.userId = u.id
ORDER BY t.created_at DESC;

-- 7. Show recent activity (last 10 records)
SELECT 'user' as type, id, name as info, created_at FROM users
UNION ALL
SELECT 'teacher', t.id, CONCAT(u.name, ' (', t.teacherId, ')'), t.created_at 
FROM teachers t JOIN users u ON t.userId = u.id
ORDER BY created_at DESC
LIMIT 10;
