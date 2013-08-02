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

if(test-path .\PSTools\Installer\AllTools.zip) {
    Remove-Item .\PSTools\Installer\AllTools.zip
}

.\7z a -tzip NemerleWeb.Website\Installer\AllTools.zip .\PSTools\*

copy .\7z.* .\NemerleWeb.Website\Installer
copy .\PSTools\standalone-install.ps1 .\NemerleWeb.Website\Installer