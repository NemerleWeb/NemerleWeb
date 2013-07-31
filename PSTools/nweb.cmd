@echo off
SET DIR=%~dp0%

if '%1'=='/?' goto usage
if '%1'=='-?' goto usage
if '%1'=='?' goto usage
if '%1'=='/help' goto usage
if '%1'=='help' goto usage

@PowerShell -NoProfile -ExecutionPolicy unrestricted -Command "& '%DIR%nweb.ps1' %*"

goto :eof
:usage

@PowerShell -NoProfile -ExecutionPolicy unrestricted -Command "& '%DIR%nweb.ps1' help"