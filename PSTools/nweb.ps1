param(
  [string]$command,
  [string]$arg0=''
) 

$location = get-location
$installPath = Join-Path $env:APPDATA "NemerleWeb"

switch -wildcard ($command) 
{
  "c*" {  #create
    Write-Host "Creating project"

    $targetLocation = join-path $location $arg0
    $sourceLocation = join-path $installPath "NemerleWeb.ProjectTemplate"    

    if(test-path $targetLocation) {
      Write-Host "Project with the same name already exists!" -ForegroundColor Red
      return
    }

    robocopy $sourceLocation $targetLocation /MIR | out-null
    
    $files = Get-ChildItem -recurse $targetLocation -Include *.n, *.asax, *.nproj

    foreach($file in $files) {
      $content = (Get-Content $file.fullname) | ForEach-Object { $_ -replace "\`$safeprojectname\`$", $arg0 } | Set-Content $file.fullname
    }
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