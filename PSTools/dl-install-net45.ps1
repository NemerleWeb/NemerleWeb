function Is-45-Installed()
{
	$path = "HKLM:\Software\Microsoft\NET Framework Setup\NDP\v4\Client"
	$key = "Release"
    if(!(Test-Path $path)) { return $false }
    if ((Get-ItemProperty $path).$key -eq "378389") { return $true } # .NET Framework 4.5
    if ((Get-ItemProperty $path).$key -eq "378575") { return $true } # .NET Framework 4.5.1 Preview
    if ((Get-ItemProperty $path).$key -eq "378675") { return $true } # .NET Framework 4.5.1

    return $false
}

if(!$(Is-45-Installed)) 
{
	Write-Host "You don't have .NET 4.5 installed" -ForegroundColor Yellow;

	$installPath = Join-Path $env:APPDATA "NemerleWeb"
	if (![System.IO.Directory]::Exists($installPath)) {[System.IO.Directory]::CreateDirectory($installPath)}

	Write-Host "Downloading .NET framework v4.5 installation package" -ForegroundColor Yellow;
	$url = "http://download.microsoft.com/download/B/A/4/BA4A7E71-2906-4B2D-A0E1-80CF16844F5F/dotNetFx45_Full_setup.exe"
	$file = Join-Path $installPath "dotNetFx45_Full_setup.exe"
	$downloader = new-object System.Net.WebClient
	$downloader.DownloadFile($url, $file)
	Write-Host "Installing .NET framework v4.5" -ForegroundColor Yellow;
	Start-Process -FilePath $file -ArgumentList "/q /norestart" -Wait
	  
	Remove-Item $file	
}

Write-Host ".NET 4.5 installed" -ForegroundColor Green;