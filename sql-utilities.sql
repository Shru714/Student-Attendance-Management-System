-- ============================================
-- SQL UTILITIES - CONSOLIDATED
-- Student Attendance Management System
-- All SQL utility scripts in one file
-- ============================================

USE attendance_system;

-- ============================================
-- SECTION 1: CHECK TEACHERS
-- View all teachers with their details
-- ============================================

SELECT '=== ALL TEACHERS ===' AS '';
SELECT 
  t.id AS 'ID',
  t.teacher_id AS 'Teacher ID',
  u.name AS 'Name',
  u.email AS 'Email',
  t.contact_no AS 'Contact',
  t.created_at AS 'Created At'
FROM teachers t
JOIN users u ON t.user_id = u.id
ORDER BY t.teacher_id;

-- ============================================
-- SECTION 2: ASSIGN MULTIPLE CLASSES TO TEACHER
-- Quick fix to assign multiple classes to a teacher
-- ============================================

-- Check current assignments for sunny
SELECT '=== CURRENT ASSIGNMENTS FOR SUNNY ===' AS '';
SELECT 
    t.teacher_id,
    u.name as teacher_name,
    u.email,
    c.class_name,
    c.class_section,
    c.year,
    s.subject_name
FROM teacher_assignments ta
JOIN teachers t ON ta.teacher_id = t.id
JOIN users u ON t.user_id = u.id
JOIN classes c ON ta.class_id = c.id
JOIN subjects s ON ta.subject_id = s.id
WHERE u.email = 'sunny@gmail.com';

-- Add multiple class assignments for sunny (adjust teacher_id if needed)
-- First, find sunny's teacher ID
SELECT '=== FINDING SUNNY TEACHER ID ===' AS '';
SELECT t.id, t.teacher_id, u.name, u.email 
FROM teachers t 
JOIN users u ON t.user_id = u.id 
WHERE u.email = 'sunny@gmail.com';

-- Assign multiple classes (assuming teacher.id = 2, adjust if different)
INSERT IGNORE INTO teacher_assignments (teacher_id, class_id, subject_id, academic_year) VALUES
(2, 1, 1, '2025-2026'),  -- BCA A Year 1, Programming in C
(2, 2, 1, '2025-2026'),  -- BCA B Year 1, Programming in C
(2, 4, 2, '2025-2026'),  -- BCA B Year 2, Data Structures
(2, 5, 6, '2025-2026'),  -- BCA A Year 3, Python Programming
(2, 6, 6, '2025-2026');  -- BCA B Year 3, Python Programming

-- Verify the new assignments
SELECT '=== UPDATED ASSIGNMENTS FOR SUNNY ===' AS '';
SELECT 
    t.teacher_id,
    u.name as teacher_name,
    c.class_name,
    c.class_section,
    c.year,
    s.subject_name
FROM teacher_assignments ta
JOIN teachers t ON ta.teacher_id = t.id
JOIN users u ON t.user_id = u.id
JOIN classes c ON ta.class_id = c.id
JOIN subjects s ON ta.subject_id = s.id
WHERE u.email = 'sunny@gmail.com'
ORDER BY c.year, c.class_section;

SELECT '✅ Multiple classes assigned! Logout and login again to see changes.' AS status;

-- ============================================
-- SECTION 3: ADD CLASS TIME COLUMN
-- Add class_time column to students table
-- ============================================

SELECT '=== CHECKING CLASS TIME COLUMN ===' AS '';
SELECT 
    COLUMN_NAME, 
    DATA_TYPE, 
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'attendance_system' 
  AND TABLE_NAME = 'students' 
  AND COLUMN_NAME = 'class_time';

-- Add class_time column if it doesn't exist
SET @dbname = 'attendance_system';
SET @tablename = 'students';
SET @columnname = 'class_time';
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  'SELECT "Column already exists" AS status',
  'ALTER TABLE students ADD COLUMN class_time TIME DEFAULT "09:00:00"'
));

PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Update existing students to have default class time
UPDATE students 
SET class_time = '09:00:00' 
WHERE class_time IS NULL;

SELECT '✅ class_time column check/add complete!' as status;

-- ============================================
-- SECTION 4: FIX CLASS TIME FOR STUDENTS
-- Set default class time for all students
-- ============================================

SELECT '=== FIXING CLASS TIME FOR STUDENTS ===' AS '';

UPDATE students 
SET class_time = '09:00:00' 
WHERE class_time IS NULL OR class_time = '' OR class_time = 'Not set';

-- Show count of students with and without class time
SELECT '=== CLASS TIME STATISTICS ===' AS '';
SELECT 
    COUNT(*) as total_students,
    SUM(CASE WHEN class_time IS NOT NULL AND class_time != '' THEN 1 ELSE 0 END) as with_time,
    SUM(CASE WHEN class_time IS NULL OR class_time = '' THEN 1 ELSE 0 END) as without_time
FROM students;

SELECT '✅ Class time fix complete!' as status;

-- ============================================
-- SECTION 5: CHECK ALL CLASSES
-- View all classes in the system
-- ============================================

SELECT '=== ALL CLASSES ===' AS '';
SELECT 
  id,
  class_name,
  class_section,
  year,
  academic_year,
  created_at
FROM classes
ORDER BY year, class_name, class_section;

-- ============================================
-- SECTION 6: CHECK TEACHER ASSIGNMENTS
-- View which teachers are assigned to which classes
-- ============================================

SELECT '=== TEACHER CLASS ASSIGNMENTS ===' AS '';
SELECT 
  t.teacher_id,
  u.name AS teacher_name,
  c.class_name,
  c.class_section,
  c.year
FROM teacher_assignments ta
JOIN teachers t ON ta.teacher_id = t.id
JOIN users u ON t.user_id = u.id
JOIN classes c ON ta.class_id = c.id
ORDER BY t.teacher_id, c.class_name;

-- Count assignments per teacher
SELECT '=== CLASSES PER TEACHER ===' AS '';
SELECT 
  t.teacher_id,
  u.name AS teacher_name,
  COUNT(ta.class_id) AS class_count
FROM teachers t
JOIN users u ON t.user_id = u.id
LEFT JOIN teacher_assignments ta ON t.id = ta.teacher_id
GROUP BY t.id, t.teacher_id, u.name
ORDER BY t.teacher_id;

-- ============================================
-- SECTION 7: CHECK STUDENTS
-- View all students with their class information
-- ============================================

SELECT '=== ALL STUDENTS ===' AS '';
SELECT 
  s.id,
  s.student_name,
  s.roll_number,
  c.class_name,
  c.class_section,
  c.year,
  s.class_time,
  s.email
FROM students s
JOIN classes c ON s.class_id = c.id
ORDER BY c.year, c.class_name, c.class_section, s.roll_number
LIMIT 20;

-- Student count per class
SELECT '=== STUDENTS PER CLASS ===' AS '';
SELECT 
  c.class_name,
  c.class_section,
  c.year,
  COUNT(s.id) AS student_count
FROM classes c
LEFT JOIN students s ON c.id = s.class_id
GROUP BY c.id, c.class_name, c.class_section, c.year
ORDER BY c.year, c.class_name, c.class_section;

-- ============================================
-- SECTION 8: CHECK SUBJECTS
-- View all subjects in the system
-- ============================================

SELECT '=== ALL SUBJECTS ===' AS '';
SELECT 
  id,
  subject_name,
  subject_code,
  created_at
FROM subjects
ORDER BY subject_name;

-- ============================================
-- SECTION 9: CHECK ATTENDANCE RECORDS
-- View recent attendance records
-- ============================================

SELECT '=== RECENT ATTENDANCE RECORDS ===' AS '';
SELECT 
  a.id,
  s.student_name,
  s.roll_number,
  c.class_name,
  c.class_section,
  a.date,
  a.time,
  a.status,
  a.marked_at
FROM attendance a
JOIN students s ON a.student_id = s.id
JOIN classes c ON a.class_id = c.id
ORDER BY a.marked_at DESC
LIMIT 20;

-- Attendance statistics
SELECT '=== ATTENDANCE STATISTICS ===' AS '';
SELECT 
  COUNT(*) AS total_records,
  SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) AS present_count,
  SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) AS absent_count,
  ROUND(SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS attendance_percentage
FROM attendance;

-- ============================================
-- SECTION 10: DATA COUNTS
-- Quick overview of all data in the system
-- ============================================

SELECT '=== SYSTEM DATA COUNTS ===' AS '';
SELECT 
  (SELECT COUNT(*) FROM users) AS total_users,
  (SELECT COUNT(*) FROM users WHERE role = 'admin') AS admin_count,
  (SELECT COUNT(*) FROM users WHERE role = 'teacher') AS teacher_count,
  (SELECT COUNT(*) FROM teachers) AS teacher_records,
  (SELECT COUNT(*) FROM students) AS student_count,
  (SELECT COUNT(*) FROM classes) AS class_count,
  (SELECT COUNT(*) FROM subjects) AS subject_count,
  (SELECT COUNT(*) FROM attendance) AS attendance_records,
  (SELECT COUNT(*) FROM teacher_assignments) AS teacher_assignments_count,
  (SELECT COUNT(*) FROM notifications) AS notification_count;

-- ============================================
-- SECTION 11: VERIFY DATABASE SCHEMA
-- Check if all required tables exist
-- ============================================

SELECT '=== DATABASE TABLES ===' AS '';
SELECT 
  TABLE_NAME,
  TABLE_ROWS,
  CREATE_TIME,
  UPDATE_TIME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'attendance_system'
ORDER BY TABLE_NAME;

-- ============================================
-- SECTION 12: CHECK USERS
-- View all users in the system
-- ============================================

SELECT '=== ALL USERS ===' AS '';
SELECT 
  id,
  name,
  email,
  role,
  created_at
FROM users
ORDER BY role, name;

-- ============================================
-- SECTION 13: FIX PASSWORDS
-- Reset passwords to default values
-- ============================================

-- Reset admin password
UPDATE users 
SET password = '$2a$10$ZHVFgKDbP8x1pk.1uemMw.dgBsohvQWY14di85wSb7sq4yTj6xrra'
WHERE email = 'admin@example.com';

-- Reset teacher passwords
UPDATE users 
SET password = '$2a$10$oOPaIPIorqcUEfe4sK7ryeWAoe5h49V.sG6tLvfWdu/PiZ79cVSrW'
WHERE role = 'teacher';

-- Reset student passwords
UPDATE students 
SET password = '$2a$10$oOPaIPIorqcUEfe4sK7ryeWAoe5h49V.sG6tLvfWdu/PiZ79cVSrW';

SELECT '✅ Passwords reset to defaults!' AS status;
SELECT 'Admin: Admin@143, Teachers: Teacher@143, Students: Student@143' AS note;

-- ============================================
-- USAGE INSTRUCTIONS
-- ============================================

/*
HOW TO USE THIS FILE:

1. Run entire file:
   mysql -u root -p attendance_system < sql-utilities.sql

2. Run specific section:
   - Open MySQL client or phpMyAdmin
   - USE attendance_system;
   - Copy and paste the section you need

3. Common tasks:

   a) Check all teachers:
      Run SECTION 1

   b) Assign multiple classes to teacher:
      Run SECTION 2 (adjust teacher_id if needed)

   c) Add class_time column:
      Run SECTION 3

   d) Fix student class times:
      Run SECTION 4

   e) View teacher assignments:
      Run SECTION 6

   f) Get system overview:
      Run SECTION 10

   g) Reset passwords:
      Run SECTION 13

4. From manage.bat:
   - Option 17: Check Teachers (SECTION 1)
   - Option 23: Assign Multiple Classes (SECTION 2)
   - Option 10: Fix Class Time (SECTION 3 & 4)
   - Option 5: Check Data Counts (SECTION 10)
   - Option 13: Fix Passwords (SECTION 13)

5. Troubleshooting:
   - If you get "column already exists" error, it's safe to ignore
   - If you get "table doesn't exist", run database setup first
   - For permission errors, check MySQL user privileges
   - Use INSERT IGNORE to avoid duplicate key errors

NOTES:
- All sections are safe to run multiple times
- Sections use IF NOT EXISTS logic where possible
- No data is deleted by these scripts
- Always backup before running on production data
- Password hashes are bcrypt with salt rounds = 10

DEFAULT CREDENTIALS AFTER RESET:
- Admin: admin@example.com / Admin@143
- Teachers: [email] / Teacher@143
- Students: [roll_number] / Student@143
*/

SELECT '=== SQL UTILITIES COMPLETE ===' AS '';
SELECT 'All checks and fixes have been executed.' AS status;
SELECT 'Review the output above for any issues.' AS note;
