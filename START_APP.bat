@echo off
title Student Attendance Management System
color 0A

:MENU
cls
echo ============================================================
echo    STUDENT ATTENDANCE MANAGEMENT SYSTEM
echo ============================================================
echo.
echo    Please select an option:
echo.
echo    1. Open Application (Frontend)
echo    2. Import Database (Empty Schema)
echo    3. Import Database with Demo Data
echo    4. Check Database Connection
echo    5. Start Backend Server
echo    6. View Login Credentials
echo    7. Exit
echo.
echo ============================================================
echo.

set /p choice="Enter your choice (1-7): "

if "%choice%"=="1" goto OPEN_APP
if "%choice%"=="2" goto IMPORT_DB
if "%choice%"=="3" goto IMPORT_DB_DATA
if "%choice%"=="4" goto CHECK_DB
if "%choice%"=="5" goto START_SERVER
if "%choice%"=="6" goto SHOW_CREDS
if "%choice%"=="7" goto EXIT

echo Invalid choice! Please try again.
timeout /t 2 >nul
goto MENU

:OPEN_APP
cls
echo ============================================================
echo    OPENING APPLICATION
echo ============================================================
echo.
echo Opening app/index.html in your default browser...
echo.

start app\index.html

echo.
echo Application opened successfully!
echo.
echo If the browser didn't open, manually open: app\index.html
echo.
pause
goto MENU

:IMPORT_DB
cls
echo ============================================================
echo    DATABASE IMPORT (Empty Schema)
echo ============================================================
echo.

where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: MySQL is not found in PATH
    echo Please install MySQL or add it to your PATH
    echo Common MySQL path: C:\Program Files\MySQL\MySQL Server 8.0\bin
    echo.
    pause
    goto MENU
)

echo MySQL found!
echo.

set /p MYSQL_USER="Enter MySQL username (default: root): "
if "%MYSQL_USER%"=="" set MYSQL_USER=root

echo.
echo Importing database schema...
echo File: server\database\schema.sql
echo.

mysql -u %MYSQL_USER% -p < server\database\schema.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================================
    echo    SUCCESS! Database imported successfully
    echo ============================================================
    echo.
    echo Database: attendance_system
    echo.
    echo Default Admin Credentials:
    echo   Email: admin@attendance.com
    echo   Password: admin123
    echo.
    echo IMPORTANT: Change the admin password immediately!
    echo.
) else (
    echo.
    echo ============================================================
    echo    ERROR! Database import failed
    echo ============================================================
    echo.
    echo Please check:
    echo 1. MySQL is running
    echo 2. Username and password are correct
    echo 3. You have CREATE DATABASE privileges
    echo.
)

pause
goto MENU

:IMPORT_DB_DATA
cls
echo ============================================================
echo    DATABASE IMPORT WITH DEMO DATA
echo ============================================================
echo.

where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: MySQL not found in PATH
    echo.
    pause
    goto MENU
)

set /p MYSQL_USER="Enter MySQL username (default: root): "
if "%MYSQL_USER%"=="" set MYSQL_USER=root

echo.
echo Importing database with demo data...
echo File: server\database\schema_with_data.sql
echo.

mysql -u %MYSQL_USER% -p < server\database\schema_with_data.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================================
    echo    SUCCESS! Database imported with demo data
    echo ============================================================
    echo.
    echo Demo Data Includes:
    echo   - 5 Classes (PHP, Java, R programming, C, Python)
    echo   - 3 Teachers
    echo   - 8 Students
    echo   - Sample attendance records
    echo.
    echo Login Credentials:
    echo   ADMIN: admin@example.com / Admin@143
    echo   TEACHER: shrutiteli571@gmail.com / Teacher@143
    echo   STUDENT: PHP25001 (Rahul Verma) / Student@143
    echo.
) else (
    echo.
    echo ERROR! Import failed
    echo.
)

pause
goto MENU

:CHECK_DB
cls
echo ============================================================
echo    DATABASE CONNECTION CHECKER
echo ============================================================
echo.

cd server

echo Checking database connection...
echo.

node test-connection.js

cd ..

echo.
echo ============================================================
pause
goto MENU

:START_SERVER
cls
echo ============================================================
echo    STARTING BACKEND SERVER
echo ============================================================
echo.
echo Starting Node.js server on port 3001...
echo.
echo Press Ctrl+C to stop the server
echo.

cd server
npm start
cd ..

pause
goto MENU

:SHOW_CREDS
cls
echo ============================================================
echo    LOGIN CREDENTIALS
echo ============================================================
echo.
echo ADMIN LOGIN:
echo   Email: admin@example.com
echo   Password: Admin@143
echo.
echo TEACHER LOGIN:
echo   Email: shrutiteli571@gmail.com
echo   Password: Teacher@143
echo   (Also: rajesh@example.com, priya@example.com, amit@example.com)
echo.
echo STUDENT LOGIN:
echo   Name: Rahul Verma
echo   Roll Number: PHP25001
echo   Password: Student@143
echo.
echo   Other Students:
echo   - Anita Singh (PHP25002)
echo   - Vikram Joshi (PHP25003)
echo   - Sneha Gupta (Java25001)
echo   - Arjun Reddy (Java25002)
echo   - Pooja Mehta (Rprog25001)
echo   - Nikhil Kumar (C25001)
echo   - Divya Nair (Python25001)
echo   All use password: Student@143
echo.
echo ============================================================
pause
goto MENU

:EXIT
cls
echo ============================================================
echo    Thank you for using Student Attendance System!
echo ============================================================
echo.
timeout /t 2 >nul
exit

