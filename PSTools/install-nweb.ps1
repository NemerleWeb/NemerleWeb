$installPath = Join-Path $env:APPDATA "NemerleWeb"

Write-Host "Adding NemerleWeb to PATH if needed"

if (!($env:Path).ToLower().Contains($installPath.ToLower()))
{
	$path = $env:Path

	$terminator = ";"
	$hasStatementTerminator = $path -ne $null -and $path.EndsWith($terminator)
	
	if (!$hasStatementTerminator -and $path -ne $null) { $installPath = $terminator + $installPath }
	if (!$installPath.EndsWith($terminator)) { $installPath = $installPath + $terminator }
	$path = $path + $installPath

    [Environment]::SetEnvironmentVariable('Path', $path, 'User')	
	
	$env:Path += $installPath
}