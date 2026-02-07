@echo off
title Starting all services...

REM === React Frontend ===
echo Starting React project...
start "React App" cmd /k "cd /d C:\reactNative\ReactNativeProjectJan2026 && npm run dev"

REM === User Login API (Port 5000) ===
echo Starting User Login API...
start "User Login API" cmd /k "cd /d C:\reactNative\user-login-api && npm start"

REM === Deezer API (Port 4000) ===
echo Starting Deezer API...
start "Deezer API" cmd /k "cd /d C:\reactNative\deezer-api-server && npm start"

echo.
echo All services started 🚀
exit