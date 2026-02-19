@echo off
echo ========================================
echo  Database Import WITH MOCK DATA
echo ========================================
echo.

where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: MySQL not found in PATH
    pause
    exit /b 1
)

set /p MYSQL_USER="Enter MySQL username (default: root): "
if "%MYSQL_USER%"=="" set MYSQL_USER=root

echo.
echo Importing database with mock data...
echo File: server\database\schema_with_data.sql
echo.

mysql -u %MYSQL_USER% -p < server\database\schema_with_data.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  SUCCESS! Database imported
    echo ========================================
    echo.
    echo ADMIN: admin@example.com / Admin@143
    echo TEACHER: shrutiteli571@gmail.com / Teacher@143
    echo STUDENT: BCA1A001 (Rahul Verma) / Student@143
    echo.
) else (
    echo.
    echo ERROR! Import failed
    echo.
)

pause
