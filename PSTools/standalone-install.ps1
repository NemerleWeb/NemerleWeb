.\7z e -tzip AllTools.zip -y | out-null
.\7z e -tzip ItemTemplate.zip -y | out-null
.\7z x -tzip ProjectTemplate.zip -y | out-null

.\dl-install-net45.ps1
.\check-nemerle.ps1
.\install-nweb.ps1

Write-Host "`r`n`r`nInstallation complete`r`n"