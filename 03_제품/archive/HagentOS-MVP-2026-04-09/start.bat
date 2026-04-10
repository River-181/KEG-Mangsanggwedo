@echo off
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 18+ is required.
  echo Install Node.js, then run this file again.
  pause
  exit /b 1
)

npm start
pause
