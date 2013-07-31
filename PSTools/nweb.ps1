param(
  [string]$command,
  [string]$packageName=''
) 

switch -wildcard ($command) 
{
  "c*" {  #create
    Write-Host "Creating project"
  }

  "p*" {  #add page
    Write-Host "Adding page"
  }

  "b*" {  #build
    Write-Host "Building current project"
  }

  "r*" {  #run
    Write-Host "Building and running current project"
  }

  "help" {
    Write-Host "`r`nCreate project in current directory`r`n---------------------------" -ForegroundColor Yellow

    Write-Host "nweb create ProjectName`r`nnweb c ProjectName"

    Write-Host "`r`nBuild`r`n---------------------------" -ForegroundColor Yellow

    Write-Host "nweb build`r`nnweb b"

    Write-Host "`r`nRun`r`n---------------------------" -ForegroundColor Yellow
    Write-Host "nweb run`r`nnweb r"
  }
}