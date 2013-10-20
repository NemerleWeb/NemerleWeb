param([String]$from=$(throw "From required"), [String]$to=$(throw "To required"))

Copy-Item $from\bin         $to -Recurse -Force
Copy-Item $from\Scripts     $to -Recurse -Force
Copy-Item $from\Content     $to -Recurse -Force
Copy-Item $from\Views       $to -Recurse -Force
if (Test-Path $from\App_Data) {
	Copy-Item $from\App_Data    $to -Recurse -Force
}
Copy-Item $from\Web.config  $to -Force
Copy-Item $from\Global.asax $to -Force