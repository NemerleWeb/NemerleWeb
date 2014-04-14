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
      $content = (Get-Content $file.fullname) | ForEach-Object { 
        $_ -replace "\`$safeprojectname\`$", $arg0 `
           -replace "\`$nugetpackagesfolder\`$", "packages\" `
           -replace "\`$if.+\`$", "" `
           -replace "\`$endif\`$", ""
      } | Set-Content $file.fullname
    }

    rename-item (join-path $targetLocation "ProjectTemplate.nproj") (join-path $targetLocation ($arg0 + ".nproj"))
    remove-item (join-path $targetLocation "NemerleWeb.ProjectTemplate.ico")
    remove-item (join-path $targetLocation "NemerleWeb.ProjectTemplate.csproj")

    [xml]$xml = gc (join-path $targetLocation "NemerleWeb.ProjectTemplate.vstemplate")

    $packagesList = $xml.VSTemplate.WizardData.packages
    $nl = [Environment]::NewLine
    $packagesString = ""
    foreach($packageList in $packagesList) {
      $packages = $packageList.package
      foreach($package in $packages) {
        $packagesString += '  <package id="' + $package.id + '" version="' + $package.version + '" targetFramework="net40" />' + $nl
      }
    }
    
    $packages = '<?xml version="1.0" encoding="utf-8"?>' + $nl + '<packages>' + $nl + $packagesString + '</packages>'
    $packagesPath = join-path $targetLocation "packages.config"
    $packagesDir = join-path $targetLocation "packages"

    new-item $packagesPath -type file -force | out-null
    set-content $packagesPath $packages

    $nuget = join-path $installPath "nuget.exe"
    & $nuget install "$packagesPath" -o "$packagesDir"
  }

  "p*" {  #add page
    Write-Host "Adding page"
  }

  "b*" {  #build
    Write-Host "Building current project"
    $msbuild = "$env:SystemRoot\Microsoft.NET\Framework\v4.0.30319\msbuild.exe"    

    & $msbuild $arg0
  }

  "r*" {  #run
    Write-Host "Building and running current project"
    $currentDirectory = $(get-location)
    start http://localhost:63749
    & $installPath\IISExpress\iisexpress.exe /path:"$currentDirectory" /port:63749
  }

  default {
    Write-Host "`r`nCreate project in current directory`r`n---------------------------" -ForegroundColor Yellow

    Write-Host "nweb create ProjectName`r`nnweb c ProjectName"

    Write-Host "`r`nBuild`r`n---------------------------" -ForegroundColor Yellow

    Write-Host "nweb build`r`nnweb b"

    Write-Host "`r`nRun`r`n---------------------------" -ForegroundColor Yellow
    Write-Host "nweb run`r`nnweb r"
  }
}