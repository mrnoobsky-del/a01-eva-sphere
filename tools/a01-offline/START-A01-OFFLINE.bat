@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0START-A01-OFFLINE.ps1"
if errorlevel 1 (
  echo.
  echo A-01 could not start. Check PowerShell and the one-time engine setup.
  pause
)
