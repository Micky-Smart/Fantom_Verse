@echo off
title FandomVerse Launcher
echo ===================================================
echo             Launching FandomVerse Portal
echo ===================================================
echo.
cd /d "%~dp0"
echo Starting local web server...
start http://localhost:5174/
call npm.cmd run dev -- --port 5174 --open
pause
