<|open|>argument key="new_string" type="string"<|sep|>@echo off
cd /d "%~dp0"
title Subir cambio FitNutri
powershell -NoProfile -ExecutionPolicy Bypass -File subir-cache.ps1
echo.
echo Listo. Ahora recarga http://localhost:8080 dos veces (Ctrl+F5) para ver los cambios.
pause
