@echo off
REM ============================================
REM Student Attendance Management System
REM Complete Management Console
REM ============================================

:MENU
cls
echo ============================================
echo  Student Attendance Management System
echo  Complete Management Console
echo ============================================
echo.
echo  DATABASE MANAGEMENT
echo  1.  Setup Database (Complete with Data)
echo  2.  Reimport Database (Fresh Start)
echo  3.  Create Admin User
echo  4.  Test Database Connection
echo  5.  Check Data Counts
echo.
echo  SERVER MANAGEMENT
echo  6.  Start Server
echo  7.  Restart Server
echo  8.  Force Restart Server
echo  9.  Stop Server
echo.
echo  DATABASE FIXES
echo  10. Fix Class Time Column
echo  11. Fix Phone Column
echo  12. Run Full Diagnostics
echo  13. Fix Passwords
echo.
echo  TESTING TOOLS
echo  14. Test Login
echo  15. Test Teacher API
echo  16. Test Classes API
echo  17. Check Teachers
echo  18. Check Schema
echo  19. Check Teacher Classes (Diagnostic)
echo.
echo  APPLICATION
echo  20. Open Application
echo  21. Open Fix Tool
echo  22. Open Connection Test
echo  23. Open Testing Tools (All Tests)
echo  24. Open Cache Clear Tool
echo  25. Test Mark Attendance
echo  26. Test Attendance History
echo.
echo  DATABASE UTILITIES
echo  27. Assign Multiple Classes to Teacher
echo.
echo  0.  Exit
echo.
echo ============================================
set /p choice="Enter your choice (0-27): "

if "%choice%"=="1" goto SETUP_COMPLETE
if "%choice%"=="2" goto REIMPORT_DATABASE
if "%choice%"=="3" goto CREATE_ADMIN
if "%choice%"=="4" goto TEST_CONNECTION
if "%choice%"=="5" goto CHECK_DATA
if "%choice%"=="6" goto START_SERVER
if "%choice%"=="7" goto RESTART_SERVER
if "%choice%"=="8" goto FORCE_RESTART
if "%choice%"=="9" goto STOP_SERVER
if "%choice%"=="10" goto FIX_CLASS_TIME
if "%choice%"=="11" goto FIX_PHONE_COLUMN
if "%choice%"=="12" goto DIAGNOSTICS
if "%choice%"=="13" goto FIX_PASSWORDS
if "%choice%"=="14" goto TEST_LOGIN
if "%choice%"=="15" goto TEST_TEACHER_API
if "%choice%"=="16" goto TEST_CLASSES_API
if "%choice%"=="17" goto CHECK_TEACHERS
if "%choice%"=="18" goto CHECK_SCHEMA
if "%choice%"=="19" goto CHECK_TEACHER_CLASSES
if "%choice%"=="20" goto OPEN_APP
if "%choice%"=="21" goto OPEN_FIX
if "%choice%"=="22" goto OPEN_CONNECTION
if "%choice%"=="23" goto OPEN_TESTING_TOOLS
if "%choice%"=="24" goto OPEN_CACHE_CLEAR
if "%choice%"=="25" goto TEST_MARK_ATTENDANCE
if "%choice%"=="26" goto TEST_ATTENDANCE_HISTORY
if "%choice%"=="27" goto ASSIGN_CLASSES
if "%choice%"=="0" goto EXIT
goto MENU

REM ============================================
REM 1. SETUP DATABASE (COMPLETE WITH DATA)
REM ============================================
:SETUP_COMPLETE
cls
echo ============================================
echo  Setup Database (Complete with Data)
echo ============================================
echo.
echo This will:
echo  - Drop existing database (if exists)
echo  - Create fresh database
echo  - Create all tables
echo  - Insert sample data (students, teachers, classes)
echo.
set /p confirm="Continue? (Y/N): "
if /i not "%confirm%"=="Y" goto MENU

echo.
echo Setting up database...
echo.

REM Check if MySQL is accessible
mysql --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: MySQL not found in PATH
    echo.
    echo Please add MySQL to your PATH or use full path:
    echo Example: "C:\xampp\mysql\bin\mysql.exe"
    echo.
    pause
    goto MENU
)

REM Get MySQL credentials
set /p mysql_user="Enter MySQL username (default: root): "
if "%mysql_user%"=="" set mysql_user=root

set /p mysql_pass="Enter MySQL password (press Enter if none): "

echo.
echo Importing database...
if "%mysql_pass%"=="" (
    mysql -u %mysql_user% < server\database\complete-setup-with-data.sql
) else (
    mysql -u %mysql_user% -p%mysql_pass% < server\database\complete-setup-with-data.sql
)

if errorlevel 1 (
    echo.
    echo ERROR: Database import failed!
    echo Please check your MySQL credentials and try again.
    pause
    goto MENU
)

echo.
echo ============================================
echo  SUCCESS! Database setup complete!
echo ============================================
echo.
echo Login Credentials:
echo  Admin:   admin@example.com / Admin@143
echo  Teachers:
echo   - shrutiteli571@gmail.com / Teacher@143
echo   - sunny@gmail.com / Teacher@143
echo   - booby@gmail.com / Teacher@143
echo   - roc@gmail.com / Teacher@143
echo  Student: STU001 / Student@143
echo.
pause
goto MENU

REM ============================================
REM 2. REIMPORT DATABASE (FRESH START)
REM ============================================
:REIMPORT_DATABASE
cls
echo ============================================
echo  Reimport Database (Fresh Start)
echo ============================================
echo.
echo This will:
echo  - Drop existing database completely
echo  - Create fresh database
echo  - Import all data from scratch
echo  - Reset all teachers and students
echo.
echo WARNING: All existing data will be lost!
echo.
set /p confirm="Are you sure? (Y/N): "
if /i not "%confirm%"=="Y" goto MENU

echo.
echo Reimporting database...
echo.

REM Check if MySQL is accessible
mysql --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: MySQL not found in PATH
    pause
    goto MENU
)

REM Get MySQL credentials
set /p mysql_user="Enter MySQL username (default: root): "
if "%mysql_user%"=="" set mysql_user=root

set /p mysql_pass="Enter MySQL password (press Enter if none): "

echo.
echo Importing database...
if "%mysql_pass%"=="" (
    mysql -u %mysql_user% < server\database\complete-setup-with-data.sql
) else (
    mysql -u %mysql_user% -p%mysql_pass% < server\database\complete-setup-with-data.sql
)

if errorlevel 1 (
    echo.
    echo ERROR: Database import failed!
    pause
    goto MENU
)

echo.
echo ============================================
echo  SUCCESS! Database reimported!
echo ============================================
echo.
echo Teacher Login Credentials:
echo  1. shrutiteli571@gmail.com / Teacher@143
echo  2. sunny@gmail.com / Teacher@143
echo  3. booby@gmail.com / Teacher@143
echo  4. roc@gmail.com / Teacher@143
echo.
echo Admin Login:
echo  admin@example.com / Admin@143
echo.
pause
goto MENU

REM ============================================
REM 3. CREATE ADMIN USER
REM ============================================
:CREATE_ADMIN
cls
echo ============================================
echo  Create Admin User
echo ============================================
echo.
echo This will create an admin user with:
echo  Email: admin@example.com
echo  Password: Admin@143
echo.
set /p confirm="Continue? (Y/N): "
if /i not "%confirm%"=="Y" goto MENU

echo.
echo Creating admin user...
node server\utilities.js createAdmin

echo.
pause
goto MENU

REM ============================================
REM 4. TEST DATABASE CONNECTION
REM ============================================
:TEST_CONNECTION
cls
echo ============================================
echo  Test Database Connection
echo ============================================
echo.
node server\utilities.js testConnection

echo.
pause
goto MENU

REM ============================================
REM 5. CHECK DATA COUNTS
REM ============================================
:CHECK_DATA
cls
echo ============================================
echo  Check Data Counts
echo ============================================
echo.
node server\utilities.js checkData

echo.
pause
goto MENU

REM ============================================
REM 6. START SERVER
REM ============================================
:START_SERVER
cls
echo ============================================
echo  Start Server
echo ============================================
echo.
echo Starting server on http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

cd server
start "Attendance Server" cmd /k "npm start"
cd ..

echo.
echo Server started in new window!
echo.
pause
goto MENU

REM ============================================
REM 7. RESTART SERVER
REM ============================================
:RESTART_SERVER
cls
echo ============================================
echo  Restart Server
echo ============================================
echo.
echo Stopping existing server...

REM Kill node processes
taskkill /F /IM node.exe >nul 2>&1

echo Waiting 2 seconds...
timeout /t 2 /nobreak >nul

echo Starting server...
cd server
start "Attendance Server" cmd /k "npm start"
cd ..

echo.
echo Server restarted!
echo.
pause
goto MENU

REM ============================================
REM 8. FORCE RESTART SERVER
REM ============================================
:FORCE_RESTART
cls
echo ============================================
echo  Force Restart Server
echo ============================================
echo.
echo This will forcefully kill all Node.js processes
echo and restart the server.
echo.
set /p confirm="Continue? (Y/N): "
if /i not "%confirm%"=="Y" goto MENU

echo.
echo Killing all Node.js processes...
taskkill /F /IM node.exe

echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo Starting server...
cd server
start "Attendance Server" cmd /k "npm start"
cd ..

echo.
echo Server force restarted!
echo.
pause
goto MENU

REM ============================================
REM 9. STOP SERVER
REM ============================================
:STOP_SERVER
cls
echo ============================================
echo  Stop Server
echo ============================================
echo.
echo Stopping all Node.js processes...

taskkill /F /IM node.exe >nul 2>&1

if errorlevel 1 (
    echo No Node.js processes found.
) else (
    echo Server stopped successfully!
)

echo.
pause
goto MENU

REM ============================================
REM 10. FIX CLASS TIME COLUMN
REM ============================================
:FIX_CLASS_TIME
cls
echo ============================================
echo  Fix Class Time Column
echo ============================================
echo.
echo This will add class_time column to students table
echo and set default time (09:00:00) for all students.
echo.
set /p confirm="Continue? (Y/N): "
if /i not "%confirm%"=="Y" goto MENU

echo.
set /p mysql_user="Enter MySQL username (default: root): "
if "%mysql_user%"=="" set mysql_user=root

set /p mysql_pass="Enter MySQL password (press Enter if none): "

echo.
echo Adding class_time column...
if "%mysql_pass%"=="" (
    mysql -u %mysql_user% attendance_system -e "source database-utilities.sql" 2>&1 | findstr /C:"SECTION 2" /C:"SECTION 4" /C:"class_time"
) else (
    mysql -u %mysql_user% -p%mysql_pass% attendance_system -e "source database-utilities.sql" 2>&1 | findstr /C:"SECTION 2" /C:"SECTION 4" /C:"class_time"
)

if errorlevel 1 (
    echo.
    echo ERROR: Failed to add column!
    pause
    goto MENU
)

echo.
echo ============================================
echo  SUCCESS! Class time column added.
echo  All students now have default time: 09:00
echo ============================================
echo.
echo Please refresh your browser to see changes.
echo.
pause
goto MENU

REM ============================================
REM 11. FIX PHONE COLUMN
REM ============================================
:FIX_PHONE_COLUMN
cls
echo ============================================
echo  Fix Phone Column
echo ============================================
echo.
echo This will add 'phone' column to teachers table
echo if it doesn't exist.
echo.
set /p confirm="Continue? (Y/N): "
if /i not "%confirm%"=="Y" goto MENU

echo.
set /p mysql_user="Enter MySQL username (default: root): "
if "%mysql_user%"=="" set mysql_user=root

set /p mysql_pass="Enter MySQL password (press Enter if none): "

echo.
echo Adding phone column...
if "%mysql_pass%"=="" (
    mysql -u %mysql_user% attendance_system -e "source database-utilities.sql" 2>&1 | findstr /C:"SECTION 3" /C:"phone"
) else (
    mysql -u %mysql_user% -p%mysql_pass% attendance_system -e "source database-utilities.sql" 2>&1 | findstr /C:"SECTION 3" /C:"phone"
)

if errorlevel 1 (
    echo.
    echo ERROR: Failed to add column!
    pause
    goto MENU
)

echo.
echo ============================================
echo  SUCCESS! Phone column added.
echo ============================================
echo.
pause
goto MENU

REM ============================================
REM 12. RUN FULL DIAGNOSTICS
REM ============================================
:DIAGNOSTICS
cls
echo ============================================
echo  System Diagnostics
echo ============================================
echo.
node server\utilities.js diagnose

echo.
pause
goto MENU

REM ============================================
REM 13. FIX PASSWORDS
REM ============================================
:FIX_PASSWORDS
cls
echo ============================================
echo  Fix Passwords
echo ============================================
echo.
echo This will reset the admin password to: Admin@143
echo.
set /p confirm="Continue? (Y/N): "
if /i not "%confirm%"=="Y" goto MENU

echo.
node server\utilities.js resetAdminPassword

echo.
pause
goto MENU

REM ============================================
REM 14. TEST LOGIN
REM ============================================
:TEST_LOGIN
cls
echo ============================================
echo  Test Login
echo ============================================
echo.
echo Opening testing tools...
start "" testing-tools.html

echo.
echo Testing tools opened in browser.
echo Navigate to the "Login Test" tab.
echo.
pause
goto MENU

REM ============================================
REM 15. TEST TEACHER API
REM ============================================
:TEST_TEACHER_API
cls
echo ============================================
echo  Test Teacher API
echo ============================================
echo.
echo Opening testing tools...
start "" testing-tools.html

echo.
echo Testing tools opened in browser.
echo Navigate to the "Teachers API" tab.
echo.
pause
goto MENU

REM ============================================
REM 16. TEST CLASSES API
REM ============================================
:TEST_CLASSES_API
cls
echo ============================================
echo  Test Classes API
echo ============================================
echo.
echo Opening testing tools...
start "" testing-tools.html

echo.
echo Testing tools opened in browser.
echo Navigate to the "Classes API" tab.
echo.
pause
goto MENU

REM ============================================
REM 17. CHECK TEACHERS
REM ============================================
:CHECK_TEACHERS
cls
echo ============================================
echo  Check Teachers
echo ============================================
echo.
set /p mysql_user="Enter MySQL username (default: root): "
if "%mysql_user%"=="" set mysql_user=root

set /p mysql_pass="Enter MySQL password (press Enter if none): "

echo.
echo Fetching teachers...
echo.
if "%mysql_pass%"=="" (
    mysql -u %mysql_user% attendance_system -e "source database-utilities.sql" 2>&1 | findstr /C:"SECTION 1" /C:"Teacher"
) else (
    mysql -u %mysql_user% -p%mysql_pass% attendance_system -e "source database-utilities.sql" 2>&1 | findstr /C:"SECTION 1" /C:"Teacher"
)

echo.
pause
goto MENU

REM ============================================
REM 18. CHECK SCHEMA
REM ============================================
:CHECK_SCHEMA
cls
echo ============================================
echo  Check Schema
echo ============================================
echo.
node server\utilities.js checkSchema

echo.
pause
goto MENU

REM ============================================
REM 19. OPEN APPLICATION
REM ============================================
:OPEN_APP
cls
echo ============================================
echo  Open Application
echo ============================================
echo.
echo Opening main application...
start "" client\index.html

echo.
echo Application opened in browser.
echo.
echo Login Credentials:
echo  Admin:   admin@example.com / Admin@143
echo  Teacher: sunny@gmail.com / Teacher@143
echo  Student: STU001 / Student@143
echo.
pause
goto MENU

REM ============================================
REM 20. OPEN FIX TOOL
REM ============================================
:OPEN_FIX
cls
echo ============================================
echo  Open Testing Tools
echo ============================================
echo.
echo Opening testing and diagnostic tools...
start "" testing-tools.html

echo.
echo Testing tools opened in browser.
echo Use it to test APIs, check data, and diagnose issues.
echo.
pause
goto MENU

REM ============================================
REM 21. OPEN CONNECTION TEST
REM ============================================
:OPEN_CONNECTION
cls
echo ============================================
echo  Open Testing Tools
echo ============================================
echo.
echo Opening testing and diagnostic tools...
start "" testing-tools.html

echo.
echo Testing tools opened in browser.
echo Connection test will run automatically.
echo.
pause
goto MENU

REM ============================================
REM 19. CHECK TEACHER CLASSES (DIAGNOSTIC)
REM ============================================
:CHECK_TEACHER_CLASSES
cls
echo ============================================
echo  Check Teacher Classes - Diagnostic Tool
echo ============================================
echo.
echo This tool helps diagnose why a teacher sees
echo only one class in the Mark Attendance dropdown.
echo.
echo Opening diagnostic tool...
start "" check-teacher-classes.html

echo.
echo Diagnostic tool opened in browser.
echo.
echo Instructions:
echo  1. Click "Login" to login as teacher
echo  2. Click "Get My Classes" to see API response
echo  3. Check how many classes are returned
echo.
echo If only 1 class is shown:
echo  - This is a DATA issue, not a CODE issue
echo  - Use Option 23 to assign more classes
echo  - Or assign via Admin panel
echo.
pause
goto MENU

REM ============================================
REM 23. ASSIGN MULTIPLE CLASSES TO TEACHER
REM ============================================
:ASSIGN_CLASSES
cls
echo ============================================
echo  Assign Multiple Classes to Teacher
echo ============================================
echo.
echo This will assign multiple classes to the
echo teacher 'sunny' for testing purposes.
echo.
echo Classes to be assigned:
echo  - BCA A Year 1 (Programming in C)
echo  - BCA B Year 1 (Programming in C)
echo  - BCA B Year 2 (Data Structures)
echo  - BCA A Year 3 (Python Programming)
echo  - BCA B Year 3 (Python Programming)
echo.
echo WARNING: This requires MySQL credentials
echo.
set /p confirm="Continue? (Y/N): "
if /i not "%confirm%"=="Y" goto MENU

echo.
echo Running SQL script...
mysql -u root -p attendance_system < assign-multiple-classes-to-sunny.sql

if %errorlevel% equ 0 (
    echo.
    echo ============================================
    echo  SUCCESS!
    echo ============================================
    echo.
    echo Multiple classes assigned to teacher 'sunny'
    echo.
    echo Next steps:
    echo  1. Logout from teacher panel
    echo  2. Login again as sunny@gmail.com
    echo  3. Go to "Mark Attendance"
    echo  4. You should now see 6 classes!
    echo.
) else (
    echo.
    echo ============================================
    echo  ERROR!
    echo ============================================
    echo.
    echo Failed to assign classes.
    echo.
    echo Possible issues:
    echo  - MySQL not running
    echo  - Wrong password
    echo  - Database doesn't exist
    echo.
    echo Try running the SQL manually in phpMyAdmin:
    echo  - Open assign-multiple-classes-to-sunny.sql
    echo  - Copy and paste into phpMyAdmin
    echo.
)
pause
goto MENU

REM ============================================
REM 23. OPEN TESTING TOOLS
REM ============================================
:OPEN_TESTING_TOOLS
cls
echo ============================================
echo  Open Testing Tools (All Tests)
echo ============================================
echo.
echo Opening testing-tools.html in your browser...
echo.
start "" "testing-tools.html"
echo.
echo Testing tools opened!
echo.
pause
goto MENU

REM ============================================
REM 24. OPEN CACHE CLEAR TOOL
REM ============================================
:OPEN_CACHE_CLEAR
cls
echo ============================================
echo  Open Cache Clear Tool
echo ============================================
echo.
echo This tool helps you:
echo  - Clear browser cache
echo  - Clear localStorage
echo  - Test the application
echo  - Verify script versions
echo.
echo Opening clear-cache-and-test.html...
echo.
start "" "clear-cache-and-test.html"
echo.
echo Cache clear tool opened!
echo.
echo IMPORTANT: Follow the instructions on the page to:
echo  1. Clear browser cache (Ctrl+Shift+Delete)
echo  2. Hard refresh (Ctrl+Shift+R)
echo  3. Verify v60 is loaded
echo.
pause
goto MENU

REM ============================================
REM 25. TEST MARK ATTENDANCE
REM ============================================
:TEST_MARK_ATTENDANCE
cls
echo ============================================
echo  Test Mark Attendance
echo ============================================
echo.
echo Opening test-mark-attendance.html...
echo.
start "" "test-mark-attendance.html"
echo.
echo Test page opened!
echo.
echo This page tests:
echo  - Teacher login
echo  - Loading classes
echo  - Loading students
echo  - Marking attendance
echo.
pause
goto MENU

REM ============================================
REM 26. TEST ATTENDANCE HISTORY
REM ============================================
:TEST_ATTENDANCE_HISTORY
cls
echo ============================================
echo  Test Attendance History
echo ============================================
echo.
echo Opening test-attendance-history.html...
echo.
start "" "test-attendance-history.html"
echo.
echo Test page opened!
echo.
echo This page tests:
echo  - Teacher login
echo  - Loading classes
echo  - Viewing attendance history
echo  - Filtering by date
echo.
pause
goto MENU

REM ============================================
REM EXIT
REM ============================================
:EXIT
cls
echo ============================================
echo  Thank you for using
echo  Student Attendance Management System
echo ============================================
echo.
echo Quick Tips:
echo  - Use Option 1 for first-time setup
echo  - Use Option 6 to start the server
echo  - Use Option 20 to open the application
echo  - Use Option 24 to clear cache (v60 update)
echo  - Use Option 12 for troubleshooting
echo.
echo For help, see README.md or CACHE-FIX-GUIDE.md
echo.
pause
exit
