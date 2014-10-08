$installPath = Join-Path $env:APPDATA "NemerleWeb"
if (![System.IO.Directory]::Exists($installPath)) {[System.IO.Directory]::CreateDirectory($installPath)}

Write-Host "Downloading latest Nemerle installer" -ForegroundColor Yellow;
$url = "http://nemerle.org/Download/Nightly%20master-NET40-VS2010/build-217/NemerleSetup-net-4.0-v1.2.387.0.msi"
$file = Join-Path $installPath "latest.msi"
$downloader = new-object System.Net.WebClient
$downloader.DownloadFile($url, $file)
Write-Host "Installing Nemerle: $file" -ForegroundColor Yellow;
$logPath = join-path $installPath "log.log"
Start-Process -FilePath "msiexec.exe" -ArgumentList " /i ""$file"" /qb" -Wait
  
Remove-Item $file	