#create folder in AppData
$installPath = Join-Path $env:APPDATA "NemerleWeb"
if (![System.IO.Directory]::Exists($installPath)) {[System.IO.Directory]::CreateDirectory($installPath)}

push-location $installPath

#download 7z.exe and 7z.dll
$webClient = new-object net.webclient
$webClient.DownloadFile('http://www.nemerleweb.com/installer/7z.exe', (join-path $installPath "7z.exe"))
$webClient.DownloadFile('http://www.nemerleweb.com/installer/7z.dll', (join-path $installPath "7z.dll"))

#download AllTools.zip
$webClient.DownloadFile('http://www.nemerleweb.com/installer/AllTools.zip', (join-path $installPath ".\AllTools.zip"))

.\7z x -tzip AllTools.zip -y | out-null
.\7z e -tzip ItemTemplate.zip -y | out-null
.\7z x -tzip ProjectTemplate.zip -y | out-null

.\dl-install-net45.ps1
.\check-nemerle.ps1
.\install-nweb.ps1

pop-location

Write-Host "`r`n`r`nInstallation complete`r`n"