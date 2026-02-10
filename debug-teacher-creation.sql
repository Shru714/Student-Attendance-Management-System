-- ============================================
-- Debug Teacher Creation Issue
-- ============================================

USE attendance_system;

-- 1. Check if users table has the teacher user
SELECT '=== CHECKING USERS TABLE ===' as '';
SELECT id, name, email, role, created_at 
FROM users 
WHERE role = 'teacher'
ORDER BY created_at DESC;

-- 2. Check if teachers table has the teacher record
SELECT '\n=== CHECKING TEACHERS TABLE ===' as '';
SELECT * FROM teachers ORDER BY created_at DESC;

-- 3. Check if there's a mismatch (user exists but no teacher record)
SELECT '\n=== CHECKING FOR ORPHANED USERS ===' as '';
SELECT u.id, u.name, u.email, u.role, u.created_at
FROM users u
LEFT JOIN teachers t ON u.id = t.userId
WHERE u.role = 'teacher' AND t.id IS NULL;

-- 4. Check teacher assignments
SELECT '\n=== CHECKING TEACHER ASSIGNMENTS ===' as '';
SELECT ta.*, t.teacherId, c.className, s.subjectName
FROM teacher_assignments ta
LEFT JOIN teachers t ON ta.teacherId = t.id
LEFT JOIN classes c ON ta.classId = c.id
LEFT JOIN subjects s ON ta.subjectId = s.id
ORDER BY ta.created_at DESC;

-- 5. Check teacher subjects
SELECT '\n=== CHECKING TEACHER SUBJECTS ===' as '';
SELECT ts.*, t.teacherId, s.subjectName
FROM teacher_subjects ts
LEFT JOIN teachers t ON ts.teacherId = t.id
LEFT JOIN subjects s ON ts.subjectId = s.id
ORDER BY ts.created_at DESC;

-- 6. Check teacher classes
SELECT '\n=== CHECKING TEACHER CLASSES ===' as '';
SELECT tc.*, t.teacherId, c.className
FROM teacher_classes tc
LEFT JOIN teachers t ON tc.teacherId = t.id
LEFT JOIN classes c ON tc.classId = c.id
ORDER BY tc.created_at DESC;

-- 7. Check teacher years
SELECT '\n=== CHECKING TEACHER YEARS ===' as '';
SELECT ty.*, t.teacherId
FROM teacher_years ty
LEFT JOIN teachers t ON ty.teacherId = t.id
ORDER BY ty.created_at DESC;

-- 8. Check for any errors in foreign keys
SELECT '\n=== CHECKING FOREIGN KEY CONSTRAINTS ===' as '';
SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'attendance_system'
AND TABLE_NAME = 'teachers'
AND REFERENCED_TABLE_NAME IS NOT NULL;

-- 9. Get complete teacher profile (as the app does)
SELECT '\n=== COMPLETE TEACHER PROFILE ===' as '';
SELECT 
    t.id as teacher_id,
    t.userId,
    t.teacherId as teacher_code,
    t.contactNo,
    u.name,
    u.email,
    u.phone,
    u.address,
    t.created_at
FROM teachers t
JOIN users u ON t.userId = u.id
ORDER BY t.created_at DESC;

-- 10. Count records
SELECT '\n=== RECORD COUNTS ===' as '';
SELECT 
    (SELECT COUNT(*) FROM users WHERE role = 'teacher') as total_teacher_users,
    (SELECT COUNT(*) FROM teachers) as total_teacher_records,
    (SELECT COUNT(*) FROM teacher_assignments) as total_assignments,
    (SELECT COUNT(*) FROM teacher_subjects) as total_subject_assignments,
    (SELECT COUNT(*) FROM teacher_classes) as total_class_assignments;
