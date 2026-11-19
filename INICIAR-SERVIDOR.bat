@echo off
cd /d "%~dp0"
title FitNutri Server - no cierres esta ventana
powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1
pause
