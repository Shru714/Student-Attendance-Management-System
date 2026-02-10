@echo off
echo ========================================
echo  Attendance System - Database Import
echo ========================================
echo.

REM Check if MySQL is in PATH
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: MySQL is not found in PATH
    echo Please install MySQL or add it to your PATH
    echo Common MySQL path: C:\Program Files\MySQL\MySQL Server 8.0\bin
    pause
    exit /b 1
)

echo MySQL found!
echo.

REM Prompt for MySQL credentials
set /p MYSQL_USER="Enter MySQL username (default: root): "
if "%MYSQL_USER%"=="" set MYSQL_USER=root

echo.
echo Importing database schema...
echo File: server\database\schema.sql
echo.

REM Import the SQL file
mysql -u %MYSQL_USER% -p < server\database\schema.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  SUCCESS! Database imported successfully
    echo ========================================
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
    echo ========================================
    echo  ERROR! Database import failed
    echo ========================================
    echo.
    echo Please check:
    echo 1. MySQL is running
    echo 2. Username and password are correct
    echo 3. You have CREATE DATABASE privileges
    echo.
)

pause
