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
.\7z x -tzip IISExpress.zip -y | out-null

.\dl-install-net45.ps1
.\check-nemerle.ps1
.\install-nweb.ps1

#check for visual studio

if(test-path 'HKLM:\Software\Microsoft\VisualStudio\12.0') {
	$vsInstallDir = (get-itemproperty 'HKLM:\Software\Microsoft\VisualStudio\12.0').InstallDir 
}

if(!$vsInstallDir -and (test-path 'HKLM:\Software\Wow6432Node\Microsoft\VisualStudio\12.0')) {
	$vsInstallDir = (get-itemproperty 'HKLM:\Software\Wow6432Node\Microsoft\VisualStudio\12.0').InstallDir 
}

if(!$vsInstallDir -and (test-path 'HKLM:\Software\Microsoft\VisualStudio\11.0')) {
	$vsInstallDir = (get-itemproperty 'HKLM:\Software\Microsoft\VisualStudio\11.0').InstallDir
}

if(!$vsInstallDir -and (test-path 'HKLM:\Software\Wow6432Node\Microsoft\VisualStudio\11.0')) {
	$vsInstallDir = (get-itemproperty 'HKLM:\Software\Wow6432Node\Microsoft\VisualStudio\11.0').InstallDir
}

if($vsInstallDir) {
	write-host "You have Visual Studio installed, downloading extension..."
	
	$vsixPath = join-path $installPath "NemerleWeb.VSIX.vsix"
	$webClient.DownloadFile('http://www.nemerleweb.com/installer/NemerleWeb.VSIX.vsix', $vsixPath)
	
	$vsixInstaller = join-path $vsInstallDir VSIXInstaller.exe
	
	& "$vsixInstaller" /quiet $vsixPath

	write-host "Visual Studio extension installed" -ForegroundColor Green
} else {
	write-host "You don't have Visual Studio 2012 installed, skipping extension installation" -ForegroundColor Yellow
}

pop-location

Write-Host "`r`n`r`nInstallation complete`r`n"