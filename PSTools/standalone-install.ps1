#create folder in AppData
$installPath = Join-Path $env:APPDATA "NemerleWeb"
if (![System.IO.Directory]::Exists($installPath)) {[System.IO.Directory]::CreateDirectory($installPath)}

push-location $installPath

#download 7z.exe and 7z.dll
$webClient = new-object net.webclient

write-host "Downloading installer files..."
$webClient.DownloadFile('http://www.nemerleweb.com/installer/7z.exe', (join-path $installPath "7z.exe"))
$webClient.DownloadFile('http://www.nemerleweb.com/installer/7z.dll', (join-path $installPath "7z.dll"))

#download AllTools.zip
$webClient.DownloadFile('http://www.nemerleweb.com/installer/AllTools.zip', (join-path $installPath ".\AllTools.zip"))

write-host "Unpacking..."
.\7z x -tzip AllTools.zip -y | out-null
.\7z e -tzip ItemTemplate.zip -y | out-null
.\7z x -tzip ProjectTemplate.zip -y | out-null

.\dl-install-net45.ps1
.\check-nemerle.ps1
.\install-nweb.ps1

#check for visual studio
if(test-path 'HKLM:\Software\Microsoft\VisualStudio\11.0') {
	write-host "You have Visual Studio 2012 installed, downloading extension..."
	
	$vsixPath = join-path $installPath "NemerleWeb.VSIX.vsix"
	$webClient.DownloadFile('http://www.nemerleweb.com/installer/NemerleWeb.VSIX.vsix', $vsixPath)
	$vsInstallDir = (get-itemproperty 'HKLM:\Software\Microsoft\VisualStudio\11.0').InstallDir
	$vsixInstaller = join-path $vsInstallDir VSIXInstaller.exe
	$installCmd = "'" + $vsixInstaller + "' /q " + $vsixPath

	& "$vsixInstaller" /q $vsixPath

	write-host "Visual Studio extension installed" -ForegroundColor Green
} else {
	write-host "You don't have Visual Studio 2012 installed, skippin extension installation" -ForegroundColor Yellow
}

pop-location

Write-Host "`r`n`r`nInstallation complete`r`n"