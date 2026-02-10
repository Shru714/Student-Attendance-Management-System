-- ============================================
-- Database Verification Script
-- Run this after importing schema.sql
-- ============================================

USE attendance_system;

-- Check all tables exist
SELECT 'Checking Tables...' as Status;
SELECT 
    TABLE_NAME,
    TABLE_ROWS,
    CREATE_TIME
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'attendance_system'
ORDER BY TABLE_NAME;

-- Check stored procedures
SELECT '\nChecking Stored Procedures...' as Status;
SELECT 
    ROUTINE_NAME,
    ROUTINE_TYPE,
    CREATED
FROM information_schema.ROUTINES 
WHERE ROUTINE_SCHEMA = 'attendance_system'
ORDER BY ROUTINE_NAME;

-- Check views
SELECT '\nChecking Views...' as Status;
SELECT 
    TABLE_NAME as VIEW_NAME,
    VIEW_DEFINITION
FROM information_schema.VIEWS 
WHERE TABLE_SCHEMA = 'attendance_system';

-- Check triggers
SELECT '\nChecking Triggers...' as Status;
SELECT 
    TRIGGER_NAME,
    EVENT_MANIPULATION,
    EVENT_OBJECT_TABLE,
    ACTION_TIMING
FROM information_schema.TRIGGERS 
WHERE TRIGGER_SCHEMA = 'attendance_system';

-- Check indexes
SELECT '\nChecking Indexes...' as Status;
SELECT 
    TABLE_NAME,
    INDEX_NAME,
    COLUMN_NAME,
    NON_UNIQUE
FROM information_schema.STATISTICS 
WHERE TABLE_SCHEMA = 'attendance_system'
ORDER BY TABLE_NAME, INDEX_NAME;

-- Check default data
SELECT '\nChecking Default Data...' as Status;

SELECT 'Attendance Settings:' as Info;
SELECT * FROM attendance_settings;

SELECT '\nDefault Admin User:' as Info;
SELECT id, name, email, role, created_at FROM users WHERE role = 'admin';

-- Check foreign keys
SELECT '\nChecking Foreign Keys...' as Status;
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE 
WHERE TABLE_SCHEMA = 'attendance_system' 
AND REFERENCED_TABLE_NAME IS NOT NULL
ORDER BY TABLE_NAME;

-- Summary
SELECT '\n========================================' as '';
SELECT 'DATABASE VERIFICATION COMPLETE' as '';
SELECT '========================================' as '';
SELECT CONCAT('Total Tables: ', COUNT(*)) as Summary 
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'attendance_system';

SELECT CONCAT('Total Procedures: ', COUNT(*)) as Summary 
FROM information_schema.ROUTINES 
WHERE ROUTINE_SCHEMA = 'attendance_system' AND ROUTINE_TYPE = 'PROCEDURE';

SELECT CONCAT('Total Functions: ', COUNT(*)) as Summary 
FROM information_schema.ROUTINES 
WHERE ROUTINE_SCHEMA = 'attendance_system' AND ROUTINE_TYPE = 'FUNCTION';

SELECT CONCAT('Total Views: ', COUNT(*)) as Summary 
FROM information_schema.VIEWS 
WHERE TABLE_SCHEMA = 'attendance_system';

SELECT CONCAT('Total Triggers: ', COUNT(*)) as Summary 
FROM information_schema.TRIGGERS 
WHERE TRIGGER_SCHEMA = 'attendance_system';
