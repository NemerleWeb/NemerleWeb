if(-not (test-path .\NemerleWeb.VSIX\bin\Release\NemerleWeb.VSIX.vsix)) {
    $msbuild = "$env:SystemRoot\Microsoft.NET\Framework\v4.0.30319\msbuild.exe"
    iex "$msbuild NemerleWeb.VSIX.sln /p:Configuration=Release"
}

copy .\NemerleWeb.VSIX\bin\Release\NemerleWeb.VSIX.vsix NemerleWeb.Website\Installer\

if(test-path .\NemerleWeb.ProjectTemplate\bin) {
    Remove-Item .\NemerleWeb.ProjectTemplate\bin -Force -Recurse
}

if(test-path .\NemerleWeb.ProjectTemplate\obj) {
    Remove-Item .\NemerleWeb.ProjectTemplate\obj -Force -Recurse
}

if(test-path .\NemerleWeb.ItemTemplate\bin) {
    Remove-Item .\NemerleWeb.ItemTemplate\bin -Force -Recurse
}

if(test-path .\NemerleWeb.ItemTemplate\obj) {
    Remove-Item .\NemerleWeb.ItemTemplate\obj -Force -Recurse
}

.\7z a -tzip PSTools\ProjectTemplate.zip .\NemerleWeb.ProjectTemplate
.\7z a -tzip PSTools\ItemTemplate.zip .\NemerleWeb.ItemTemplate\Page.n

if(test-path .\NemerleWeb.Website\Installer\AllTools.zip) {
    Remove-Item .\NemerleWeb.Website\Installer\AllTools.zip
}

.\7z a -tzip NemerleWeb.Website\Installer\AllTools.zip .\PSTools\*

copy .\7z.* .\NemerleWeb.Website\Installer
copy .\PSTools\standalone-install.ps1 .\NemerleWeb.Website\Installer