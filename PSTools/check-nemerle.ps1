if($env:NemerleBinPathRoot -eq "" -or ![System.IO.Directory]::Exists((Join-Path $env:NemerleBinPathRoot "net-4.0"))) {
	Write-Host "You don't have Nemerle installed or it isn't installed properly" -ForegroundColor Yellow
	./dl-install-nemerle.ps1
} else {
	$nccPath = Join-Path (Join-Path $env:NemerleBinPathRoot "net-4.0") "ncc.exe"
	$version = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($nccPath).FileVersion
	$requiredVersion = '1.2.0.208'

	if($version -lt $requiredVersion) {
		do {
			[console]::ForegroundColor = "yellow"
			Write-Host "Your Nemerle version: $version" 
			$ans = Read-Host "NemerleWeb requires at least $requiredVersion Do you want to install latest? y/n"
			[console]::ResetColor()
		} while($ans -ne 'y' -and $ans -ne 'n')

		if($ans -eq 'y') {
			./dl-install-nemerle.ps1
		}
	} else {
		Write-Host "Your Nemerle version is compatible with NemerleWeb ($version >= $requiredVersion)" -ForegroundColor Green
	}
}