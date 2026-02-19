@echo off
echo ========================================
echo   Database Connection Checker
echo ========================================
echo.

cd server

echo Checking database connection...
echo.

node test-connection.js

echo.
echo ========================================
pause
