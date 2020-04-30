@ECHO off
SETLOCAL
CALL :find_dp0

IF EXIST "%dp0%\/bin/sh.exe" (
  SET "_prog=%dp0%\/bin/sh.exe"
) ELSE (
  SET "_prog=/bin/sh"
  SET PATHEXT=%PATHEXT:;.JS;=;%
)

"%_prog%"  "%dp0%\..\react-native-vector-icons\bin\fa5-upgrade.sh" %*
ENDLOCAL
EXIT /b %errorlevel%
:find_dp0
SET dp0=%~dp0
EXIT /b
