@echo off
REM Ejecuta el proyecto con CMD (evita restricciones de PowerShell)
SETLOCAL ENABLEDELAYEDEXPANSION
echo === BUY HISTORY (React + Vite) ===
where npm >nul 2>nul
IF ERRORLEVEL 1 (
  echo [ERROR] npm no encontrado en PATH.
  pause
  exit /b 1
)
echo Instalando dependencias...
call npm install
IF ERRORLEVEL 1 (
  echo [ERROR] Fallo npm install
  pause
  exit /b 1
)
echo Iniciando servidor de desarrollo...
call npm run dev
