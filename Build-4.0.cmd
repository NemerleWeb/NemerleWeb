@echo off
if %PROCESSOR_ARCHITECTURE%==x86 (
	set MSBuild="%SystemRoot%\Microsoft.NET\Framework\v4.0.30319\msbuild.exe"
) else (
	set MSBUILD=%WINDIR%\Microsoft.NET\Framework64\v4.0.30319\MSBuild.exe
)
set EnableNuGetPackageRestore=true

%MSBuild% NemerleWeb-2010.sln /tv:4.0 /p:TargetFrameworkVersion=v4.0 /t:Build /p:Configuration=Release
