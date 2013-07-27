copy ..\NemerleWeb.Macros\bin\Debug\NemerleWeb.* ..\NemerleWeb.NugetPackage\lib\net45
copy ..\NemerleWeb.TypedJS\bin\Debug\NemerleWeb.TypedJS.* ..\NemerleWeb.NugetPackage\lib\net45
copy ..\TSParser\bin\Debug\TSParser.* ..\NemerleWeb.NugetPackage\lib\net45
..\.nuget\nuget pack ..\NemerleWeb.NugetPackage\NemerleWeb.nuspec -OutputDirectory ..\NemerleWeb.NugetPackage\